import api from './api';

const STORAGE_KEY = 'skillora_bookings';

const getStoredBookings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStoredBookings = (bookings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch (e) {
    console.warn("Could not save bookings to localStorage", e);
  }
};

export const bookingService = {
  // Get all bookings (with optional filter by search, status, userName, userEmail)
  getAll: async (filters = {}) => {
    let apiBookings = [];
    try {
      const response = await api.get('/bookings', { params: filters });
      if (response.data?.bookings) {
        apiBookings = response.data.bookings;
      }
    } catch (err) {
      console.warn("API getAll bookings failed, relying on local storage:", err.message);
    }

    const localBookings = getStoredBookings();
    
    // Merge and deduplicate by id or bookingId
    const map = new Map();
    [...localBookings, ...apiBookings].forEach(item => {
      const key = item.bookingId || item.id;
      if (key && !map.has(key)) {
        map.set(key, item);
      }
    });

    let combined = Array.from(map.values());

    if (filters.userName || filters.userEmail) {
      combined = combined.filter(b => {
        const matchesName = filters.userName && b.userName?.toLowerCase() === filters.userName.toLowerCase();
        const matchesEmail = filters.userEmail && b.userEmail?.toLowerCase() === filters.userEmail.toLowerCase();
        return matchesName || matchesEmail;
      });
    }

    return {
      success: true,
      count: combined.length,
      bookings: combined
    };
  },

  // Get user-specific bookings
  getUserBookings: async (user) => {
    if (!user) return { success: true, bookings: [] };

    const filters = {};
    if (user.name) filters.userName = user.name;
    if (user.email) filters.userEmail = user.email;

    return await bookingService.getAll(filters);
  },

  // Create new booking
  create: async (bookingData) => {
    const newId = bookingData.id || bookingData.bookingId || ('BK-' + Date.now().toString().slice(-6));
    const fullBooking = {
      id: newId,
      bookingId: newId,
      userName: bookingData.userName || 'Customer',
      userEmail: bookingData.userEmail || '',
      userId: bookingData.userId || '',
      providerId: String(bookingData.providerId || ''),
      providerName: bookingData.providerName || '',
      service: bookingData.service || 'Professional Service',
      workImg: bookingData.workImg || '/web.jpeg',
      amount: bookingData.amount || '$100.00',
      details: bookingData.details || '',
      deliveryFormat: bookingData.deliveryFormat || 'ZIP Source Code Package',
      status: bookingData.status || 'Active',
      date: bookingData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      createdAt: new Date().toISOString()
    };

    // 1. Save to localStorage immediately
    const existing = getStoredBookings();
    const updated = [fullBooking, ...existing.filter(b => (b.id !== newId && b.bookingId !== newId))];
    saveStoredBookings(updated);

    // 2. Dispatch event so any listening components know immediately
    window.dispatchEvent(new CustomEvent('skillora_booking_created', { detail: fullBooking }));

    // 3. Post to backend API
    try {
      const response = await api.post('/bookings', fullBooking);
      return response.data || { success: true, booking: fullBooking };
    } catch (err) {
      console.warn("Backend API unavailable, stored booking locally:", err.message);
      return { success: true, booking: fullBooking };
    }
  },

  // Update existing booking
  update: async (id, bookingData) => {
    // Update local storage
    const existing = getStoredBookings();
    const updated = existing.map(b => (b.id === id || b.bookingId === id) ? { ...b, ...bookingData } : b);
    saveStoredBookings(updated);

    try {
      const response = await api.put(`/bookings/${id}`, bookingData);
      return response.data;
    } catch (err) {
      return { success: true, booking: { id, ...bookingData } };
    }
  },

  // Delete booking
  delete: async (id) => {
    const existing = getStoredBookings();
    const updated = existing.filter(b => b.id !== id && b.bookingId !== id);
    saveStoredBookings(updated);

    try {
      const response = await api.delete(`/bookings/${id}`);
      return response.data;
    } catch (err) {
      return { success: true, message: 'Deleted locally' };
    }
  },

  // Get provider client list
  getProviderClients: async (providerId) => {
    try {
      const response = await api.get(`/bookings/provider/${providerId}`);
      return response.data;
    } catch (err) {
      return { success: true, clients: [] };
    }
  }
};
