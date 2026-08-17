-- Sprint 023J candidate only. Apply only after the separately governed clean-commit gate.
-- Completes the additive 0018 contract without asserting remote application.

insert into public.permissions(code,name,description,scope)
values ('evidence.purge','Purge test evidence','Separately designated governed evidence purge permission.','evidence')
on conflict (code) do nothing;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('test-evidence','test-evidence',false,5242880,array['image/jpeg','image/png','application/pdf']::text[]);

create or replace function public.can_insert_test_evidence_object(target_name text)
returns boolean
language sql stable security definer
set search_path = pg_catalog, public
as $$
  select exists (
    select 1
    from public.evidence_upload_attempts a
    join public.users u on u.id=a.user_id
    join public.member_profiles mp on mp.user_id=u.id
    where u.auth_user_id=auth.uid()
      and u.status='active'
      and mp.is_active
      and a.bucket_id='test-evidence'
      and a.object_key=target_name
      and a.state='active'
      and a.expires_at>pg_catalog.now()
      and public.can_write_biochemistry_horse(a.horse_id) is true
  );
$$;
revoke all on function public.can_insert_test_evidence_object(text) from public, anon;
grant execute on function public.can_insert_test_evidence_object(text) to authenticated;

create policy "test_evidence_exact_intent_insert"
on storage.objects for insert to authenticated
with check (
  bucket_id='test-evidence'
  and public.can_insert_test_evidence_object(name) is true
);

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
  normal_extension:=lower(substring(normal_name from '\\.([A-Za-z0-9]+)$'));
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

  idem_hash:=encode(digest(p_idempotency_key,'sha256'),'hex');
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

create or replace function public.mutate_test_evidence_lifecycle(p_operation text,p_upload_id uuid,p_test_id uuid)
returns boolean
language plpgsql volatile security definer
set search_path = pg_catalog, public, storage
as $$
declare
  actor public.users%rowtype;
  upload public.biochemistry_test_uploads%rowtype;
  attempt public.evidence_upload_attempts%rowtype;
  object_row storage.objects%rowtype;
  actor_role text;
