// functions/api/users/delete.js

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function getUserIdFromRequest(request) {
  const body = await request.json().catch(() => ({}));
  const userId = Number(body.userId);

  if (!Number.isInteger(userId) || userId <= 0) {
    return null;
  }

  return userId;
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.DB) {
      return jsonResponse({ error: "D1 binding DB no configurado" }, 500);
    }

    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return jsonResponse({ error: "ID de usuario inválido" }, 400);
    }

    const existingUser = await env.DB
      .prepare(
        `
        SELECT id
        FROM users
        WHERE id = ?
        LIMIT 1
      `
      )
      .bind(userId)
      .first();

    if (!existingUser) {
      return jsonResponse({ error: "Usuario no encontrado" }, 404);
    }

    await env.DB
      .prepare(
        `
        DELETE FROM users
        WHERE id = ?
      `
      )
      .bind(userId)
      .run();

    return jsonResponse({
      success: true,
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    return jsonResponse(
      { error: error.message || "Error interno al eliminar usuario" },
      500
    );
  }
}