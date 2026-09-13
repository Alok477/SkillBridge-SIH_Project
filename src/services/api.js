import { getAuthToken } from './authService';
import { API_BASE } from './apiConfig';

export const apiRequest = async (path, options = {}) => {
  const token = getAuthToken();
  const headers = {
    ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch (error) {
    const networkError = new Error(
      `Unable to reach the SkillBridge API at ${API_BASE}. Start the backend and verify its database configuration.`
    );
    networkError.cause = error;
    networkError.isNetworkError = true;
    throw networkError;
  }
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(data?.detail || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return data;
};
