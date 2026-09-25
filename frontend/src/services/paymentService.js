import api from './api';

export const paymentService = {
  // Get all payments & statistics
  getAll: async () => {
    const response = await api.get('/payments');
    return response.data;
  },

  // Create payment transaction
  create: async (paymentData) => {
    const response = await api.post('/payments', paymentData);
    return response.data;
  }
};
