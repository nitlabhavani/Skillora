import api from './api';

export const bookingService = {
  // Get all bookings (with optional filter by search, status, userName)
  getAll: async (filters = {}) => {
    const response = await api.get('/bookings', { params: filters });
    return response.data;
  },

  // Create new booking
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  // Update existing booking
  update: async (id, bookingData) => {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  },

  // Delete booking
  delete: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },

  // Get provider client list
  getProviderClients: async (providerId) => {
    const response = await api.get(`/bookings/provider/${providerId}`);
    return response.data;
  }
};
