import api from './api';

export const serviceService = {
  // Get all services and categories
  getAll: async (search = '') => {
    const params = search ? { search } : {};
    const response = await api.get('/services', { params });
    return response.data;
  },

  // Get provider details by ID
  getById: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  }
};