begin
  if p_operation not in ('finalise','cancel','soft_delete','request_restore','restore','create_hold','release_hold','purge') then
    raise exception 'evidence request unavailable';
  end if;
  select u.* into actor from public.users u join public.member_profiles mp on mp.user_id=u.id and mp.is_active
    where u.auth_user_id=auth.uid() and u.status='active';
  select * into upload from public.biochemistry_test_uploads where id=p_upload_id and test_id=p_test_id for update;
  if actor.id is null or upload.id is null or public.can_write_biochemistry_horse(upload.horse_id) is not true then
    raise exception 'evidence request unavailable';
  end if;
  actor_role:=actor.primary_role_code;
  perform pg_advisory_xact_lock(hashtextextended(upload.test_id::text,23));

  if p_operation='finalise' then
    select * into attempt from public.evidence_upload_attempts where upload_id=upload.id and user_id=actor.id and state='active' and expires_at>pg_catalog.now() for update;
    select * into object_row from storage.objects where bucket_id=upload.bucket_id and name=upload.object_key;
    if attempt.id is null or upload.state<>'upload_pending' or object_row.id is null
       or coalesce((object_row.metadata->>'size')::bigint,-1)<>upload.size_bytes
       or lower(coalesce(object_row.metadata->>'mimetype',''))<>upload.declared_mime then
      raise exception 'evidence request unavailable';
    end if;
    update public.biochemistry_test_uploads set state='blocked',prior_state='uploaded_unverified',reason_code='safety_services_unavailable',reconciled_at=pg_catalog.now() where id=upload.id;
    update public.evidence_upload_attempts set state='completed' where id=attempt.id;
  elsif p_operation='cancel' then
    if upload.state<>'upload_pending' then raise exception 'evidence request unavailable'; end if;
    if exists(select 1 from storage.objects where bucket_id=upload.bucket_id and name=upload.object_key) then raise exception 'evidence request unavailable'; end if;
    update public.biochemistry_test_uploads set state='failed',reason_code='cancelled_before_transfer' where id=upload.id;
    update public.evidence_upload_attempts set state='cancelled' where upload_id=upload.id and state='active';
  elsif p_operation='soft_delete' then
    if upload.state not in ('available','blocked','legacy_unverified','object_missing') then raise exception 'evidence request unavailable'; end if;
    update public.biochemistry_test_uploads set prior_state=state,state='soft_deleted',deleted_at=pg_catalog.now(),deleted_by_user_id=actor.id,restore_until=pg_catalog.now()+interval '30 days',purge_eligible_at=pg_catalog.now()+interval '30 days',reason_code='user_soft_delete' where id=upload.id;
  elsif p_operation='request_restore' then
    if upload.state<>'soft_deleted' or upload.restore_until<=pg_catalog.now() then raise exception 'evidence request unavailable'; end if;
    update public.biochemistry_test_uploads set state='restore_pending',reason_code='restore_requested' where id=upload.id;
  elsif p_operation='restore' then
    if actor_role<>'administrator' or upload.state<>'restore_pending' or upload.replaced_by_id is not null then raise exception 'evidence request unavailable'; end if;
    update public.biochemistry_test_uploads set state=case when prior_state='available' then 'blocked' else coalesce(prior_state,'legacy_unverified') end,deleted_at=null,deleted_by_user_id=null,restore_until=null,purge_eligible_at=null,reason_code='restored_unavailable' where id=upload.id;
  elsif p_operation='create_hold' then
    if actor_role<>'administrator' then raise exception 'evidence request unavailable'; end if;
    insert into public.evidence_holds(upload_id,reason_code,owner_user_id,review_at) values(upload.id,'governance_hold',actor.id,pg_catalog.now()+interval '30 days');
  elsif p_operation='release_hold' then
    if actor_role<>'administrator' then raise exception 'evidence request unavailable'; end if;
    update public.evidence_holds set released_at=pg_catalog.now(),released_by_user_id=actor.id where upload_id=upload.id and released_at is null;
  elsif p_operation='purge' then
    if public.has_permission('evidence.purge') is not true
       or upload.state not in ('soft_deleted','purge_pending')
       or upload.purge_eligible_at is null or upload.purge_eligible_at>pg_catalog.now()
       or exists(select 1 from public.evidence_holds where upload_id=upload.id and released_at is null) then
      raise exception 'evidence request unavailable';
    end if;
    if upload.state='soft_deleted' then
      update public.biochemistry_test_uploads set state='purge_pending',reason_code='storage_delete_pending' where id=upload.id;
    end if;
  end if;
  insert into public.evidence_audit_events(upload_id,stable_id,horse_id,test_id,event_type,actor_user_id,role_snapshot,outcome,reason_code)
  values(upload.id,upload.stable_id,upload.horse_id,upload.test_id,p_operation,actor.id,actor_role,'accepted','opaque');
  return true;
end $$;

revoke all on function public.mutate_test_evidence_lifecycle(text,uuid,uuid) from public, anon;
grant execute on function public.mutate_test_evidence_lifecycle(text,uuid,uuid) to authenticated;

create or replace function public.complete_test_evidence_purge(p_upload_id uuid,p_test_id uuid)
returns boolean
language plpgsql volatile security definer
set search_path = pg_catalog, public, storage
as $$
declare upload public.biochemistry_test_uploads%rowtype;
begin
  select * into upload from public.biochemistry_test_uploads where id=p_upload_id and test_id=p_test_id for update;
  if upload.id is null then raise exception 'evidence request unavailable'; end if;
  if upload.state='purged' then return true; end if;
  if upload.state<>'purge_pending'
     or exists(select 1 from storage.objects where bucket_id=upload.bucket_id and name=upload.object_key) then
    raise exception 'evidence request unavailable';
  end if;
  update public.biochemistry_test_uploads set
    state='purged',file_name='purged',display_name='purged',storage_path='purged',
    bucket_id=null,object_key=null,sha256_hex=null,detected_mime=null,content_type='application/octet-stream',
    reason_code='governed_purge_complete',reconciled_at=pg_catalog.now()
  where id=upload.id;
  insert into public.evidence_audit_events(upload_id,stable_id,horse_id,test_id,event_type,role_snapshot,outcome,reason_code)
  values(upload.id,upload.stable_id,upload.horse_id,upload.test_id,'purge_complete','system','completed','object_absence_verified');
  return true;
end $$;

revoke all on function public.complete_test_evidence_purge(uuid,uuid) from public, anon, authenticated;
grant execute on function public.complete_test_evidence_purge(uuid,uuid) to service_role;

