"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ThemeIcon } from "./icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      className="iconbtn"
      type="button"
      aria-label="Changer le thème"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted ? <ThemeIcon /> : <span aria-hidden="true" />}
    </button>
  );
}
