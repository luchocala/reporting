import { getDb } from "../../_shared/db.js";

const allowedTables = {
  users: "users",

  // futuras tablas reales
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

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}

function getAllowedTable(request) {
  const url = new URL(request.url);
  const tableKey = url.searchParams.get("table");

  if (!tableKey || !allowedTables[tableKey]) {
    return {
      error: json(
        {
          success: false,
          error: "Tabla no permitida o no especificada.",
        },
        { status: 400 }
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
    const resolvedTable = getAllowedTable(request);

    if (resolvedTable.error) {
      return resolvedTable.error;
    }

    const db = getDb(env);
    const { tableName } = resolvedTable;

    const rows = await db.prepare(`SELECT * FROM ${tableName}`).all();

    return json({
      success: true,
      table: tableName,
      rows: rows.results || [],
    });
  } catch (error) {
    return json(
      {
        success: false,
        error: error.message || "No se pudieron obtener los registros.",
      },
      { status: 500 }
    );
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const resolvedTable = getAllowedTable(request);

    if (resolvedTable.error) {
      return resolvedTable.error;
    }

    const body = await request.json().catch(() => ({}));
    const entries = Object.entries(body).filter(
      ([key, value]) =>
        key &&
        value !== undefined &&
        key !== "id" &&
        key !== "acciones"
    );

    if (entries.length === 0) {
      return json(
        {
          success: false,
          error: "No hay campos para insertar.",
        },
        { status: 400 }
      );
    }

    const db = getDb(env);
    const { tableName } = resolvedTable;

    const columns = entries.map(([key]) => key);
    const placeholders = columns.map(() => "?").join(", ");
    const values = entries.map(([, value]) => value);

    const statement = `
      INSERT INTO ${tableName} (${columns.join(", ")})
      VALUES (${placeholders})
    `;

    const result = await db.prepare(statement).bind(...values).run();

    return json({
      success: true,
      table: tableName,
      result,
    });
  } catch (error) {
    return json(
      {
        success: false,
        error: error.message || "No se pudo crear el registro.",
      },
      { status: 500 }
    );
  }
}