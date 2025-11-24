export const API_BASE = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');

export function buildUrl(path) {
  if (!path) return API_BASE || path;
  if (/^https?:\/\//i.test(path)) return path;
  if (!API_BASE) return path; // keep relative URL in development when API not set
  return API_BASE + (path.startsWith('/') ? path : '/' + path);
}

export function apiFetch(path, options) {
  return fetch(buildUrl(path), options);
}

export default { API_BASE, buildUrl, apiFetch };
