"use client";

import { useRouter, usePathname } from "next/navigation";
import { playSfx } from "@/lib/sfx";

export interface LangDict {
  language: string;
  languages: { id: string; en: string };
}

const LANGS = ["id", "en"] as const;

export default function LanguageSwitcher({ currentLang, dict, large = false }: { currentLang: string; dict: LangDict; large?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (newLang: (typeof LANGS)[number]) => {
    if (newLang === currentLang) return;
    // Ganti hanya segmen bahasa: /id/about -> /en/about
    const segments = pathname.split("/");
    if (segments.length > 1) segments[1] = newLang;
    playSfx("select");
    router.push(segments.join("/"));
  };

  return (
    <div role="group" aria-label={dict.language} className="inline-flex items-center rounded-(--radius) border border-border p-0.5">
      {LANGS.map((l) => {
        const on = currentLang === l;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={on}
            aria-label={dict.languages[l]}
            onClick={() => switchTo(l)}
            className={`cursor-pointer rounded-[calc(var(--radius)-2px)] px-2.5 text-xs font-bold outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring ${
              large ? "min-h-11 min-w-12" : "min-h-8 min-w-9 pointer-coarse:min-h-11 pointer-coarse:min-w-11"
            } ${on ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
