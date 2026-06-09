import { useState } from "react";
import { Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocalAuth } from "@/lib/LocalAuthContext";
import { useEffect, useState } from "react";
import { isDarkTheme, toggleTheme } from "@/lib/theme";

function getUserInitial(user) {
  return (
    user?.firstName?.trim()?.[0] ||
    user?.username?.trim()?.[0] ||
    "A"
  ).toUpperCase();
}

function getDisplayName(user) {
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  return fullName || user?.username || "Admin";
}

export default function Header({ onMenuClick }) {
  const { user } = useLocalAuth();

  const [dark, setDark] = useState(isDarkTheme());

  useEffect(() => {
    const syncTheme = (e) => {
      setDark(e.detail.dark);
    };

    window.addEventListener("themechange", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
    };
  }, []);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleMenuClick = () => {
    onMenuClick?.();
  };

  return (
    <header className="sticky top-0 z-20 flex h-12 items-center gap-2 border-b border-border bg-background px-3">
      <button
        type="button"
        onClick={handleMenuClick}
        className="md:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted transition-colors"
        aria-label="Abrir menú"
      >
        <Menu className="pointer-events-none size-5" />
      </button>

      <span className="md:hidden text-sm font-medium text-foreground">Reporting</span>

      <div className="ml-auto flex items-center gap-0.5">
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={handleThemeToggle}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>

        <Separator orientation="vertical" className="h-4 mx-1" />

        <div className="flex items-center gap-2 pr-1">
          <div className="size-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold">
            {getUserInitial(user)}
          </div>
          <span className="hidden sm:block text-xs text-muted-foreground">
            {getDisplayName(user)}
          </span>
        </div>
      </div>
    </header>
  );
}
