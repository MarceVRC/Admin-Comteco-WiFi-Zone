const TOKEN_KEY = "token";
const TOKEN_SAVED_AT_KEY = "token_saved_at";
const MAX_SESSION_AGE_MS = 12 * 60 * 60 * 1000;

const parseJwtPayload = (token) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const normalized = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    return JSON.parse(atob(normalized));
  } catch {
    return null;
  }
};

const isSavedSessionTooOld = () => {
  const savedAt = Number(localStorage.getItem(TOKEN_SAVED_AT_KEY));
  if (!savedAt || Number.isNaN(savedAt)) return false;
  return Date.now() - savedAt >= MAX_SESSION_AGE_MS;
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  const payload = parseJwtPayload(token);
  if (payload?.exp && Number.isFinite(payload.exp)) {
    return Date.now() >= payload.exp * 1000;
  }

  return isSavedSessionTooOld();
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_SAVED_AT_KEY);
};

export const saveAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_SAVED_AT_KEY, String(Date.now()));
};

export const getAuthToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  if (isTokenExpired(token)) {
    clearAuth();
    return null;
  }

  return token;
};

export const isAuthenticated = () => Boolean(getAuthToken());

export const redirectToLogin = () => {
  window.location.hash = "#/login";
};
