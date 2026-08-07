"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render placeholder for SSR to avoid hydration mismatch
    return (
      <div className="relative p-2 rounded-xl w-9 h-9" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
      className="relative p-2 rounded-xl transition-all duration-300 group
        bg-white/60 hover:bg-[#14CC99]/10 border border-gray-200/60 hover:border-[#14CC99]/40
        dark:bg-slate-800/60 dark:hover:bg-[#14CC99]/15 dark:border-slate-700/60 dark:hover:border-[#14CC99]/40
        shadow-sm hover:shadow-md hover:shadow-[#14CC99]/10 active:scale-95"
      aria-label="Toggle theme"
    >
      {/* Sun icon (shown in light mode) */}
      <Sun
        className="h-5 w-5 transition-all duration-300
          text-amber-500 group-hover:text-amber-400
          scale-100 rotate-0
          dark:scale-0 dark:-rotate-90 dark:absolute dark:opacity-0"
      />
      {/* Moon icon (shown in dark mode) */}
      <Moon
        className="h-5 w-5 transition-all duration-300
          text-[#14CC99] group-hover:text-[#11b386]
          scale-0 rotate-90 absolute top-2 left-2 opacity-0
          dark:scale-100 dark:rotate-0 dark:relative dark:top-0 dark:left-0 dark:opacity-100"
      />
    </button>
  );
}
