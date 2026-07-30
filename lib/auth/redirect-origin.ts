const productionHosts = new Set([
  "precisionperformance.com.au",
  "www.precisionperformance.com.au",
  "pnr-precision-performance.vercel.app",
  "pnr-precision-performance-rankin007s-projects.vercel.app",
  "pnr-precision-performance-rankin007-rankin007s-projects.vercel.app",
]);

function approvedHost(hostname: string) {
  return productionHosts.has(hostname) || /^pnr-precision-performance-[a-z0-9]+-rankin007s-projects\.vercel\.app$/.test(hostname);
}

export function resolvePasswordlessRedirectOrigin(input: {
  requestOrigin: string | null;
  forwardedHost: string | null;
  forwardedProto: string | null;
  configuredOrigin: string | null;
}) {
  const forwardedHost = input.forwardedHost?.split(",")[0]?.trim().toLowerCase() ?? null;
  const forwardedProto = input.forwardedProto?.split(",")[0]?.trim().toLowerCase() ?? null;
  const forwardedOrigin = forwardedHost && forwardedProto ? `${forwardedProto}://${forwardedHost}` : null;

  const candidates = forwardedHost || forwardedProto ? [forwardedOrigin] : [input.requestOrigin];
  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const url = new URL(candidate);
      if (url.protocol === "https:" && approvedHost(url.hostname) && url.pathname === "/" && !url.search && !url.hash && !url.username && !url.password && !url.port) {
        return url.origin;
      }
      if (process.env.NODE_ENV !== "production" && url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname)) return url.origin;
    } catch {
      // Try the next bounded source.
    }
  }

  if (process.env.NODE_ENV !== "production" && input.configuredOrigin) {
    try {
      const configured = new URL(input.configuredOrigin);
      if (configured.protocol === "http:" && ["localhost", "127.0.0.1"].includes(configured.hostname)) return configured.origin;
    } catch {
      // Fail closed.
    }
  }
  return null;
}

export function buildPasswordlessCallbackUrl(origin: string, next: string) {
  return `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
}
