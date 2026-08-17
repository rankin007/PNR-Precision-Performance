export const protectedRoutePrefixes = ["/portal", "/admin", "/data-entry"];

export const adminRoutePrefixes = ["/admin"];

const fallbackRedirectPath = "/portal";

export function isProtectedPath(pathname: string) {
  return protectedRoutePrefixes.some((prefix) => pathname.startsWith(prefix));
}

export function isAdminPath(pathname: string) {
  return adminRoutePrefixes.some((prefix) => pathname.startsWith(prefix));
}
const redirectSentinelOrigin = "https://redirect.invalid";
const unsafeRedirectCharacters = /[\\\u0000-\u001f\u007f]/;

export function normalizeAppRedirectPath(path: string | null | undefined, fallback = fallbackRedirectPath) {
  if (!path) {
    return fallback;
  }

  let decodedPath: string;
  try {
    decodedPath = decodeURIComponent(path);
  } catch {
    return fallback;
  }

  if (
    unsafeRedirectCharacters.test(path) ||
    unsafeRedirectCharacters.test(decodedPath) ||
    !decodedPath.startsWith("/") ||
    decodedPath.startsWith("//")
  ) {
    return fallback;
  }

  try {
    const resolved = new URL(path, redirectSentinelOrigin);
    if (
      resolved.origin !== redirectSentinelOrigin ||
      !resolved.pathname.startsWith("/") ||
      resolved.username ||
      resolved.password
    ) {
      return fallback;
    }
    return `${resolved.pathname}${resolved.search}${resolved.hash}`;
  } catch {
    return fallback;
  }
}
