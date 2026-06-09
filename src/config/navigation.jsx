import {
  Activity,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckSquare,
  Clock,
  Database,
  FileSpreadsheet,
  FolderKanban,
  Globe,
  HardDrive,
  Landmark,
  LayoutDashboard,
  LineChart,
  ReceiptText,
  Repeat,
  TrendingUp,
  User,
  Users,
  WalletCards,
} from "lucide-react";

export const navSections = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    items: [
      { icon: LayoutDashboard, label: "Dashboard 1", path: "/" },
      { icon: LayoutDashboard, label: "Dashboard 2", path: "/dashboard-2" },
      { icon: LayoutDashboard, label: "Dashboard 3", path: "/dashboard-3" },
      { icon: LayoutDashboard, label: "Dashboard 4", path: "/dashboard-4" },
      { icon: LayoutDashboard, label: "Dashboard 5", path: "/dashboard-5" },
      { icon: LayoutDashboard, label: "Dashboard 6", path: "/dashboard-6" },
      { icon: LayoutDashboard, label: "Dashboard 7", path: "/dashboard-7" },
      { icon: LayoutDashboard, label: "Dashboard 8", path: "/dashboard-8" },
      { icon: LayoutDashboard, label: "Dashboard 9", path: "/dashboard-9" },
    ],
  },
  {
    label: "Estructural",
    icon: Database,
    items: [
      { icon: User, label: "Personas", path: "/estructural/personas" },
      { icon: Building2, label: "Razones Sociales", path: "/estructural/razones-sociales" },
      { icon: Landmark, label: "CBUs", path: "/estructural/cbus" },
      { icon: WalletCards, label: "Cuentas", path: "/estructural/cuentas" },
      { icon: Users, label: "Colaboradores", path: "/estructural/colaboradores" },
      { icon: FolderKanban, label: "Proyectos", path: "/estructural/proyectos" },
      { icon: Repeat, label: "Recurrentes", path: "/estructural/recurrentes" },
      { icon: ReceiptText, label: "Facturación", path: "/estructural/facturacion" },
    ],
  },
  {
    label: "Proveedores",
    icon: Clock,
    items: [{ icon: Clock, label: "Tiempo", path: "/proveedores/tiempo" }],
  },
  {
    label: "Gestión",
    icon: BriefcaseBusiness,
    items: [
      { icon: CalendarDays, label: "Agenda", path: "/gestion/agenda" },
      { icon: HardDrive, label: "Activos", path: "/gestion/activos" },
      { icon: Globe, label: "Dominios", path: "/gestion/dominios" },
    ],
  },
  {
    label: "Reportes",
    icon: BarChart3,
    items: [
      { icon: TrendingUp, label: "Ventas", path: "/reportes/ventas" },
      {
        icon: BarChart3,
        label: "Recurrentes por cuentas",
        path: "/reportes/recurrentes-por-cuentas",
      },
      {
        icon: Activity,
        label: "Recurrentes por actividades",
        path: "/reportes/recurrentes-por-actividades",
      },
    ],
  },
  {
    label: "Administración y Comercial",
    icon: Building2,
    items: [
      { icon: TrendingUp, label: "Ventas", path: "/administracion-comercial/ventas" },
      { icon: LineChart, label: "Índices", path: "/administracion-comercial/indices" },
      {
        icon: FileSpreadsheet,
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
