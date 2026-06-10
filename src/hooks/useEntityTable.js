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
  if (Array.isArray(data.rows)) return data.rows;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.users)) return data.users;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

async function fetchRowsForConfig(config) {
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
  const [rows, setRows] = useState(config.rows || []);
  const [loading, setLoading] = useState(Boolean((config.endpoint || config.dataSource) && !config.rows));
  const [error, setError] = useState("");

  const fetchRows = useCallback(async () => {
    setLoading(Boolean(config.endpoint || config.dataSource));
    setError("");

    try {
      const nextRows = await fetchRowsForConfig(config);
      setRows(nextRows);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const actionHandlers = useEntityActionHandlers(config.actionsKey, {
    rows,
    setRows,
    setError,
    refresh: fetchRows,
    config,
  });

  const statsCards = useMemo(
    () => config.statsCards || getEntityStatsCards(config.statsKey, rows),
    [config.statsCards, config.statsKey, rows]
  );

  const section = useMemo(
    () =>
      buildEntitySectionFromRows(
        {
          ...config,
          loading,
          error,
          onRefresh: fetchRows,
          rowActions: actionHandlers.rowActions,
          statsCards,
        },
        rows
      ),
    [actionHandlers.rowActions, config, error, fetchRows, loading, rows, statsCards]
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
