// src/lib/auth-service.js

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
    throw new Error(data.error || data.message || "Ocurrió un error inesperado");
  }

  return data;
}

export async function validateCredentials(username, password) {
  const data = await requestJson("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  return data.user;
}

export async function registerUser({
  username,
  email,
  firstName,
  lastName,
  password,
  timezone,
}) {
  return requestJson("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      firstName,
      lastName,
      password,
      timezone,
    }),
  });
}

export async function listUsers() {
  return requestJson("/api/users", {
    method: "GET",
  });
}

export async function approveUser(userId) {
  return requestJson(`/api/users/${userId}/approve`, {
    method: "POST",
  });
}

export async function rejectUser(userId) {
  return requestJson(`/api/users/${userId}/reject`, {
    method: "POST",
  });
}

export async function deleteUser(userId) {
  return requestJson(`/api/users/${userId}`, {
    method: "DELETE",
  });
}