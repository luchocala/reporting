import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronsUpDown,
  Check,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navSections } from "@/config/navigation";
import { useLocalAuth } from "@/lib/LocalAuthContext";

const teams = [
  { name: "Acme Inc.", plan: "Enterprise" },
  { name: "Globex Corp.", plan: "Pro" },
  { name: "Initech LLC", plan: "Starter" },
];

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
  const hasChildren = item.children && item.children.length > 0;
  const isActive = hasChildren
    ? item.children.some((child) => child.path === location.pathname)
    : item.path === location.pathname;
  const [open, setOpen] = useState(isActive);
  const Icon = item.icon;

  if (collapsed) {
    const targetPath = hasChildren ? item.children[0]?.path || "#" : item.path;

    return (
      <li>
        <Link
          to={targetPath}
          onClick={onNavigate}
          title={item.label}
          className={`flex items-center justify-center rounded-md px-2 py-2 text-sm transition-colors ${
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          }`}
        >
          <Icon className="size-4 shrink-0" />
        </Link>
      </li>
    );
  }

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors ${
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          }`}
        >
          <Icon className="size-4 shrink-0" />
          <span className="flex-1 text-left truncate">{item.label}</span>
          <ChevronRight className={`size-4 transition-transform ${open ? "rotate-90" : ""}`} />
        </button>
        {open && (
          <ul className="ml-6 mt-1 space-y-1 border-l border-sidebar-border pl-2">
            {item.children.map((child) => (
              <li key={child.path}>
                <Link
                  to={child.path}
                  onClick={onNavigate}
                  className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
                    location.pathname === child.path
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        to={item.path}
        onClick={onNavigate}
        className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors ${
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        }`}
      >
        <Icon className="size-4 shrink-0" />
        <span className="truncate">{item.label}</span>
      </Link>
    </li>
  );
}

export default function Sidebar({ collapsed = false, onToggleCollapsed }) {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const { user, logout } = useLocalAuth();
  const navigate = useNavigate();

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
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent flex-1 min-w-0">
              <div className="flex size-6 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                {selectedTeam.name.charAt(0)}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-medium truncate">{selectedTeam.name}</p>
                <p className="text-xs text-sidebar-foreground/50 truncate">{selectedTeam.plan}</p>
              </div>
              <ChevronsUpDown className="size-4 text-sidebar-foreground/50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Teams</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {teams.map((team) => (
                <DropdownMenuItem key={team.name} onClick={() => setSelectedTeam(team)}>
                  <div className="flex size-6 items-center justify-center rounded bg-muted text-xs font-semibold">
                    {team.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{team.name}</p>
                    <p className="text-xs text-muted-foreground">{team.plan}</p>
                  </div>
                  {selectedTeam.name === team.name && <Check className="ml-auto size-4" />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus className="size-4" /> Add team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {collapsed && (
          <div className="flex size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground text-sm font-semibold mx-auto">
            {selectedTeam.name.charAt(0)}
          </div>
        )}
        <button
          onClick={onToggleCollapsed}
          className="flex size-8 items-center justify-center rounded-md hover:bg-sidebar-accent"
        >
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            {!collapsed && (
              <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40">
                {section.label}
              </p>
            )}
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
