// functions/api/auth/register.js

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.DB) {
      return jsonResponse({ error: "D1 binding DB no configurado" }, 500);
    }

    const body = await request.json();

    const username = normalizeString(body.username).toLowerCase();
    const email = normalizeString(body.email).toLowerCase();
    const firstName = normalizeString(body.firstName);
    const lastName = normalizeString(body.lastName);
    const password = normalizeString(body.password);
    const timezone =
      normalizeString(body.timezone) || "America/Argentina/Buenos_Aires";

    if (!username || !email || !password) {
      return jsonResponse(
        { error: "Usuario, email y contraseña son requeridos" },
        400
      );
    }

    if (password.length < 6) {
      return jsonResponse(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        400
      );
    }

    const existingUser = await env.DB
      .prepare(
        `
        SELECT id
        FROM users
        WHERE username = ? OR email = ?
        LIMIT 1
      `
      )
      .bind(username, email)
      .first();

    if (existingUser) {
      return jsonResponse(
        { error: "Ya existe un usuario registrado con ese usuario o email" },
        409
      );
    }

    const hashedPassword = await hashPassword(password);

    const result = await env.DB
      .prepare(
        `
        INSERT INTO users (
          username,
          firstName,
          lastName,
          email,
          timezone,
          password,
          approved,
          role,
          theme,
          language
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
      )
      .bind(
        username,
        firstName || null,
        lastName || null,
        email,
        timezone,
        hashedPassword,
        0,
        "user",
        "light",
        "es"
      )
      .run();

    return jsonResponse(
      {
        success: true,
        pendingApproval: true,
        userId: result.meta?.last_row_id,
        message:
          "Registro creado correctamente. Tu cuenta queda pendiente de aprobación.",
      },
      201
    );
  } catch (error) {
    return jsonResponse(
      { error: error.message || "Error interno en registro" },
      500
    );
  }
}