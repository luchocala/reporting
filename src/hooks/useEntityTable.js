import { extractRows, listEntityRows } from "@/lib/entity-service";
import { mapEntityRows } from "@/lib/entity-mappers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { buildEntitySectionFromRows } from "@/lib/entity-table-inference";
import { useEntityActionHandlers } from "@/lib/entityActionHandlers.jsx";
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

function getUniqueLookupIds(rows, sourceColumn) {
  return Array.from(
    new Set(
      (rows || [])
        .map((row) => row?.[sourceColumn])
        .filter((value) => value !== null && value !== undefined && value !== "")
        .map(String)
    )
  );
}

async function fetchLookupMapsForConfig(config, rows) {
  const lookups = config?.lookups || {};
  const lookupEntries = Object.entries(lookups);

  if (lookupEntries.length === 0) {
    return {};
  }

  const lookupMaps = {};

  await Promise.all(
    lookupEntries.map(async ([sourceColumn, lookupConfig]) => {
      const targetTable = lookupConfig.targetTable;
      const targetIdColumn = lookupConfig.targetIdColumn || "id";
      const targetDisplayColumn = lookupConfig.targetDisplayColumn;

      if (!targetTable || !targetDisplayColumn) {
        console.warn("[fetchLookupMapsForConfig] lookup incompleto:", {
          sourceColumn,
          lookupConfig,
        });
        return;
      }

      const ids = getUniqueLookupIds(rows, sourceColumn);

      if (ids.length === 0) {
        lookupMaps[sourceColumn] = {};
        return;
      }

      const targetRows = await listEntityRows(targetTable);

      lookupMaps[sourceColumn] = Object.fromEntries(
        (targetRows || [])
          .filter((targetRow) => ids.includes(String(targetRow?.[targetIdColumn])))
          .map((targetRow) => [
            String(targetRow?.[targetIdColumn]),
            targetRow?.[targetDisplayColumn],
          ])
          .filter(([, displayValue]) => displayValue !== null && displayValue !== undefined)
      );
    })
  );

  return lookupMaps;
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
  const [lookupMaps, setLookupMaps] = useState({});
  const [loading, setLoading] = useState(remoteDataSource);
  const [error, setError] = useState("");

  const fetchRows = useCallback(async () => {
    const shouldLoadRemotely = hasRemoteDataSource(safeConfig);

    if (!shouldLoadRemotely) {
      const localRows = safeConfig.rows || [];
      const nextLookupMaps = await fetchLookupMapsForConfig(safeConfig, localRows);

      setRows(localRows);
      setLookupMaps(nextLookupMaps);
      setLoading(false);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const nextRows = await fetchRowsForConfig(safeConfig);
      const nextLookupMaps = await fetchLookupMapsForConfig(safeConfig, nextRows);

      setRows(nextRows);
      setLookupMaps(nextLookupMaps);
    } catch (err) {
      setRows([]);
      setLookupMaps({});
      setError(err.message || "No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  }, [
    safeConfig.key,
    safeConfig.endpoint,
    safeConfig.dataSource,
    safeConfig.tableName,
    safeConfig.mapperKey,
    safeConfig.rows,
    safeConfig.lookups,
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
          lookupMaps,
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
      lookupMaps,
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