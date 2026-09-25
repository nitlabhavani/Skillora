import api from './api';

export const reviewService = {
  // Get reviews for a provider
  getByProvider: async (providerId) => {
    const response = await api.get(`/reviews/${providerId}`);
    return response.data;
  },

  // Submit a review
  create: async (providerId, reviewData) => {
    const response = await api.post(`/reviews/${providerId}`, reviewData);
    return response.data;
  }
};
