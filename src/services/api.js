import { getAuthToken } from './authService';
import { API_BASE } from './apiConfig';

export const apiRequest = async (path, options = {}) => {
  const token = getAuthToken();
  const headers = {
    ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(data?.detail || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return data;
};
