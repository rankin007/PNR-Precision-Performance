export const protectedRoutePrefixes = ["/portal", "/admin", "/data-entry"];

export const adminRoutePrefixes = ["/admin"];

export function isProtectedPath(pathname: string) {
  return protectedRoutePrefixes.some((prefix) => pathname.startsWith(prefix));
}

export function isAdminPath(pathname: string) {
  return adminRoutePrefixes.some((prefix) => pathname.startsWith(prefix));
}

