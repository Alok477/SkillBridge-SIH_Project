import { apiRequest } from './api';

export const industryService = {
  getProfile: () => apiRequest('/api/profile'),
  getCandidates: () => apiRequest('/api/candidates'),
  updateCandidateStatus: (candidateId, status) => apiRequest(`/api/candidates/${candidateId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
  createOpportunity: (formData) => apiRequest('/api/opportunities', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),
};
