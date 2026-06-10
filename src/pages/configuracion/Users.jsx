import { useCallback, useEffect, useMemo, useState } from "react";

import EntityListPage from "@/pages/entities/EntityListPage";
import { getEntitySectionByKey } from "@/config/entitySections";
import { listUsers } from "@/lib/auth-service";
import {
  mapAuthUserToEntityRow,
  useEntityActionHandlers,
} from "@/lib/entityActionHandlers.jsx";
import { getEntityStatsCards } from "@/lib/entityStatsProviders";
import { buildEntitySectionFromRows } from "@/lib/entity-table-inference";

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
  const usersConfig = getEntitySectionByKey("configuracion-users");

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    console.log("[Users] fetchUsers ejecutado");
    setLoading(true);
    setError("");

    try {
const data = await listUsers();

console.log("[Users] respuesta /api/users:", data);

const users = extractUsers(data);

console.log("[Users] usuarios extraídos:", users);

const mappedRows = users.map(mapAuthUserToEntityRow);

console.log("[Users] rows mapeadas:", mappedRows);

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

  const statsCards = useMemo(
    () => getEntityStatsCards("users", rows),
    [rows]
  );

  const section = useMemo(
    () =>
      buildEntitySectionFromRows(
        {
          ...usersConfig,
          dataSource: "authUsers",
          actionsKey: "users",
          statsKey: "users",
          rows,
          loading,
          error,
          onRefresh: fetchUsers,
          rowActions: actionHandlers.rowActions,
          statsCards,
          emptyMessage: "No hay usuarios para mostrar.",
        },
        rows
      ),
    [
      usersConfig,
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