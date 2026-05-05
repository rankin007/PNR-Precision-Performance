"use client";

import { useFormStatus } from "react-dom";

function DeleteButtonLabel() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Deleting..." : "Delete photo"}
    </button>
  );
}

type GalleryDeleteButtonProps = {
  action: (formData: FormData) => void | Promise<void>;
  horseId: string;
  galleryItemId: string;
  imageUrl: string;
  returnTo: string;
  returnHash?: string;
};

export function GalleryDeleteButton({
  action,
  horseId,
  galleryItemId,
  imageUrl,
  returnTo,
  returnHash,
}: GalleryDeleteButtonProps) {
  return (
    <form action={action}>
      <input type="hidden" name="horseId" value={horseId} />
      <input type="hidden" name="galleryItemId" value={galleryItemId} />
      <input type="hidden" name="imageUrl" value={imageUrl} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <input type="hidden" name="returnHash" value={returnHash ?? ""} />
      <DeleteButtonLabel />
    </form>
  );
}
