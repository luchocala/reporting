// functions/api/auth/login.js

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);

  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.DB) {
      return jsonResponse({ error: 'D1 binding DB no configurado' }, 500);
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return jsonResponse({ error: 'Usuario y contraseña requeridos' }, 400);
    }

    const hashedPassword = await hashPassword(password);

    const user = await env.DB
      .prepare(`
        SELECT
          id,
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
        FROM users
        WHERE username = ?
      `)
      .bind(username)
      .first();

    if (!user) {
      return jsonResponse({ error: 'Credenciales inválidas' }, 401);
    }

    if (user.approved !== 1) {
      return jsonResponse({ error: 'Tu cuenta está pendiente de aprobación' }, 401);
    }

    if (user.password !== hashedPassword) {
      return jsonResponse({ error: 'Credenciales inválidas' }, 401);
    }

    const { password: _password, approved: _approved, ...safeUser } = user;

    return jsonResponse({
      success: true,
      user: {
        ...safeUser,
        theme: safeUser.theme || 'light',
        language: safeUser.language || 'es',
      },
    });
  } catch (error) {
    return jsonResponse({ error: error.message || 'Error interno en login' }, 500);
  }
}