import { apiRequest } from './api';

export const academicianService = {
  getProfile: async () => (await apiRequest('/api/academician/overview')).profile,
  getOpportunities: async () => (await apiRequest('/api/academician/overview')).opportunities,
  getCollaborations: async () => (await apiRequest('/api/academician/overview')).collaborations,
};
