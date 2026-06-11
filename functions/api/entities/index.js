// functions/api/entities/index.js

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const allowedTables = {
  users: "users",

  // Futuras tablas reales
  personas: "personas",
  razones_sociales: "razones_sociales",
  cbus: "cbus",
  cuentas: "cuentas",
  colaboradores: "colaboradores",
  proyectos: "proyectos",
  recurrentes: "recurrentes",
  facturacion: "facturacion",
  tiempo: "tiempo",
  agenda: "agenda",
  activos: "activos",
  dominios: "dominios",
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
      .prepare(`SELECT * FROM ${tableName}`)
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
    const entries = Object.entries(body).filter(
      ([key, value]) =>
        key &&
        value !== undefined &&
        value !== null &&
        key !== "id" &&
        key !== "rowid" &&
        key !== "acciones"
    );

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
      INSERT INTO ${tableName} (${columns.join(", ")})
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