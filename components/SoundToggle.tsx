"use client";

import { useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isSoundEnabled, setSoundEnabled, subscribeSound } from "@/lib/sfx";

export default function SoundToggle({ label, inline = false }: { label: string; inline?: boolean }) {
  const on = useSyncExternalStore(subscribeSound, isSoundEnabled, () => false);
  const Icon = on ? Volume2 : VolumeX;
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={inline ? undefined : label}
      onClick={() => setSoundEnabled(!on)}
      className={
        inline
          ? "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-(--radius) border border-border px-4 text-base font-semibold text-foreground outline-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-pressed:bg-muted"
          : "inline-flex size-10 cursor-pointer items-center justify-center rounded-(--radius) border border-border bg-transparent text-foreground outline-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring pointer-coarse:size-11"
      }
    >
      <Icon className="size-5" aria-hidden="true" />
      {inline && <span>{label}</span>}
    </button>
  );
}
