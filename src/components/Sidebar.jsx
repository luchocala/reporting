import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { navSections } from "@/config/navigation";
import { useLocalAuth } from "@/lib/LocalAuthContext";
import { isDarkTheme, toggleTheme } from "@/lib/theme";

const workspace = { name: "Adnovation SRL", plan: "Reporting" };

function getUserInitials(user) {
  const first = user?.firstName?.trim()?.[0] || "";
  const last = user?.lastName?.trim()?.[0] || "";

  if (first || last) {
    return `${first}${last}`.toUpperCase();
  }

  return (user?.username?.trim()?.slice(0, 2) || "U").toUpperCase();
}

function getDisplayName(user) {
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  return fullName || user?.username || "Usuario";
}

function NavItem({ item, collapsed = false, onNavigate }) {
  const location = useLocation();
  const isActive = item.path === location.pathname;
  const Icon = item.icon;

  return (
    <li>
      <Link
        to={item.path}
        onClick={onNavigate}
        title={item.label}
        className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors ${
          collapsed ? "justify-center" : ""
        } ${
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        }`}
      >
        {Icon && <Icon className="size-4 shrink-0" />}
        {!collapsed && <span className="truncate">{item.label}</span>}
      </Link>
    </li>
  );
}

function SectionHeader({ section, collapsed = false }) {
  if (collapsed) {
    return null;
  }

  return (
    <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40">
      {section.label}
    </p>
  );
}

export default function Sidebar({ collapsed = false, onToggleCollapsed }) {
  const { user, logout } = useLocalAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(isDarkTheme());

  useEffect(() => {
    const syncTheme = (event) => {
      setDark(event.detail.dark);
    };

    window.addEventListener("themechange", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`hidden md:flex fixed inset-y-0 left-0 z-30 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-3">
        {!collapsed && (
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm flex-1 min-w-0">
            <div className="flex size-6 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
              {workspace.name.charAt(0)}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="font-medium truncate">{workspace.name}</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">{workspace.plan}</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground text-sm font-semibold mx-auto">
            {workspace.name.charAt(0)}
          </div>
        )}
        {!collapsed && (
          <button
            type="button"
            onClick={toggleTheme}
            className="flex size-8 items-center justify-center rounded-md hover:bg-sidebar-accent"
            title={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        )}
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="flex size-8 items-center justify-center rounded-md hover:bg-sidebar-accent"
          title={collapsed ? "Expandir sidebar" : "Contraer sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            <SectionHeader section={section} collapsed={collapsed} />
            <ul className="space-y-1">
              {section.items.map((item) => (
                <NavItem key={item.label} item={item} collapsed={collapsed} />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {user && (
        <div className="border-t border-sidebar-border p-3">
          {collapsed ? (
            <button
              type="button"
              onClick={handleLogout}
              className="mx-auto flex size-9 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-foreground hover:bg-red-500/10 hover:text-red-600 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="size-4" />
            </button>
          ) : (
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                {getUserInitials(user)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{getDisplayName(user)}</p>
                <p className="text-xs text-sidebar-foreground/50 truncate">
                  {user?.email || user?.username || ""}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex size-8 shrink-0 items-center justify-center rounded-md text-red-600 hover:bg-red-500/10 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
