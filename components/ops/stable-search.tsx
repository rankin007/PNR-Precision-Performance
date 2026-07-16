"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type StableSearchProps = {
  horses: Array<{
    id: string;
    name: string;
  }>;
  initialQuery?: string;
};

export function StableSearch({ horses, initialQuery = "" }: StableSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const horseNames = horses.map((horse) => horse.name);

  function updateQuery(nextQuery: string) {
    setQuery(nextQuery);

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = nextQuery.trim();

      if (trimmed) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }

      const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(nextUrl, { scroll: false });
    });
  }

  return (
    <div className="w-full max-w-xl">
      <label className="sr-only" htmlFor="stable-search">
        Search horses
      </label>
      <input
        id="stable-search"
        name="q"
        list="stable-search-options"
        value={query}
        onChange={(event) => updateQuery(event.target.value)}
        placeholder="Search horses by name, stable, or status"
        className="w-full rounded-full border border-ink/10 bg-sand px-4 py-3 text-sm text-ink outline-none transition focus:border-ink/30"
        aria-busy={isPending}
      />
      <datalist id="stable-search-options">
        {horseNames.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>
    </div>
  );
}
