import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,
  ChevronRight,
  ChevronsUpDown,
  Code,
  ShieldCheck,
  AlertTriangle,
  CheckSquare,
  Check,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Database,
  Clock,
  BriefcaseBusiness,
  BarChart3,
  Building2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocalAuth } from "@/lib/LocalAuthContext";

const teams = [
  { name: "Acme Inc.", plan: "Enterprise" },
  { name: "Globex Corp.", plan: "Pro" },
  { name: "Initech LLC", plan: "Starter" },
];

const navSections = [
  {
    label: "Ecommerce",
    items: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        children: [
          { label: "Comprobantes", path: "/comprobantes" },
          { label: "Dashboard 1", path: "/" },
          { label: "Dashboard 2", path: "/dashboard-2" },
          { label: "Dashboard 3", path: "/dashboard-3" },
          { label: "Dashboard 4", path: "/dashboard-4" },
          { label: "Dashboard 5", path: "/dashboard-5" },
          { label: "Dashboard 6", path: "/dashboard-6" },
          { label: "Dashboard 7", path: "/dashboard-7" },
          { label: "Dashboard 8", path: "/dashboard-8" },
          { label: "Dashboard 9", path: "/dashboard-9" },
        ],
      },
    ],
  },
  {
    label: "Estructural",
    items: [
      {
        icon: Database,
        label: "Estructural",
        children: [
          { label: "Personas", path: "/estructural/personas" },
          { label: "Razones Sociales", path: "/estructural/razones-sociales" },
          { label: "CBUs", path: "/estructural/cbus" },
          { label: "Cuentas", path: "/estructural/cuentas" },
          { label: "Colaboradores", path: "/estructural/colaboradores" },
          { label: "Proyectos", path: "/estructural/proyectos" },
          { label: "Recurrentes", path: "/estructural/recurrentes" },
          { label: "Facturación", path: "/estructural/facturacion" },
        ],
      },
    ],
  },
  {
    label: "Proveedores",
    items: [
      {
        icon: Clock,
        label: "Proveedores",
        children: [{ label: "Tiempo", path: "/proveedores/tiempo" }],
      },
    ],
  },
  {
    label: "Gestión",
    items: [
      {
        icon: BriefcaseBusiness,
        label: "Gestión",
        children: [
          { label: "Agenda", path: "/gestion/agenda" },
          { label: "Activos", path: "/gestion/activos" },
          { label: "Dominios", path: "/gestion/dominios" },
        ],
      },
    ],
  },
  {
    label: "Reportes",
    items: [
      {
        icon: BarChart3,
        label: "Reportes",
        children: [
          { label: "Ventas", path: "/reportes/ventas" },
          {
            label: "Recurrentes por cuentas",
            path: "/reportes/recurrentes-por-cuentas",
          },
          {
            label: "Recurrentes por actividades",
            path: "/reportes/recurrentes-por-actividades",
          },
        ],
      },
    ],
  },
  {
    label: "Administración y Comercial",
    items: [
      {
        icon: Building2,
        label: "Administración y Comercial",
        children: [
          { label: "Ventas", path: "/administracion-comercial/ventas" },
          { label: "Índices", path: "/administracion-comercial/indices" },
        ],
      },
    ],
  },
  {
    label: "Original",
    items: [
      { icon: Users, label: "Users", path: "/users" },
      { icon: CheckSquare, label: "Tasks", path: "/tasks" },
      { icon: User, label: "Profile", path: "/profile" },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        icon: Code,
        label: "Dev Tools",
        children: [
          { label: "Overview", path: "/developers/overview" },
          { label: "API Keys", path: "/developers/api-keys" },
          { label: "Webhooks", path: "/developers/webhooks" },
          { label: "Events & Logs", path: "/developers/events-logs" },
        ],
      },
    ],
  },
  {
    label: "Pages",
    items: [
      {
        icon: ShieldCheck,
        label: "Auth",
        children: [
          { label: "Login", path: "/login" },
          { label: "Register", path: "/register" },
          { label: "Forgot Password", path: "/forgot-password" },
        ],
      },
      {
        icon: AlertTriangle,
        label: "Errors",
        children: [
          { label: "401 Unauthorized", path: "/errors/401" },
          { label: "403 Forbidden", path: "/errors/403" },
          { label: "404 Not Found", path: "/errors/404" },
          { label: "500 Server Error", path: "/errors/500" },
          { label: "503 Maintenance", path: "/errors/503" },
        ],
      },
    ],
  },
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
