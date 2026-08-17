-- Sprint 023O additive correction: preserve the restricted function search path
-- and make the approved pgcrypto dependency explicit.
do $$
begin
  if not exists (
    select 1
    from pg_catalog.pg_extension e
    join pg_catalog.pg_namespace n on n.oid=e.extnamespace
    where e.extname='pgcrypto' and n.nspname='extensions'
  ) or pg_catalog.to_regprocedure('extensions.digest(text,text)') is null then
    raise exception 'required pgcrypto dependency unavailable';
  end if;
end $$;

create or replace function public.initiate_test_evidence_upload(
  p_test_id uuid,
  p_declared_name text,
  p_declared_mime text,
  p_declared_bytes integer,
  p_idempotency_key text,
  p_acknowledgement boolean,
  p_replaces_id uuid default null
)
returns table(attempt_id uuid,upload_id uuid,bucket_id text,object_key text,expires_at timestamptz)
language plpgsql volatile security definer
set search_path = pg_catalog, public
as $$
declare
  actor public.users%rowtype;
  target public.biochemistry_tests%rowtype;
  predecessor public.biochemistry_test_uploads%rowtype;
  normal_name text;
  normal_mime text;
  normal_category text;
  normal_extension text;
  idem_hash text;
  occupied_count bigint;
  occupied_bytes bigint;
  new_upload_id uuid:=gen_random_uuid();
  new_attempt_id uuid:=gen_random_uuid();
  new_object_key text:='v1/'||gen_random_uuid()::text||'/'||gen_random_uuid()::text;
  new_expiry timestamptz:=pg_catalog.now()+interval '24 hours';
begin
  if p_acknowledgement is not true or p_declared_bytes not between 1 and 5242880
     or p_idempotency_key is null or length(p_idempotency_key) not between 16 and 200 then
    raise exception 'evidence request unavailable';
  end if;

  normal_name:=left(regexp_replace(split_part(replace(p_declared_name,E'\\','/'),'/',-1),'[[:cntrl:]]','','g'),160);
  normal_mime:=lower(trim(p_declared_mime));
  normal_extension:=lower(substring(normal_name from '\.([A-Za-z0-9]+)$'));
  normal_category:=case
    when normal_extension in ('jpg','jpeg') and normal_mime='image/jpeg' then 'jpeg'
    when normal_extension='png' and normal_mime='image/png' then 'png'
    when normal_extension='pdf' and normal_mime='application/pdf' then 'pdf'
  end;
  if normal_name='' or normal_category is null or normal_extension='csv' or normal_mime in ('text/csv','application/csv') then
    raise exception 'evidence request unavailable';
  end if;

  select u.* into actor from public.users u
  join public.member_profiles mp on mp.user_id=u.id and mp.is_active
  where u.auth_user_id=auth.uid() and u.status='active';
  select * into target from public.biochemistry_tests
  where id=p_test_id and deleted_at is null for update;
  if actor.id is null or target.id is null or target.stable_id is null
     or public.can_write_biochemistry_horse(target.horse_id) is not true then
    raise exception 'evidence request unavailable';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(target.id::text,23));

  idem_hash:=encode(extensions.digest(p_idempotency_key,'sha256'),'hex');
  return query select a.id,a.upload_id,a.bucket_id,a.object_key,a.expires_at
    from public.evidence_upload_attempts a
    where a.user_id=actor.id and a.idempotency_key_hash=idem_hash and a.state='active' and a.expires_at>pg_catalog.now();
  if found then return; end if;

  if p_replaces_id is not null then
    select * into predecessor from public.biochemistry_test_uploads
    where id=p_replaces_id and test_id=target.id and state='available' and replaced_by_id is null for update;
    if predecessor.id is null then raise exception 'evidence request unavailable'; end if;
    if exists(select 1 from public.evidence_upload_attempts a join public.biochemistry_test_uploads u on u.id=a.upload_id
      where u.replaces_id=predecessor.id and a.state='active' and a.expires_at>pg_catalog.now()) then
      raise exception 'evidence request unavailable';
    end if;
  else
    select count(*),coalesce(sum(size_bytes),0) into occupied_count,occupied_bytes
    from public.biochemistry_test_uploads
    where test_id=target.id and state in ('upload_pending','uploaded_unverified','legacy_unverified','scan_pending','sanitisation_pending','available','blocked','soft_deleted','restore_pending','purge_pending','object_missing')
      and not(state='soft_deleted' and replaced_by_id is not null);
    if occupied_count+1>10 or occupied_bytes+p_declared_bytes>31457280 then
      raise exception 'evidence request unavailable';
    end if;
  end if;

  insert into public.biochemistry_test_uploads(
    id,test_id,horse_id,stable_id,file_name,file_category,content_type,size_bytes,storage_path,
    uploaded_by_user_id,object_id,bucket_id,object_key,display_name,extension,declared_mime,state,
    version_group_id,version_no,replaces_id,acknowledgement_at,reason_code
  ) values (
    new_upload_id,target.id,target.horse_id,target.stable_id,normal_name,normal_category,normal_mime,p_declared_bytes,new_object_key,
    actor.id,gen_random_uuid(),'test-evidence',new_object_key,normal_name,normal_extension,normal_mime,'upload_pending',
    coalesce(predecessor.version_group_id,new_upload_id),coalesce(predecessor.version_no+1,1),predecessor.id,pg_catalog.now(),'awaiting_direct_transfer'
  );
  insert into public.evidence_upload_attempts(id,idempotency_key_hash,user_id,test_id,horse_id,stable_id,upload_id,bucket_id,object_key,declared_name,declared_mime,declared_bytes,reserved_bytes,state,expires_at)
  values(new_attempt_id,idem_hash,actor.id,target.id,target.horse_id,target.stable_id,new_upload_id,'test-evidence',new_object_key,normal_name,normal_mime,p_declared_bytes,p_declared_bytes,'active',new_expiry);
  insert into public.evidence_audit_events(upload_id,stable_id,horse_id,test_id,event_type,actor_user_id,role_snapshot,outcome,reason_code,correlation_id)
  values(new_upload_id,target.stable_id,target.horse_id,target.id,'upload_initiated',actor.id,actor.primary_role_code,'accepted','awaiting_direct_transfer',new_attempt_id);
  return query select new_attempt_id,new_upload_id,'test-evidence'::text,new_object_key,new_expiry;
end $$;

revoke all on function public.initiate_test_evidence_upload(uuid,text,text,integer,text,boolean,uuid) from public, anon;
grant execute on function public.initiate_test_evidence_upload(uuid,text,text,integer,text,boolean,uuid) to authenticated;

comment on function public.initiate_test_evidence_upload(uuid,text,text,integer,text,boolean,uuid) is
  'Sprint 023P additive PostgreSQL filename extension parser correction; governed initiation remains fail closed and remote proof is separately governed.';
