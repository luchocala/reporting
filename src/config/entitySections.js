export const entitySections = [
  // Estructural
  {
    key: "personas",
    group: "Estructural",
    title: "Personas",
    subtitle: "Gestión estructural de personas.",
    path: "/estructural/personas",
    createPath: "/estructural/personas/new",
    endpoint: "/api/estructural/personas",
  },
  {
    key: "razones-sociales",
    group: "Estructural",
    title: "Razones Sociales",
    subtitle: "Gestión estructural de razones sociales.",
    path: "/estructural/razones-sociales",
    createPath: "/estructural/razones-sociales/new",
    endpoint: "/api/estructural/razones-sociales",
  },
  {
    key: "cbus",
    group: "Estructural",
    title: "CBUs",
    subtitle: "Gestión estructural de CBUs.",
    path: "/estructural/cbus",
    createPath: "/estructural/cbus/new",
    endpoint: "/api/estructural/cbus",
  },
  {
    key: "cuentas",
    group: "Estructural",
    title: "Cuentas",
    subtitle: "Gestión estructural de cuentas.",
    path: "/estructural/cuentas",
    createPath: "/estructural/cuentas/new",
    endpoint: "/api/estructural/cuentas",
  },
  {
    key: "colaboradores",
    group: "Estructural",
    title: "Colaboradores",
    subtitle: "Gestión estructural de colaboradores.",
    path: "/estructural/colaboradores",
    createPath: "/estructural/colaboradores/new",
    endpoint: "/api/estructural/colaboradores",
  },
  {
    key: "proyectos",
    group: "Estructural",
    title: "Proyectos",
    subtitle: "Gestión estructural de proyectos.",
    path: "/estructural/proyectos",
    createPath: "/estructural/proyectos/new",
    endpoint: "/api/estructural/proyectos",
  },
  {
    key: "recurrentes",
    group: "Estructural",
    title: "Recurrentes",
    subtitle: "Gestión estructural de recurrentes.",
    path: "/estructural/recurrentes",
    createPath: "/estructural/recurrentes/new",
    endpoint: "/api/estructural/recurrentes",
  },
  {
    key: "facturacion",
    group: "Estructural",
    title: "Facturación",
    subtitle: "Gestión estructural de facturación.",
    path: "/estructural/facturacion",
    createPath: "/estructural/facturacion/new",
    endpoint: "/api/estructural/facturacion",
  },

  // Proveedores
  {
    key: "tiempo",
    group: "Proveedores",
    title: "Tiempo",
    subtitle: "Gestión de tiempo de proveedores.",
    path: "/proveedores/tiempo",
    createPath: "/proveedores/tiempo/new",
    endpoint: "/api/proveedores/tiempo",
  },

  // Gestión
  {
    key: "agenda",
    group: "Gestión",
    title: "Agenda",
    subtitle: "Gestión de agenda.",
    path: "/gestion/agenda",
    createPath: "/gestion/agenda/new",
    endpoint: "/api/gestion/agenda",
  },
  {
    key: "activos",
    group: "Gestión",
    title: "Activos",
    subtitle: "Gestión de activos.",
    path: "/gestion/activos",
    createPath: "/gestion/activos/new",
    endpoint: "/api/gestion/activos",
  },
  {
    key: "dominios",
    group: "Gestión",
    title: "Dominios",
    subtitle: "Gestión de dominios.",
    path: "/gestion/dominios",
    createPath: "/gestion/dominios/new",
    endpoint: "/api/gestion/dominios",
  },

  // Reportes
  {
    key: "reportes-ventas",
    group: "Reportes",
    title: "Ventas",
    subtitle: "Reporte de ventas.",
    path: "/reportes/ventas",
    createPath: null,
    endpoint: "/api/reportes/ventas",
  },
  {
    key: "recurrentes-por-cuentas",
    group: "Reportes",
    title: "Recurrentes por cuentas",
    subtitle: "Reporte de recurrentes por cuentas.",
    path: "/reportes/recurrentes-por-cuentas",
    createPath: null,
    endpoint: "/api/reportes/recurrentes-por-cuentas",
  },
  {
    key: "recurrentes-por-actividades",
    group: "Reportes",
    title: "Recurrentes por actividades",
    subtitle: "Reporte de recurrentes por actividades.",
    path: "/reportes/recurrentes-por-actividades",
    createPath: null,
    endpoint: "/api/reportes/recurrentes-por-actividades",
  },

  // Administración y Comercial
  {
    key: "administracion-comercial-ventas",
    group: "Administración y Comercial",
    title: "Ventas",
    subtitle: "Administración comercial de ventas.",
    path: "/administracion-comercial/ventas",
    createPath: null,
    endpoint: "/api/administracion-comercial/ventas",
  },
  {
    key: "indices",
    group: "Administración y Comercial",
    title: "Índices",
    subtitle: "Administración comercial de índices.",
    path: "/administracion-comercial/indices",
    createPath: null,
    endpoint: "/api/administracion-comercial/indices",
  },
];

export function getEntitySectionByKey(key) {
  return entitySections.find((section) => section.key === key);
}

export function getEntitySectionsByGroup(group) {
  return entitySections.filter((section) => section.group === group);
}