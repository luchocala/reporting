import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, X, LogOut } from "lucide-react";

import { navSections } from "@/config/navigation";
import { useLocalAuth } from "@/lib/LocalAuthContext";

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

function MobileNavItem({ item, onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(() => {
    return item.children?.some((child) => child.path === location.pathname);
  });

  const Icon = item.icon;
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const isActive = hasChildren
    ? item.children.some((child) => child.path === location.pathname)
    : item.path === location.pathname;

  const handleNavigate = (path) => {
    navigate(path);
    onNavigate();
  };

  if (!hasChildren) {
    return (
      <button
        type="button"
        onClick={() => handleNavigate(item.path)}
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        }`}
      >
        <Icon className="size-4 shrink-0" />
        <span>{item.label}</span>
      </button>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        }`}
      >
        <Icon className="size-4 shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronRight
          className={`size-4 transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>

      {open && (
        <div className="ml-5 mt-1 space-y-1 border-l border-sidebar-border pl-3">
          {item.children.map((child) => {
            const childActive = location.pathname === child.path;

            return (
              <button
                type="button"
                key={child.path}
                onClick={() => handleNavigate(child.path)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  childActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                {child.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MobileSidebar({ isOpen, onClose }) {
  const { user, logout } = useLocalAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="fixed inset-0 z-[100] bg-sidebar text-sidebar-foreground md:hidden flex flex-col">
      <div className="flex items-center justify-between border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold shrink-0">
            A
          </div>

          <div className="min-w-0">
            <h1 className="text-sm font-semibold text-sidebar-foreground truncate">
              Ecommerce App
            </h1>
            <p className="text-xs text-sidebar-foreground/50 truncate">
              Navigation menu
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-lg hover:bg-sidebar-accent transition-colors"
          aria-label="Cerrar menú"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/45">
              {section.label}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  onNavigate={onClose}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {user && (
        <div className="border-t border-sidebar-border bg-sidebar-accent/30 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                {getUserInitials(user)}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {getDisplayName(user)}
                </p>
                <p className="text-xs text-sidebar-foreground/50 truncate">
                  {user?.email || user?.username || ""}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex size-10 items-center justify-center rounded-lg text-red-600 hover:bg-red-500/10 transition-colors"
              aria-label="Cerrar sesión"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
