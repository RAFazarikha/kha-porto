"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Hotel, Pencil, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger
          delay={100}
          render={
            <Button variant={theme === "light" ? "default" : "outline"} onClick={
              () => setTheme("light")
            }><Sun /></Button>
          }
        />
        <TooltipContent>
          <p>Tema Terang</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger 
          delay={100}
          render={
            <Button variant={theme === "dark" ? "default" : "outline"} onClick={
              () => setTheme("dark")
            }><Moon /></Button>
          }
        />
        <TooltipContent>
          <p>Tema Gelap</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger 
          delay={100}
          render={
            <Button variant={theme === "cyberpunk" ? "default" : "outline"} onClick={
              () => setTheme("cyberpunk")
            }><Hotel /></Button>
          }
        />
        <TooltipContent>
          <p>Tema Cyberpunk</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger 
          delay={100}
          render={
            <Button variant={theme === "brutalism" ? "default" : "outline"} onClick={
              () => setTheme("brutalism")
            }><Pencil /></Button>
          }
        />
        <TooltipContent>
          <p>Tema Brutalism</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger 
          delay={100}
          render={
            <Button variant={theme === "vintage" ? "default" : "outline"} onClick={
              () => setTheme("vintage")
            }><ScrollText /></Button>
          }
        />
        <TooltipContent>
          <p>Tema Vintage</p>
        </TooltipContent>
      </Tooltip>
    </ButtonGroup>
  );
}