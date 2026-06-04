import { NavLink, Outlet } from "react-router-dom";
import { Settings, User, CreditCard, LayoutList, Plug, Bell } from "lucide-react";

const links = [
  { to: "/settings/general", label: "General", Icon: Settings },
  { to: "/settings/profile", label: "Profile", Icon: User },
  { to: "/settings/billing", label: "Billing", Icon: CreditCard },
  { to: "/settings/plans", label: "Plans", Icon: LayoutList },
  { to: "/settings/connected-apps", label: "Connected Apps", Icon: Plug },
  { to: "/settings/notifications", label: "Notifications", Icon: Bell },
];

export default function SettingsLayout() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Update account preferences and manage integrations.</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[200px_1fr] gap-6">
        <nav className="flex flex-col gap-0.5">
          {links.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}