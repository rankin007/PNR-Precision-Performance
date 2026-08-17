-- Sprint 021AG - null-safe authenticated comment soft-delete authorization.

create or replace function public.soft_delete_biochemistry_comment(
  target_note_id uuid,
  target_test_id uuid
)
returns boolean
language plpgsql
volatile
security definer
set search_path = pg_catalog, public
as $$
declare
  actor_ids uuid[];
  actor_count bigint;
  active_profile_count bigint;
  target_note record;
  actor_is_admin boolean;
  actor_is_author boolean;
  actor_can_comment boolean;
  authorized boolean;
  mutation_time timestamptz;
  affected_count integer;
begin
  select pg_catalog.array_agg(u.id order by u.id), pg_catalog.count(*)
  into actor_ids, actor_count
  from public.users u
  where u.auth_user_id = auth.uid()
    and u.status = 'active';

  if actor_count <> 1 then
    return false;
  end if;

  select pg_catalog.count(*)
  into active_profile_count
  from public.member_profiles mp
  where mp.user_id = actor_ids[1]
    and mp.is_active;

  if active_profile_count < 1 then
    return false;
  end if;

  select n.id, n.horse_id, n.created_by_user_id
  into target_note
  from public.biochemistry_test_notes n
  where n.id = target_note_id
    and n.test_id = target_test_id
    and n.deleted_at is null
  for update;

  if not found then
    return false;
  end if;

  actor_is_admin := pg_catalog.coalesce(public.is_admin(), false);
  actor_is_author := pg_catalog.coalesce(target_note.created_by_user_id = actor_ids[1], false);
  actor_can_comment := pg_catalog.coalesce(
    public.can_comment_biochemistry_horse(target_note.horse_id),
    false
  );
  authorized := actor_is_admin or (actor_is_author and actor_can_comment);

  if authorized is distinct from true then
    return false;
  end if;

  mutation_time := pg_catalog.now();

  update public.biochemistry_test_notes
  set deleted_at = mutation_time,
      deleted_by_user_id = actor_ids[1],
      delete_reason = 'user-request',
      updated_at = mutation_time,
      updated_by_user_id = actor_ids[1]
  where id = target_note.id
    and test_id = target_test_id
    and deleted_at is null;

  get diagnostics affected_count = row_count;
  return affected_count = 1;
end
$$;

revoke all on function public.soft_delete_biochemistry_comment(uuid, uuid) from public;
revoke all on function public.soft_delete_biochemistry_comment(uuid, uuid) from anon;
grant execute on function public.soft_delete_biochemistry_comment(uuid, uuid) to authenticated;
