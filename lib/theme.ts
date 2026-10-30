export const THEMES = [
  "minimal",
  "bento",
  "bold",
  "brutal",
  "pblur",
] as const;

export type ThemeId = (typeof THEMES)[number];

export const DEFAULT_THEME: ThemeId = "minimal";
export const THEME_COOKIE_NAME = "kha_theme";

export function isThemeId(val: unknown): val is ThemeId {
  return typeof val === "string" && (THEMES as readonly string[]).includes(val);
}

// cookie dibaca server agar layout tema benar sejak render pertama
export function saveThemeCookie(id: ThemeId) {
  document.cookie = `${THEME_COOKIE_NAME}=${id}; path=/; max-age=31536000; samesite=lax`;
}
