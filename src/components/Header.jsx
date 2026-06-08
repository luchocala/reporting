import { useState } from "react";
import { Search, Bell, Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocalAuth } from "@/lib/LocalAuthContext";

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

export default function Header({ title = "Ecommerce App", onMenuClick }) {
  const { user } = useLocalAuth();

  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleMenuClick = () => {
    if (typeof onMenuClick === "function") {
      onMenuClick();
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-12 items-center gap-2 border-b border-border bg-background px-3">
      <button
        type="button"
        className="inline-flex md:hidden size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        onClick={handleMenuClick}
        aria-label="Abrir menú"
      >
        <Menu className="size-5" />
      </button>

      <Separator orientation="vertical" className="h-4 hidden md:block" />

      <span className="text-sm font-medium text-foreground">{title}</span>

      <div className="ml-auto flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground"
        >
          <Search className="size-4" />
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground"
          >
            <Bell className="size-4" />
          </Button>
          <span className="absolute top-1 right-1 flex size-2 rounded-full bg-red-500" />
        </div>

        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={toggleTheme}
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