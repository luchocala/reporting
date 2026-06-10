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

function extractRows(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.rows)) return data.rows;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.users)) return data.users;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

function hasRemoteDataSource(config) {
  return Boolean(config?.endpoint || config?.dataSource);
}

async function fetchRowsForConfig(config) {
  if (!config) return [];

  if (config.dataSource === "authUsers") {
    const data = await listUsers();
    return extractRows(data).map(mapAuthUserToEntityRow);
  }

  if (config.endpoint) {
    const data = await requestJson(config.endpoint, { method: "GET" });
    return extractRows(data);
  }

  return config.rows || [];
}

export function useEntityTable(config) {
  const safeConfig = config || {
    key: "missing-section",
    title: "Sección no encontrada",
    subtitle: "No se encontró la configuración de esta sección.",
    columns: [],
    rows: [],
    primaryFilters: [],
    badgeStyles: {},
  };

  const remoteDataSource = hasRemoteDataSource(safeConfig);

  const [rows, setRows] = useState(() =>
    remoteDataSource ? [] : safeConfig.rows || []
  );
  const [loading, setLoading] = useState(remoteDataSource);
  const [error, setError] = useState("");

  const fetchRows = useCallback(async () => {
    setLoading(remoteDataSource);
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
  }, [remoteDataSource, safeConfig]);

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
    [actionHandlers.rowActions, safeConfig, error, fetchRows, loading, rows, statsCards]
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