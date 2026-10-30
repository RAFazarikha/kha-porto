"use client";

import { useRef, useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { Check, Palette } from "lucide-react";
import { THEMES, type ThemeId } from "@/lib/theme";
import { useThemeTransition } from "@/components/theme/useThemeTransition";

export interface ThemeDict {
  themeLabel: string;
  themes: Record<ThemeId, string>;
}

// Titik pratinjau: satu-satunya hex yang diizinkan di navbar (dasar, aksen)
const PREVIEW: Record<ThemeId, [string, string]> = {
  minimal: ["#E9E2D0", "#0B1E3A"],
  bento: ["#13261C", "#C8E64A"],
  bold: ["#5C0A14", "#F2E2A0"],
  brutal: ["#FF3D6E", "#0E1A6E"],
  pblur: ["#10204A", "#C9B8F0"],
};

function ThemeOptions({ dict, onPick }: { dict: ThemeDict; onPick?: () => void }) {
  const { theme, switchTheme } = useThemeTransition();
  const refs = useRef<Partial<Record<ThemeId, HTMLButtonElement | null>>>({});

  const onKeyDown = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = THEMES[(THEMES.indexOf(theme) + dir + THEMES.length) % THEMES.length];
    switchTheme(next);
    refs.current[next]?.focus();
  };

  return (
    <div role="radiogroup" aria-label={dict.themeLabel} onKeyDown={onKeyDown} className="flex flex-col gap-1">
      {THEMES.map((id) => {
        const on = theme === id;
        const [base, accent] = PREVIEW[id];
        return (
          <button
            key={id}
            ref={(el) => {
              refs.current[id] = el;
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => {
              switchTheme(id);
              onPick?.();
            }}
            className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-(--radius) px-2.5 text-left text-sm font-medium text-foreground outline-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-checked:bg-muted"
          >
            <span aria-hidden="true" className="flex shrink-0 -space-x-1.5">
              <span className="size-5 rounded-full ring-1 ring-border" style={{ backgroundColor: base }} />
              <span className="size-5 rounded-full ring-1 ring-border" style={{ backgroundColor: accent }} />
            </span>
            <span className="flex-1">{dict.themes[id]}</span>
            {on && <Check className="size-4" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}

export default function ThemeToggle({ dict, inline = false }: { dict: ThemeDict; inline?: boolean }) {
  const [open, setOpen] = useState(false);

  // Versi inline dipakai di menu mobile (tanpa popover)
  if (inline) return <ThemeOptions dict={dict} />;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label={dict.themeLabel}
        data-nav-icon=""
        className="inline-flex size-10 cursor-pointer items-center justify-center rounded-(--radius) border border-border bg-transparent text-foreground outline-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring pointer-coarse:size-11"
      >
        <Palette className="size-5" aria-hidden="true" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="end" sideOffset={10} className="z-[60]">
          <Popover.Popup
            data-theme-popover=""
            className="w-60 rounded-(--radius) border border-border bg-popover p-1.5 text-popover-foreground shadow-lg outline-none transition duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0"
          >
            <ThemeOptions dict={dict} onPick={() => setOpen(false)} />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
