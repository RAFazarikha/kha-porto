"use client";

import { useRef, useEffect, useState } from "react";
import { LayoutGrid, Type, Shapes, Square, Droplets } from "lucide-react";
import { useParams } from "next/navigation";
import { THEMES, isThemeId, type ThemeId } from "@/lib/theme";
import { useThemeTransition } from "@/components/theme/useThemeTransition";

const meta: Record<ThemeId, { icon: typeof Square; name: { id: string; en: string } }> = {
  minimal: { icon: Square, name: { id: "Minimal", en: "Minimal" } },
  bento: { icon: LayoutGrid, name: { id: "Bento", en: "Bento" } },
  bold: { icon: Type, name: { id: "Tipografi", en: "Bold Type" } },
  brutal: { icon: Shapes, name: { id: "Neo Brutal", en: "Neo Brutal" } },
  pblur: { icon: Droplets, name: { id: "Blur", en: "Blur" } },
};

export default function ThemeToggle() {
  const { theme, switchTheme } = useThemeTransition();
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const lang = params?.lang === "id" ? "id" : "en";
  const group = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const active = mounted && isThemeId(theme) ? theme : null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const i = THEMES.indexOf(active ?? THEMES[0]);
    const next = THEMES[(i + dir + THEMES.length) % THEMES.length];
    switchTheme(next);
    group.current?.querySelector<HTMLElement>(`[data-id="${next}"]`)?.focus();
  };

  return (
    <div
      ref={group}
      role="radiogroup"
      aria-label={lang === "id" ? "Pilih gaya tampilan" : "Choose visual style"}
      onKeyDown={onKeyDown}
      className="inline-flex items-center gap-1 border bg-card p-1 rounded-(--radius) max-w-full overflow-x-auto"
    >
      {THEMES.map((id) => {
        const { icon: Icon, name } = meta[id];
        const on = active === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            data-id={id}
            aria-checked={on}
            tabIndex={on || (!active && id === THEMES[0]) ? 0 : -1}
            title={name[lang]}
            onClick={() => switchTheme(id)}
            className={`flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-[calc(var(--radius)/1.5)] transition-colors focus-visible:outline-2 focus-visible:outline-ring cursor-pointer ${
              on ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-foreground"
            }`}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span className={on ? "inline" : "sr-only md:not-sr-only"}>{name[lang]}</span>
          </button>
        );
      })}
    </div>
  );
}
