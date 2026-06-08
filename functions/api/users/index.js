// functions/api/users/index.js

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestGet({ env }) {
  try {
    if (!env.DB) {
      return jsonResponse({ error: "D1 binding DB no configurado" }, 500);
    }

    const { results } = await env.DB
      .prepare(
        `
        SELECT
          id AS id,
          username,
          firstName,
          lastName,
          email,
          timezone,
          approved,
          role,
          theme,
          language
        FROM users
        ORDER BY approved ASC, id DESC
      `
      )
      .all();

    return jsonResponse({
      success: true,
      users: results || [],
    });
  } catch (error) {
    return jsonResponse(
      { error: error.message || "Error interno al listar usuarios" },
      500
    );
  }
}