import api from './api';

export const authService = {
  // Register user, admin, or freelancer
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data?.token) {
      localStorage.setItem('skillora_token', response.data.token);
      localStorage.setItem('skillora_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data?.token) {
      localStorage.setItem('skillora_token', response.data.token);
      localStorage.setItem('skillora_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Get current logged-in user profile
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('skillora_token');
    localStorage.removeItem('skillora_user');
  },

  // Local storage helpers
  getCurrentUser: () => {
    const userStr = localStorage.getItem('skillora_user');
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  getToken: () => localStorage.getItem('skillora_token'),
  isAuthenticated: () => !!localStorage.getItem('skillora_token'),
};
