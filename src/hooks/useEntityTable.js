import { useCallback, useEffect, useMemo, useState } from "react";
import { buildEntitySectionFromRows } from "@/lib/entity-table-inference";

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

export function useEntityTable(config) {
  const [rows, setRows] = useState(config.rows || []);
  const [loading, setLoading] = useState(Boolean(config.endpoint && !config.rows));
  const [error, setError] = useState("");

  const fetchRows = useCallback(async () => {
    if (!config.endpoint) {
      setRows(config.rows || []);
      setError("");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await requestJson(config.endpoint, { method: "GET" });
      setRows(extractRows(data));
    } catch (err) {
      setError(err.message || "No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  }, [config.endpoint, config.rows]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const section = useMemo(
    () =>
      buildEntitySectionFromRows(
        {
          ...config,
          loading,
          error,
          onRefresh: fetchRows,
        },
        rows
      ),
    [config, error, fetchRows, loading, rows]
  );

  return {
    section,
    rows,
    setRows,
    loading,
    error,
    refresh: fetchRows,
  };
}
