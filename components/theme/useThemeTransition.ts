"use client";

import { useTheme } from "next-themes";
import { saveThemeCookie, type ThemeId } from "@/lib/theme";

// ponytail: native startViewTransition API, fallback ke instant swap, 0 library
export function useThemeTransition() {
  const { theme, setTheme } = useTheme();

  const switchTheme = (next: ThemeId) => {
    if (next === theme) return;
    saveThemeCookie(next);

    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = typeof document !== "undefined" ? (document as any) : null; // eslint-disable-line @typescript-eslint/no-explicit-any

    if (!doc?.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    doc.documentElement.setAttribute("data-vt-to", next);
    const transition = doc.startViewTransition(() => {
      setTheme(next);
    });

    transition.finished.finally(() => {
      doc.documentElement.removeAttribute("data-vt-to");
    });
  };

  return { theme: (theme as ThemeId) || "minimal", switchTheme };
}
