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
  configuredOrigin: string | null;
}) {
  for (const candidate of [input.requestOrigin, input.configuredOrigin]) {
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
  return null;
}
