// functions/api/users/[id]/approve.js

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost({ params, env }) {
  try {
    if (!env.DB) {
      return jsonResponse({ error: "D1 binding DB no configurado" }, 500);
    }

    const userId = Number(params.id);

    if (!Number.isInteger(userId) || userId <= 0) {
      return jsonResponse({ error: "ID de usuario inválido" }, 400);
    }

    const existingUser = await env.DB
      .prepare(
        `
        SELECT id, approved
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

    if (existingUser.approved === 1) {
      return jsonResponse({
        success: true,
        message: "El usuario ya estaba aprobado",
      });
    }

    await env.DB
      .prepare(
        `
        UPDATE users
        SET approved = 1
        WHERE id = ?
      `
      )
      .bind(userId)
      .run();

    return jsonResponse({
      success: true,
      message: "Usuario aprobado correctamente",
    });
  } catch (error) {
    return jsonResponse(
      { error: error.message || "Error interno al aprobar usuario" },
      500
    );
  }
}