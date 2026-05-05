"use client";

import { useState } from "react";

type HorseGalleryFormProps = {
  horseId: string;
  horseName: string;
  action: (formData: FormData) => void | Promise<void>;
};

export function HorseGalleryForm({
  horseId,
  horseName,
  action,
}: HorseGalleryFormProps) {
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError("Please choose an image smaller than 8MB.");
      return;
    }

    setError("");
    setPreviewUrl(URL.createObjectURL(file));
  }

  return (
    <form
      id="horse-gallery"
      action={action}
      encType="multipart/form-data"
      className="grid gap-6 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel"
    >
      <div>
        <p className="eyebrow">Horse Gallery</p>
        <h2 className="mt-3 font-display text-2xl text-ink">Add gallery image</h2>
      </div>

      <input type="hidden" name="horseId" value={horseId} />

      <label className="grid gap-2 text-sm font-medium text-ink">
        Load photo
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleFileChange}
          className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-ink">
        Or paste image URL
        <input
          name="imageUrl"
          onChange={(event) => {
            const nextValue = event.target.value.trim();
            setError("");
            setPreviewUrl(nextValue);
          }}
          placeholder="https://... or /horse-images/example.jpg"
          className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-ink">
        Caption
        <input name="caption" defaultValue={horseName} className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-ink">
        Taken at
        <input name="takenAt" type="datetime-local" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
      </label>

      {error ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </div>
      ) : null}

      {previewUrl ? (
        <div className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-sand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt={horseName} className="h-48 w-full object-cover" />
        </div>
      ) : null}

      <button type="submit" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
        Add gallery item
      </button>
    </form>
  );
}
