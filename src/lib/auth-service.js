// src/lib/auth-service.js

export async function validateCredentials(username, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Error de autenticación');
  }

  if (!data.user) {
    throw new Error('No se recibió información del usuario');
  }

  const user = data.user;

  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    timezone: user.timezone || 'UTC-3',
    role: user.role || 'user',
    theme: user.theme || 'light',
    language: user.language || 'es',
  };
}