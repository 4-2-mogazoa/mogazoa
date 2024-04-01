export default function getCookies() {
  if (typeof document !== 'undefined') {
    const cookies = Object.fromEntries(
      document.cookie.split(";").map((cookie) => cookie.trim().split("=")),
    );
    return cookies;
  }
  return {};
}
