import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Truck,
  ChevronRight,
  ChevronsUpDown,
  Settings,
  Code,
  ShieldCheck,
  AlertTriangle,
  CheckSquare,
  Check,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  X,
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
      {
        icon: Package,
        label: "Products",
        children: [
          { label: "Add Product", path: "/ecommerce/add-product" },
          { label: "Add Product 2", path: "/ecommerce/add-product-2" },
          {
            label: "Edit Product",
            path: "/ecommerce/edit-product/radiance-ritual-set",
          },
          {
            label: "Edit Product 2",
            path: "/ecommerce/edit-product-2/radiance-ritual-set",
          },
          { label: "Product Detail 1", path: "/ecommerce/product-detail-1" },
          { label: "Product Detail 2", path: "/ecommerce/product-detail-2" },
          { label: "Product List 1", path: "/ecommerce/product-list-1" },
          { label: "Product List 2", path: "/ecommerce/product-list-2" },
          { label: "Product List 3", path: "/ecommerce/product-list-3" },
          { label: "Product List 4", path: "/ecommerce/product-list-4" },
        ],
      },
      {
        icon: ShoppingCart,
        label: "Orders",
        children: [
          { label: "Add New Order", path: "/ecommerce/add-order" },
          { label: "Edit Order", path: "/ecommerce/edit-order/so-654" },
          { label: "Order List 1", path: "/ecommerce/order-list-1" },
          { label: "Order List 2", path: "/ecommerce/order-list-2" },
          { label: "Order List 3", path: "/ecommerce/order-list-3" },
          { label: "Order Detail 1", path: "/ecommerce/order-detail-1" },
          { label: "Order Detail 2", path: "/ecommerce/order-detail-2" },
        ],
      },
      {
        icon: Users,
        label: "Customers",
        children: [
          { label: "Add Customer", path: "/ecommerce/add-customer" },
          {
            label: "Edit Customer",
            path: "/ecommerce/edit-customer/cus-1742",
          },
          { label: "Customer List 1", path: "/ecommerce/customer-list-1" },
          { label: "Customer Detail 1", path: "/ecommerce/customer-detail-1" },
        ],
      },
      {
        icon: Truck,
        label: "Shipments",
        children: [
          { label: "Create Shipping Label", path: "/ecommerce/add-shipping" },
          { label: "Edit Shipping Label", path: "/ecommerce/edit-shipping" },
          { label: "Shipment List 1", path: "/ecommerce/shipment-list-1" },
          { label: "Shipment Detail 1", path: "/ecommerce/shipment-detail-1" },
        ],
      },
    ],
  },
  {
    label: "Original",
    items: [
      { icon: Users, label: "Users", path: "/users" },
      { icon: CheckSquare, label: "Tasks", path: "/tasks" },
      {
        icon: Settings,
        label: "Settings",
        children: [
          { label: "General", path: "/settings/general" },
          { label: "Profile", path: "/settings/profile" },
          { label: "Billing", path: "/settings/billing" },
          { label: "Plans", path: "/settings/plans" },
          { label: "Connected Apps", path: "/settings/connected-apps" },
          { label: "Notifications", path: "/settings/notifications" },
        ],
      },
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
    if (hasChildren) {
      const firstChildPath = item.children[0]?.path || "#";

      return (
        <li>
          <Link
            to={firstChildPath}
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

    return (
      <li>
        <Link
          to={item.path}
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
          type="button"
          onClick={() => setOpen((current) => !current)}
          className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
            isActive
              ? "font-medium text-sidebar-foreground"
              : "text-sidebar-foreground/60"
          }`}
        >
          <Icon className="size-4 shrink-0" />
          <span className="flex-1 text-left truncate">{item.label}</span>
          <ChevronRight
            className={`size-3.5 shrink-0 transition-transform duration-200 ${
              open ? "rotate-90" : ""
            }`}
          />
        </button>

        {open && (
          <ul className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
            {item.children.map((child) => (
              <li key={child.path}>
                <Link
                  to={child.path}
                  onClick={onNavigate}
                  className={`block rounded-md px-2 py-1 text-sm transition-colors ${
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
        className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
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

function SidebarContent({
  collapsed = false,
  mobile = false,
  activeTeam,
  setActiveTeam,
  user,
  onLogout,
  onNavigate,
  onToggleCollapsed,
  onMobileClose,
}) {
  return (
    <>
      <div className="p-2">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent transition-colors text-left ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <div className="flex size-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold shrink-0">
                  {activeTeam.name.charAt(0)}
                </div>

                {!collapsed && (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold leading-tight truncate text-sidebar-foreground">
                        {activeTeam.name}
                      </p>
                      <p className="text-[11px] text-sidebar-foreground/50 leading-tight truncate">
                        {activeTeam.plan}
                      </p>
                    </div>
                    <ChevronsUpDown className="size-3.5 text-sidebar-foreground/40 shrink-0" />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-52" align="start" side="bottom">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Teams
              </DropdownMenuLabel>

              {teams.map((team) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    {team.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{team.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {team.plan}
                    </p>
                  </div>

                  {activeTeam.name === team.name && (
                    <Check className="size-3.5 text-primary ml-auto" />
                  )}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-2 cursor-pointer text-muted-foreground">
                <Plus className="size-4" />
                <span className="text-sm">Add team</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {mobile ? (
            <button
              type="button"
              onClick={onMobileClose}
              className="inline-flex size-9 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground md:hidden"
              aria-label="Cerrar menú"
            >
              <X className="size-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onToggleCollapsed}
              className="hidden md:inline-flex size-8 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              aria-label={collapsed ? "Mostrar sidebar" : "Ocultar sidebar"}
              title={collapsed ? "Mostrar sidebar" : "Ocultar sidebar"}
            >
              {collapsed ? (
                <PanelLeftOpen className="size-4" />
              ) : (
                <PanelLeftClose className="size-4" />
              )}
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 px-2 pb-2 space-y-3 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-2 mb-1 text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-widest">
                {section.label}
              </p>
            )}

            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent transition-colors ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <div className="size-7 rounded-full bg-sidebar-primary flex items-center justify-center text-xs font-semibold text-sidebar-primary-foreground shrink-0">
                {getUserInitials(user)}
              </div>

              {!collapsed && (
                <>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-xs font-medium leading-tight truncate text-sidebar-foreground">
                      {getDisplayName(user)}
                    </p>
                    <p className="text-[11px] text-sidebar-foreground/50 leading-tight truncate">
                      {user?.email || user?.username || ""}
                    </p>
                  </div>
                  <ChevronsUpDown className="size-3.5 text-sidebar-foreground/40 shrink-0" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-52" align="start" side="top">
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Cuenta
            </DropdownMenuLabel>

            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="size-4" />
              <span>Configuración</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={onLogout}
              className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="size-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default function Sidebar({
  collapsed = false,
  mobileOpen = false,
  onToggleCollapsed,
  onMobileClose,
}) {
  const [activeTeam, setActiveTeam] = useState(teams[0]);
  const { user, logout } = useLocalAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleMobileNavigate = () => {
    if (mobileOpen) {
      onMobileClose?.();
    }
  };

   return (
    <>
      <aside
        className={`hidden md:flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar h-screen sticky top-0 overflow-y-auto transition-[width] duration-200 ${
          collapsed ? "w-14" : "w-56"
        }`}
      >
        <SidebarContent
          collapsed={collapsed}
          activeTeam={activeTeam}
          setActiveTeam={setActiveTeam}
          user={user}
          onLogout={handleLogout}
          onNavigate={undefined}
          onToggleCollapsed={onToggleCollapsed}
        />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden bg-sidebar text-sidebar-foreground">
          <aside className="flex h-dvh w-full flex-col overflow-y-auto">
            <SidebarContent
              mobile
              collapsed={false}
              activeTeam={activeTeam}
              setActiveTeam={setActiveTeam}
              user={user}
              onLogout={handleLogout}
              onNavigate={handleMobileNavigate}
              onMobileClose={onMobileClose}
            />
          </aside>
        </div>
      )}
    </>
  );
}