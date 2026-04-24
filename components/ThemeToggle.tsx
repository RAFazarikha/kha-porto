"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Hotel, Pencil, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Skeleton } from "./ui/skeleton";
import { useParams } from "next/navigation";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const params = useParams();
  const lang = (params?.lang as "id" | "en") || "id";

  const navTexts = {
    id: { 
      light: "Tema Terang", 
      dark: "Tema Gelap", 
      cyberpunk: "Tema Cyberpunk", 
      brutalism: "Tema Brutalism", 
      vintage: "Tema Vintage" 
    },
    en: { 
      light: "Light Theme", 
      dark: "Dark Theme", 
      cyberpunk: "Cyberpunk Theme", 
      brutalism: "Brutalism Theme", 
      vintage: "Vintage Theme" 
    },
  };
  const t = navTexts[lang] || navTexts.id;

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
      <Tooltip>
        <TooltipTrigger
          delay={100}
          render={
            <Button variant={theme === "light" ? "default" : "outline"} onClick={
              () => setTheme("light")
            } className={`group`}><Sun className="group-hover:scale-120 transition-transform duration-200" /></Button>
          }
        />
        <TooltipContent>
          <p>{t.light}</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger 
          delay={100}
          render={
            <Button variant={theme === "dark" ? "default" : "outline"} onClick={
              () => setTheme("dark")
            } className={`group`}><Moon className="group-hover:scale-120 transition-transform duration-200" /></Button>
          }
        />
        <TooltipContent>
          <p>{t.dark}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger 
          delay={100}
          render={
            <Button variant={theme === "cyberpunk" ? "default" : "outline"} onClick={
              () => setTheme("cyberpunk")
            } className={`group`}><Hotel className="group-hover:scale-120 transition-transform duration-200" /></Button>
          }
        />
        <TooltipContent>
          <p>{t.cyberpunk}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger 
          delay={100}
          render={
            <Button variant={theme === "brutalism" ? "default" : "outline"} onClick={
              () => setTheme("brutalism")
            } className={`group`}><Pencil className="group-hover:scale-120 transition-transform duration-200" /></Button>
          }
        />
        <TooltipContent>
          <p>{t.brutalism}</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger 
          delay={100}
          render={
            <Button variant={theme === "vintage" ? "default" : "outline"} onClick={
              () => setTheme("vintage")
            } className={`group`}><ScrollText className="group-hover:scale-120 transition-transform duration-200" /></Button>
          }
        />
        <TooltipContent>
          <p>{t.vintage}</p>
        </TooltipContent>
      </Tooltip>
    </ButtonGroup>
  );
}