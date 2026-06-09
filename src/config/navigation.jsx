import {
  LayoutDashboard,
  Users,
  User,
  Code,
  ShieldCheck,
  AlertTriangle,
  CheckSquare,
  Database,
  Clock,
  BriefcaseBusiness,
  BarChart3,
  Building2,
} from "lucide-react";

export const navSections = [
  {
    label: "Ecommerce",
    items: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        children: [
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
          {
            label: "Órdenes de Facturación",
            path: "/administracion-comercial/ordenes-facturacion",
          },
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
