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
    const error = new Error(
      data.error || data.message || `Error HTTP ${response.status}`
    );
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

function normalizeUserId(userId) {
  const normalized = Number(userId);

  if (!Number.isInteger(normalized) || normalized <= 0) {
    throw new Error(`ID de usuario inválido en frontend: ${String(userId)}`);
  }

  return normalized;
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
  const normalizedUserId = normalizeUserId(userId);

  return requestJson("/api/users/approve", {
    method: "POST",
    body: JSON.stringify({ userId: normalizedUserId }),
  });
}

export async function suspendUser(userId) {
  const normalizedUserId = normalizeUserId(userId);

  return requestJson("/api/users/suspend", {
    method: "POST",
    body: JSON.stringify({ userId: normalizedUserId }),
  });
}

export async function deleteUser(userId) {
  const normalizedUserId = normalizeUserId(userId);

  return requestJson("/api/users/delete", {
    method: "POST",
    body: JSON.stringify({ userId: normalizedUserId }),
  });
}