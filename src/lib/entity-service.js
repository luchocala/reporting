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

export function extractRows(data) {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.rows)) return data.rows;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.users)) return data.users;
  if (Array.isArray(data?.data)) return data.data;

  if (Array.isArray(data?.data?.rows)) return data.data.rows;
  if (Array.isArray(data?.data?.items)) return data.data.items;
  if (Array.isArray(data?.data?.users)) return data.data.users;
  if (Array.isArray(data?.result)) return data.result;
  if (Array.isArray(data?.result?.rows)) return data.result.rows;
  if (Array.isArray(data?.result?.items)) return data.result.items;
  if (Array.isArray(data?.payload)) return data.payload;
  if (Array.isArray(data?.payload?.rows)) return data.payload.rows;

  return [];
}

export async function listEntityRows(tableName) {
  const data = await requestJson(
    `/api/entities?table=${encodeURIComponent(tableName)}`,
    { method: "GET" }
  );

  return extractRows(data);
}

export async function createEntityRow(tableName, values) {
  return requestJson(`/api/entities?table=${encodeURIComponent(tableName)}`, {
    method: "POST",
    body: JSON.stringify(values),
  });
}