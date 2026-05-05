insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'horse-gallery',
  'horse-gallery',
  true,
  8388608,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif',
    'image/svg+xml'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "horse_gallery_storage_select_accessible" on storage.objects;
create policy "horse_gallery_storage_select_accessible"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'horse-gallery'
  and (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  and public.can_access_horse(((storage.foldername(name))[1])::uuid)
);

drop policy if exists "horse_gallery_storage_insert_manageable" on storage.objects;
create policy "horse_gallery_storage_insert_manageable"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'horse-gallery'
  and (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  and public.can_manage_horse_records(((storage.foldername(name))[1])::uuid)
);

drop policy if exists "horse_gallery_storage_update_manageable" on storage.objects;
create policy "horse_gallery_storage_update_manageable"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'horse-gallery'
  and (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  and public.can_manage_horse_records(((storage.foldername(name))[1])::uuid)
)
with check (
  bucket_id = 'horse-gallery'
  and (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  and public.can_manage_horse_records(((storage.foldername(name))[1])::uuid)
);

drop policy if exists "horse_gallery_storage_delete_manageable" on storage.objects;
create policy "horse_gallery_storage_delete_manageable"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'horse-gallery'
  and (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  and public.can_manage_horse_records(((storage.foldername(name))[1])::uuid)
);
