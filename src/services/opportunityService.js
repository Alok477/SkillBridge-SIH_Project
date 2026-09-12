import { apiRequest } from './api';

export const opportunityService = {
  getAll: () => apiRequest('/api/opportunities'),

  getById: async (id) => {
    const all = await opportunityService.getAll();
    const found = all.find((opp) => String(opp.id) === String(id));
    if (!found) throw new Error('Opportunity not found');
    return found;
  },

  create: (formData) => apiRequest('/api/opportunities', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),

  apply: (opportunityId) => apiRequest('/api/applications', {
    method: 'POST',
    body: JSON.stringify({ opportunity_id: opportunityId }),
  }),

  searchAndFilter: async (query, filters = {}) => {
    let all = await opportunityService.getAll();
    if (query) {
      const q = query.toLowerCase();
      all = all.filter((o) =>
        (o.title && o.title.toLowerCase().includes(q)) ||
        (o.company && o.company.toLowerCase().includes(q)) ||
        (Array.isArray(o.skills) && o.skills.some((s) => s.toLowerCase().includes(q)))
      );
    }
    if (filters.type && filters.type !== 'All') all = all.filter((o) => o.type === filters.type);
    if (filters.location && filters.location !== 'All') {
      const location = filters.location.toLowerCase();
      all = all.filter((o) => o.location?.toLowerCase().includes(location));
    }
    return all;
  },
};
