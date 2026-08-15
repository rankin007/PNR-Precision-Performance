begin;
select plan(24);

insert into public.users(id,auth_user_id,email,status,primary_role_code)
values
  ('00000000-0000-4000-8000-000000028001','00000000-0000-4000-8000-000000028101','trend-a@example.invalid','active','trainer'),
  ('00000000-0000-4000-8000-000000028002','00000000-0000-4000-8000-000000028102','trend-b@example.invalid','active','administrator');
insert into public.member_profiles(id,user_id,display_name,is_active)
values
  ('00000000-0000-4000-8000-000000028011','00000000-0000-4000-8000-000000028001','Trend A',true),
  ('00000000-0000-4000-8000-000000028012','00000000-0000-4000-8000-000000028002','Trend B',true);
insert into public.user_membership_levels(id,user_id,membership_level_id)
select '00000000-0000-4000-8000-000000028201','00000000-0000-4000-8000-000000028002',id
from public.membership_levels where code='administrator';
insert into public.user_trend_view_preferences(id,user_id,label,score_view,ph_view,show_carbohydrate,show_conductivity,time_filter,range_days,is_default)
values
  ('00000000-0000-4000-8000-000000028301','00000000-0000-4000-8000-000000028001','A scores','both','none',false,false,'both',90,true),
  ('00000000-0000-4000-8000-000000028302','00000000-0000-4000-8000-000000028001','A pH','none','both',false,false,'all',365,false),
  ('00000000-0000-4000-8000-000000028303','00000000-0000-4000-8000-000000028002','B scores','hydration','none',false,false,'am',30,true);

select ok(to_regclass('public.user_trend_view_preferences') is not null,'preference table exists');
select ok((select relrowsecurity from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname='user_trend_view_preferences'),'preference RLS enabled');
select is(
  (select array_agg(column_name order by ordinal_position)::text from information_schema.columns where table_schema='public' and table_name='user_trend_view_preferences'),
  '{id,user_id,label,score_view,ph_view,show_carbohydrate,show_conductivity,time_filter,range_days,is_default,created_at,updated_at}',
  'preference columns contain configuration only'
);
select is((select count(*)::integer from pg_constraint where conrelid='public.user_trend_view_preferences'::regclass and conname in ('user_trend_view_preferences_label_check','user_trend_view_preferences_group_count_check')),2,'label and group checks exist');
select ok(exists(select 1 from pg_constraint where conrelid='public.user_trend_view_preferences'::regclass and pg_get_constraintdef(oid) like '%range_days%30%90%365%'),'range constraint exact');
select is((select count(*)::integer from pg_indexes where schemaname='public' and tablename='user_trend_view_preferences' and indexname in ('idx_user_trend_view_preferences_owner_label','idx_user_trend_view_preferences_one_default')),2,'owner label and one-default indexes exist');
select ok((select count(*)=4 and bool_and(coalesce(qual,'') !~ 'is_admin' and coalesce(with_check,'') !~ 'is_admin') from pg_policies where schemaname='public' and tablename='user_trend_view_preferences'),'four policies contain no administrator bypass');
select ok(
  has_table_privilege('authenticated','public.user_trend_view_preferences','select,insert,update,delete')
  and not has_table_privilege('anon','public.user_trend_view_preferences','select')
  and has_function_privilege('authenticated','public.set_default_biochemistry_trend_preference(uuid)','execute')
  and not has_function_privilege('anon','public.set_default_biochemistry_trend_preference(uuid)','execute')
  and not has_function_privilege('authenticated','public.touch_user_trend_view_preference_updated_at()','execute'),
  'table and function grants are hardened'
);

