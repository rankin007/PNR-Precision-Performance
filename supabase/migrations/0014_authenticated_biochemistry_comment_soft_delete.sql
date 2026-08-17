-- Sprint 021AD - authenticated, RLS-governed comment soft-delete.

create or replace function public.soft_delete_biochemistry_comment(
  target_note_id uuid,
  target_test_id uuid
)
returns boolean
language plpgsql
volatile
security invoker
set search_path = pg_catalog, public
as $$
declare
  actor_user_id uuid := public.current_app_user_id();
  mutation_time timestamptz := pg_catalog.now();
  affected_count integer;
begin
  if actor_user_id is null then
    return false;
  end if;

  update public.biochemistry_test_notes
  set deleted_at = mutation_time,
      deleted_by_user_id = actor_user_id,
      delete_reason = 'user-request',
      updated_at = mutation_time,
      updated_by_user_id = actor_user_id
  where id = target_note_id
    and test_id = target_test_id
    and deleted_at is null;

  get diagnostics affected_count = row_count;
  return affected_count = 1;
end
$$;

revoke all on function public.soft_delete_biochemistry_comment(uuid, uuid) from public;
revoke all on function public.soft_delete_biochemistry_comment(uuid, uuid) from anon;
grant execute on function public.soft_delete_biochemistry_comment(uuid, uuid) to authenticated;
