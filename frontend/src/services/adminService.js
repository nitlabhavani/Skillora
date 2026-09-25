import api from './api';

export const adminService = {
  // Get admin dashboard stats
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  // Get project ecosystem data
  getProjects: async () => {
    const response = await api.get('/admin/projects');
    return response.data;
  },

  // Get BI report categories
  getReports: async () => {
    const response = await api.get('/admin/reports');
    return response.data;
  }
};