create or replace function public.reconcile_test_evidence_batch(p_limit integer default 25)
returns table(attempt_id uuid,upload_id uuid,test_id uuid,bucket_id text,object_key text)
language plpgsql volatile security definer
set search_path = pg_catalog, public, storage
as $$
declare candidate record;
begin
  if p_limit not between 1 and 50 then raise exception 'invalid batch'; end if;
  if not pg_try_advisory_xact_lock(23019001) then return; end if;
  for candidate in
    select a.id,a.upload_id,a.test_id,a.bucket_id,a.object_key from public.evidence_upload_attempts a
    join public.biochemistry_test_uploads u on u.id=a.upload_id
    where a.state='active' and a.expires_at<=pg_catalog.now()
      and u.state in ('upload_pending','blocked')
      and (u.reconciled_at is null or u.reconciled_at<pg_catalog.now()-interval '1 minute')
      and (u.state<>'blocked' or u.reason_code='expired_object_compensation_pending')
    order by a.expires_at for update skip locked limit p_limit
  loop
    update public.biochemistry_test_uploads set state='blocked',reason_code='expired_object_compensation_pending',reconciliation_attempts=reconciliation_attempts+1,reconciled_at=pg_catalog.now() where id=candidate.upload_id;
    insert into public.evidence_audit_events(upload_id,event_type,outcome,reason_code,correlation_id)
    values(candidate.upload_id,'reconcile_claimed','pending','storage_compensation_required',candidate.id);
    attempt_id:=candidate.id; upload_id:=candidate.upload_id; test_id:=candidate.test_id;
    bucket_id:=candidate.bucket_id; object_key:=candidate.object_key; return next;
  end loop;
end $$;

revoke all on function public.reconcile_test_evidence_batch(integer) from public, anon, authenticated;
grant execute on function public.reconcile_test_evidence_batch(integer) to service_role;

create or replace function public.complete_test_evidence_compensation(p_attempt_id uuid,p_upload_id uuid)
returns boolean
language plpgsql volatile security definer
set search_path = pg_catalog, public, storage
as $$
declare attempt public.evidence_upload_attempts%rowtype;
declare upload public.biochemistry_test_uploads%rowtype;
begin
  select * into attempt from public.evidence_upload_attempts where id=p_attempt_id and upload_id=p_upload_id for update;
  select * into upload from public.biochemistry_test_uploads where id=p_upload_id for update;
  if attempt.id is null or upload.id is null then raise exception 'evidence request unavailable'; end if;
  if attempt.state='expired' and upload.state='failed' then return true; end if;
  if attempt.state<>'active' or attempt.expires_at>pg_catalog.now()
     or upload.state<>'blocked' or upload.reason_code<>'expired_object_compensation_pending'
     or exists(select 1 from storage.objects where bucket_id=attempt.bucket_id and name=attempt.object_key) then
    raise exception 'evidence request unavailable';
  end if;
  update public.evidence_upload_attempts set state='expired' where id=attempt.id;
  update public.biochemistry_test_uploads set state='failed',reason_code='expired_object_compensated',reconciled_at=pg_catalog.now() where id=upload.id;
  insert into public.evidence_audit_events(upload_id,stable_id,horse_id,test_id,event_type,role_snapshot,outcome,reason_code,correlation_id)
  values(upload.id,upload.stable_id,upload.horse_id,upload.test_id,'reconcile_complete','system','completed','object_absence_verified',attempt.id);
  return true;
end $$;

revoke all on function public.complete_test_evidence_compensation(uuid,uuid) from public, anon, authenticated;
grant execute on function public.complete_test_evidence_compensation(uuid,uuid) to service_role;

comment on function public.initiate_test_evidence_upload(uuid,text,text,integer,text,boolean,uuid) is 'Sprint 023J candidate repository contract; remote application is separately governed.';
comment on function public.mutate_test_evidence_lifecycle(text,uuid,uuid) is 'Fail-closed lifecycle; finalisation remains unavailable while safety adapters are absent.';
comment on function public.complete_test_evidence_purge(uuid,uuid) is 'Service-role completion only after Storage API deletion and database-confirmed object absence.';
comment on function public.reconcile_test_evidence_batch(integer) is 'Claims bounded retryable Storage compensation work with overlap lock; does not delete object rows.';
comment on function public.complete_test_evidence_compensation(uuid,uuid) is 'Finalises expired metadata only after server Storage deletion and database-confirmed object absence.';
