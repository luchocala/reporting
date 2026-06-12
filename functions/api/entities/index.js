// functions/api/entities/index.js

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const allowedTables = {
  users: "users",
  monedas: "monedas",
  ordenes_facturacion: "ordenes_facturacion",
  ordenes_facturacion_estados: "ordenes_facturacion_estados",
  ordenes_facturacion_tipos_comprobantes: "ordenes_facturacion_tipos_comprobantes",
  razones_sociales: "razones_sociales",
};

function getAllowedTable(request) {
  const url = new URL(request.url);
  const tableKey = url.searchParams.get("table");

  if (!tableKey || !allowedTables[tableKey]) {
    return {
      error: jsonResponse(
        {
          success: false,
          error: "Tabla no permitida o no especificada.",
        },
        400
      ),
    };
  }

  return {
    tableKey,
    tableName: allowedTables[tableKey],
  };
}

function getIdFromRequest(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return {
      error: jsonResponse(
        {
          success: false,
          error: "ID no especificado.",
        },
        400
      ),
    };
  }

  return { id };
}

function sanitizeEntries(body) {
  return Object.entries(body || {}).filter(
    ([key, value]) =>
      key &&
      value !== undefined &&
      key !== "id" &&
      key !== "rowid" &&
      key !== "acciones" &&
      key !== "actions" &&
      key !== "_select" &&
      key !== "select" &&
      key !== "_checkbox" &&
      key !== "checkbox"
  );
}

function quoteIdentifier(identifier) {
  return `"${String(identifier).replace(/"/g, '""')}"`;
}

export async function onRequestGet({ request, env }) {
  try {
    if (!env.DB) {
      return jsonResponse({ error: "D1 binding DB no configurado" }, 500);
    }

    const resolvedTable = getAllowedTable(request);

    if (resolvedTable.error) {
      return resolvedTable.error;
    }

    const { tableName } = resolvedTable;

    const { results } = await env.DB
      .prepare(`SELECT * FROM ${quoteIdentifier(tableName)}`)
      .all();

    return jsonResponse({
      success: true,
      table: tableName,
      rows: results || [],
    });
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        error: error.message || "No se pudieron obtener los registros.",
      },
      500
    );
  }
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.DB) {
      return jsonResponse({ error: "D1 binding DB no configurado" }, 500);
    }

    const resolvedTable = getAllowedTable(request);

    if (resolvedTable.error) {
      return resolvedTable.error;
    }

    const body = await request.json().catch(() => ({}));
    const entries = sanitizeEntries(body).filter(([, value]) => value !== null);

    if (entries.length === 0) {
      return jsonResponse(
        {
          success: false,
          error: "No hay campos para insertar.",
        },
        400
      );
    }

    const { tableName } = resolvedTable;
    const columns = entries.map(([key]) => key);
    const placeholders = columns.map(() => "?").join(", ");
    const values = entries.map(([, value]) => value);

    const statement = `
      INSERT INTO ${quoteIdentifier(tableName)} (${columns.map(quoteIdentifier).join(", ")})
      VALUES (${placeholders})
    `;

    const result = await env.DB.prepare(statement).bind(...values).run();

    return jsonResponse({
      success: true,
      table: tableName,
      result,
    });
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        error: error.message || "No se pudo crear el registro.",
      },
      500
    );
  }
}

export async function onRequestPatch({ request, env }) {
  try {
    if (!env.DB) {
      return jsonResponse({ error: "D1 binding DB no configurado" }, 500);
    }

    const resolvedTable = getAllowedTable(request);

    if (resolvedTable.error) {
      return resolvedTable.error;
    }

    const resolvedId = getIdFromRequest(request);

    if (resolvedId.error) {
      return resolvedId.error;
    }

    const body = await request.json().catch(() => ({}));
    const entries = sanitizeEntries(body);

    if (entries.length === 0) {
      return jsonResponse(
        {
          success: false,
          error: "No hay campos para actualizar.",
        },
        400
      );
    }

    const { tableName } = resolvedTable;
    const { id } = resolvedId;

    const setClause = entries
      .map(([key]) => `${quoteIdentifier(key)} = ?`)
      .join(", ");

    const values = entries.map(([, value]) => value);

    const statement = `
      UPDATE ${quoteIdentifier(tableName)}
      SET ${setClause}
      WHERE ${quoteIdentifier("id")} = ?
    `;

    const result = await env.DB.prepare(statement).bind(...values, id).run();

    return jsonResponse({
      success: true,
      table: tableName,
      id,
      result,
    });
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        error: error.message || "No se pudo actualizar el registro.",
      },
      500
    );
  }
}

export async function onRequestDelete({ request, env }) {
  try {
    if (!env.DB) {
      return jsonResponse({ error: "D1 binding DB no configurado" }, 500);
    }

    const resolvedTable = getAllowedTable(request);

    if (resolvedTable.error) {
      return resolvedTable.error;
    }

    const resolvedId = getIdFromRequest(request);

    if (resolvedId.error) {
      return resolvedId.error;
    }

    const { tableName } = resolvedTable;
    const { id } = resolvedId;

    const statement = `
      DELETE FROM ${quoteIdentifier(tableName)}
      WHERE ${quoteIdentifier("id")} = ?
    `;

    const result = await env.DB.prepare(statement).bind(id).run();

    return jsonResponse({
      success: true,
      table: tableName,
      id,
      result,
    });
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        error: error.message || "No se pudo eliminar el registro.",
      },
      500
    );
  }
}