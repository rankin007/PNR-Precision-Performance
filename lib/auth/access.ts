export const protectedRoutePrefixes = ["/portal", "/admin", "/data-entry"];

export const adminRoutePrefixes = ["/admin"];

const fallbackRedirectPath = "/portal";

export function isProtectedPath(pathname: string) {
  return protectedRoutePrefixes.some((prefix) => pathname.startsWith(prefix));
}

export function isAdminPath(pathname: string) {
  return adminRoutePrefixes.some((prefix) => pathname.startsWith(prefix));
}
export function normalizeAppRedirectPath(path: string | null | undefined, fallback = fallbackRedirectPath) {
  if (!path) {
    return fallback;
  }

  if (!path.startsWith("/") || path.startsWith("//")) {
    return fallback;
  }

  return path;
}
