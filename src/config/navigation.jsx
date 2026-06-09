import {
  LayoutDashboard,
  Users,
  User,
  CheckSquare,
  Database,
  Clock,
  BriefcaseBusiness,
  BarChart3,
  Building2,
} from "lucide-react";

export const navSections = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    items: [
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
    label: "Estructural",
    icon: Database,
    items: [
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
  {
    label: "Proveedores",
    icon: Clock,
    items: [{ label: "Tiempo", path: "/proveedores/tiempo" }],
  },
  {
    label: "Gestión",
    icon: BriefcaseBusiness,
    items: [
      { label: "Agenda", path: "/gestion/agenda" },
      { label: "Activos", path: "/gestion/activos" },
      { label: "Dominios", path: "/gestion/dominios" },
    ],
  },
  {
    label: "Reportes",
    icon: BarChart3,
    items: [
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
  {
    label: "Administración y Comercial",
    icon: Building2,
    items: [
      { label: "Ventas", path: "/administracion-comercial/ventas" },
      { label: "Índices", path: "/administracion-comercial/indices" },
      {
        label: "Órdenes de Facturación",
        path: "/administracion-comercial/ordenes-facturacion",
      },
    ],
  },
  {
    label: "Configuración",
    items: [
      { icon: Users, label: "Users", path: "/configuracion/users" },
      { icon: CheckSquare, label: "Tasks", path: "/configuracion/tasks" },
      { icon: User, label: "Profile", path: "/configuracion/profile" },
    ],
  },
];
