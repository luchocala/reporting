import { extractRows, listEntityRows } from "@/lib/entity-service";
import { mapEntityRows } from "@/lib/entity-mappers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { buildEntitySectionFromRows } from "@/lib/entity-table-inference";
import {
  mapAuthUserToEntityRow,
  useEntityActionHandlers,
} from "@/lib/entityActionHandlers.jsx";
import { getEntityStatsCards } from "@/lib/entityStatsProviders";
import { listUsers } from "@/lib/auth-service";

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || `Error HTTP ${response.status}`);
  }

  return data;
}

function hasRemoteDataSource(config) {
  return Boolean(config?.endpoint || config?.dataSource || config?.tableName);
}

async function fetchRowsForConfig(config) {
  console.log("[fetchRowsForConfig] config:", config);

  if (!config) return [];

if (config.dataSource === "authUsers") {
  const data = await listUsers();
  const users = extractRows(data);
  return mapEntityRows(users, "authUsers");
}

if (config.tableName) {
  const rows = await listEntityRows(config.tableName);
  return mapEntityRows(rows, config.mapperKey);
}

  if (config.endpoint) {
    const data = await requestJson(config.endpoint, { method: "GET" });
    return extractRows(data);
  }

  return config.rows || [];
}

const missingSectionConfig = {
  key: "missing-section",
  title: "Sección no encontrada",
  subtitle: "No se encontró la configuración de esta sección.",
  columns: [],
  rows: [],
  primaryFilters: [],
  badgeStyles: {},
};

export function useEntityTable(config) {
  const safeConfig = config || missingSectionConfig;
  const remoteDataSource = hasRemoteDataSource(safeConfig);

 console.log("[useEntityTable] config recibida:", safeConfig);
  console.log("[useEntityTable] remoteDataSource:", remoteDataSource);

  const [rows, setRows] = useState(() =>
    remoteDataSource ? [] : safeConfig.rows || []
  );
  const [loading, setLoading] = useState(remoteDataSource);
  const [error, setError] = useState("");

  const fetchRows = useCallback(async () => {
    const shouldLoadRemotely = hasRemoteDataSource(safeConfig);

    if (!shouldLoadRemotely) {
      setRows(safeConfig.rows || []);
      setLoading(false);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const nextRows = await fetchRowsForConfig(safeConfig);
      
      setRows(nextRows);
    } catch (err) {
      setRows([]);
      setError(err.message || "No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  }, [
    safeConfig.key,
    safeConfig.endpoint,
    safeConfig.dataSource,
    safeConfig.rows,
  ]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const actionHandlers = useEntityActionHandlers(safeConfig.actionsKey, {
    rows,
    setRows,
    setError,
    refresh: fetchRows,
    config: safeConfig,
  });

  const statsCards = useMemo(
    () => safeConfig.statsCards || getEntityStatsCards(safeConfig.statsKey, rows),
    [safeConfig.statsCards, safeConfig.statsKey, rows]
  );

  const section = useMemo(
    () =>
      buildEntitySectionFromRows(
        {
          ...safeConfig,
          rows,
          loading,
          error,
          onRefresh: fetchRows,
          rowActions: actionHandlers.rowActions,
          statsCards,
        },
        rows
      ),
    [
      safeConfig,
      rows,
      loading,
      error,
      fetchRows,
      actionHandlers.rowActions,
      statsCards,
    ]
  );

  return {
    section,
    rows,
    setRows,
    loading,
    error,
    setError,
    refresh: fetchRows,
    extraContent: actionHandlers.extraContent,
  };
}