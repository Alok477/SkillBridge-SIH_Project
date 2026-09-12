import { apiRequest } from './api';

export const institutionService = {
  getProfile: () => apiRequest('/api/profile'),
  getAnalytics: () => apiRequest('/api/institution/analytics'),
  getStudents: () => apiRequest('/api/institution/students'),
};
