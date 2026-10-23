"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Newspaper, Crown, Candy, Flame, DraftingCompass } from "lucide-react";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Skeleton } from "./ui/skeleton";
import { useParams } from "next/navigation";

const themes = [
  { id: "paper", icon: Newspaper, label: { id: "Tema Paper Mono", en: "Paper Mono Theme" } },
  { id: "gold", icon: Crown, label: { id: "Tema Obsidian Gold", en: "Obsidian Gold Theme" } },
  { id: "pop", icon: Candy, label: { id: "Tema Pop Candy", en: "Pop Candy Theme" } },
  { id: "ember", icon: Flame, label: { id: "Tema Crimson Ember", en: "Crimson Ember Theme" } },
  { id: "blueprint", icon: DraftingCompass, label: { id: "Tema Cobalt Blueprint", en: "Cobalt Blueprint Theme" } },
] as const;

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const params = useParams();
  const lang = (params?.lang as "id" | "en") || "id";

  useEffect(() => {
    // eslint-disable-next-line 
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Skeleton className="h-8 w-24" />
    );
  }

  return (
    <ButtonGroup>
      {themes.map(({ id, icon: Icon, label }) => (
        <Tooltip key={id}>
          <TooltipTrigger
            delay={100}
            render={
              <Button aria-label={label[lang]} variant={theme === id ? "default" : "outline"} onClick={
                () => setTheme(id)
              } className="group"><Icon className="group-hover:scale-120 transition-transform duration-200" /></Button>
            }
          />
          <TooltipContent>
            <p>{label[lang]}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
}
