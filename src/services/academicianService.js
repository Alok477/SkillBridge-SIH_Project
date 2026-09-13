import { apiRequest } from './api';

export const academicianService = {
  getOverview: async () => apiRequest('/api/academician/overview'),
};
