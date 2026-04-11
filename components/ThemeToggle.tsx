"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors rounded-lg text-sm font-semibold flex items-center gap-2"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-blue-400" />
      ) : (
        <Moon className="w-5 h-5 text-blue-600" />
      )}
    </button>
  );
}