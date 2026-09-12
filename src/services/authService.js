import { API_BASE } from './apiConfig';

const AUTH_KEY = 'skillbridge_auth';

const saveSession = (session) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  return session;
};

export const getAuthToken = () => {
  try {
    const session = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
    return session?.token || null;
  } catch {
    return null;
  }
};

export const authHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.detail || 'Request failed');
    error.status = response.status;
    error.isNotFound = response.status === 404;
    throw error;
  }
  return data;
};

export const authService = {
  login: async (email, password, role) => {
    const session = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
    return saveSession(session);
  },

  signup: async (email, password, role, additionalData = {}) => {
    const session = await request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, role, name: additionalData?.name || '' }),
    });
    return saveSession(session);
  },

  restore: async () => {
    const token = getAuthToken();
    if (!token) return null;
    try {
      const data = await request('/auth/me');
      const current = authService.getCurrentSession();
      const session = { ...current, user: data.user };
      return saveSession(session);
    } catch {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
  },

  logout: async () => {
    try {
      await request('/auth/logout', { method: 'POST' });
    } catch {
      // Local token removal is the actual logout mechanism for stateless JWT auth.
    }
    localStorage.removeItem(AUTH_KEY);
    return true;
  },

  getCurrentSession: () => {
    try {
      const data = localStorage.getItem(AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
  },
};
