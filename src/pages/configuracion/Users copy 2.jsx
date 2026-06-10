import { useCallback, useEffect, useMemo, useState } from "react";

import EntityListPage from "@/pages/entities/EntityListPage";
import { listUsers } from "@/lib/auth-service";
import {
  mapAuthUserToEntityRow,
  useEntityActionHandlers,
} from "@/lib/entityActionHandlers.jsx";
import { getEntityStatsCards } from "@/lib/entityStatsProviders";
import { buildEntitySectionFromRows } from "@/lib/entity-table-inference";

const usersConfig = {
  key: "configuracion-users",
  group: "Configuración",
  title: "User List",
  subtitle: "Gestión de usuarios del sistema.",
  path: "/configuracion/users",
  createPath: null,
  endpoint: null,
  dataSource: "authUsers",
  actionsKey: "users",
  statsKey: "users",
  emptyMessage: "No hay usuarios para mostrar.",
  columns: [
    { key: "id", label: "ID", type: "text", locked: true },
    {
      key: "name",
      label: "Name",
      type: "text",
      primary: true,
      cellLayout: "stacked",
    },
    { key: "email", label: "Email", type: "text" },
    { key: "username", label: "Username", type: "text" },
    { key: "status", label: "Status", type: "status" },
    { key: "role", label: "Role", type: "badge" },
    { key: "acciones", label: "Actions", type: "actions", locked: true },
  ],
  rows: [],
  primaryFilters: ["status", "role"],
  laneField: "status",
  badgeStyles: {
    status: {
      Pending: "yellow",
      Approved: "green",
      Suspended: "red",
    },
    role: {
      admin: "blue",
      user: "slate",
      Superadmin: "blue",
      Admin: "blue",
      Manager: "yellow",
      Cashier: "slate",
    },
  },
};

function extractUsers(data) {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.users)) return data.users;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.rows)) return data.rows;
  if (Array.isArray(data?.items)) return data.items;

  if (Array.isArray(data?.data?.users)) return data.data.users;
  if (Array.isArray(data?.result?.users)) return data.result.users;
  if (Array.isArray(data?.payload?.users)) return data.payload.users;

  return [];
}

export default function Users() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await listUsers();
      const users = extractUsers(data);
      const mappedRows = users.map(mapAuthUserToEntityRow);

      setRows(mappedRows);
    } catch (err) {
      setRows([]);
      setError(err.message || "No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const actionHandlers = useEntityActionHandlers("users", {
    rows,
    setRows,
    setError,
    refresh: fetchUsers,
    config: usersConfig,
  });

  const statsCards = useMemo(() => getEntityStatsCards("users", rows), [rows]);

  const section = useMemo(
    () =>
      buildEntitySectionFromRows(
        {
          ...usersConfig,
          rows,
          loading,
          error,
          onRefresh: fetchUsers,
          rowActions: actionHandlers.rowActions,
          statsCards,
        },
        rows
      ),
    [
      rows,
      loading,
      error,
      fetchUsers,
      actionHandlers.rowActions,
      statsCards,
    ]
  );

  return (
    <>
      <EntityListPage section={section} />
      {actionHandlers.extraContent}
    </>
  );
}