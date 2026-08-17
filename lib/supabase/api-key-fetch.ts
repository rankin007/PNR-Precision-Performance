export type SupabaseFetch = typeof fetch;

export function isOpaqueSupabaseApiKey(value: unknown): value is string {
  return typeof value === "string" && (value.startsWith("sb_publishable_") || value.startsWith("sb_secret_"));
}

export function createSupabaseApiKeyFetch(apiKey: string, fetchImpl: SupabaseFetch = fetch): SupabaseFetch {
  if (!isOpaqueSupabaseApiKey(apiKey)) return fetchImpl;

  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(input instanceof Request ? input.headers : undefined);
    new Headers(init?.headers).forEach((value, name) => headers.set(name, value));
    headers.set("apikey", apiKey);

    const authorization = headers.get("Authorization");
    if (authorization === `Bearer ${apiKey}`) headers.delete("Authorization");

    return fetchImpl(input, { ...init, headers });
  }) as SupabaseFetch;
}