select throws_ok($$insert into public.user_trend_view_preferences(user_id,label,score_view,ph_view) values('00000000-0000-4000-8000-000000028001',' untrimmed','both','none')$$,'23514','new row for relation "user_trend_view_preferences" violates check constraint "user_trend_view_preferences_label_check"','untrimmed label refused');
select throws_ok($$insert into public.user_trend_view_preferences(user_id,label,score_view,ph_view) values('00000000-0000-4000-8000-000000028001','No groups','none','none')$$,'23514','new row for relation "user_trend_view_preferences" violates check constraint "user_trend_view_preferences_group_count_check"','zero groups refused');
select throws_ok($$insert into public.user_trend_view_preferences(user_id,label,score_view,ph_view,show_carbohydrate) values('00000000-0000-4000-8000-000000028001','Three groups','both','both',true)$$,'23514','new row for relation "user_trend_view_preferences" violates check constraint "user_trend_view_preferences_group_count_check"','three groups refused');
select throws_ok($$insert into public.user_trend_view_preferences(user_id,label,score_view,ph_view,range_days) values('00000000-0000-4000-8000-000000028001','Bad range','both','none',31)$$,'23514','new row for relation "user_trend_view_preferences" violates check constraint "user_trend_view_preferences_range_days_check"','invalid range refused');

set local role authenticated;
set local "request.jwt.claim.sub" = '00000000-0000-4000-8000-000000028101';
select is((select count(*)::integer from public.user_trend_view_preferences),2,'user A reads only own rows');
select lives_ok($$insert into public.user_trend_view_preferences(id,user_id,label,score_view,ph_view) values('00000000-0000-4000-8000-000000028304','00000000-0000-4000-8000-000000028001','A new','hydration','none')$$,'user A inserts own row');
select throws_ok($$insert into public.user_trend_view_preferences(id,user_id,label,score_view,ph_view) values('00000000-0000-4000-8000-000000028305','00000000-0000-4000-8000-000000028002','A to B','hydration','none')$$,'42501','new row violates row-level security policy for table "user_trend_view_preferences"','user A cannot insert for B');
select lives_ok($$update public.user_trend_view_preferences set label='A renamed' where id='00000000-0000-4000-8000-000000028304'$$,'user A updates own row');
select is_empty($$update public.user_trend_view_preferences set label='B changed' where id='00000000-0000-4000-8000-000000028303' returning 1$$,'user A cannot update B row');
select is_empty($$delete from public.user_trend_view_preferences where id='00000000-0000-4000-8000-000000028303' returning 1$$,'user A cannot delete B row');

reset role;
set local role authenticated;
set local "request.jwt.claim.sub" = '00000000-0000-4000-8000-000000028102';
select ok(public.is_admin() and (select count(*) from public.user_trend_view_preferences)=1,'administrator still reads only own preference');
select is_empty($$update public.user_trend_view_preferences set label='Admin changed A' where id='00000000-0000-4000-8000-000000028301' returning 1$$,'administrator has no cross-user update bypass');

reset role;
set local role authenticated;
set local "request.jwt.claim.sub" = '00000000-0000-4000-8000-000000028101';
select is(public.set_default_biochemistry_trend_preference('00000000-0000-4000-8000-000000028302'),true,'user A sets owned default');
select ok((select count(*)=1 and bool_and(id='00000000-0000-4000-8000-000000028302') from public.user_trend_view_preferences where is_default),'exact target is sole visible user A default');
select ok(
  public.set_default_biochemistry_trend_preference('00000000-0000-4000-8000-000000028303') is false
  and (select is_default from public.user_trend_view_preferences where id='00000000-0000-4000-8000-000000028302')
  and (select is_default from public.user_trend_view_preferences where id='00000000-0000-4000-8000-000000028303') is null,
  'user A cannot target B and own default remains'
);

reset role;
select lives_ok($outer$
do $inner$
begin
  begin
    insert into public.user_trend_view_preferences(id,user_id,label,score_view,ph_view)
    values('00000000-0000-4000-8000-000000028306','00000000-0000-4000-8000-000000028001','a PH','none','both');
    raise exception 'case-insensitive owner label uniqueness missing';
  exception when unique_violation then null;
  end;
  begin
    insert into public.user_trend_view_preferences(id,user_id,label,score_view,ph_view,is_default)
    values('00000000-0000-4000-8000-000000028307','00000000-0000-4000-8000-000000028001','Second default','both','none',true);
    raise exception 'one-default uniqueness missing';
  exception when unique_violation then null;
  end;
end
$inner$;
$outer$,'case-insensitive labels and one-default integrity both reject conflicts');

select * from finish();
rollback;
