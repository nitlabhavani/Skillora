import Booking from '../models/Booking.js';
import { initialBookings, providerClients } from '../seed/mockData.js';

let inMemoryBookings = [...initialBookings];

// @desc    Get all bookings or filter by user/provider
// @route   GET /api/bookings
// @access  Public (or Private)
export const getBookings = async (req, res) => {
  try {
    let bookings = [];
    try {
      bookings = await Booking.find({});
    } catch {
      // Fallback to in-memory
    }

    if (!bookings || bookings.length === 0) {
      bookings = inMemoryBookings;
    }

    const { search, status, userName } = req.query;
    let filtered = [...bookings];

    if (search) {
      filtered = filtered.filter(b =>
        b.userName?.toLowerCase().includes(search.toLowerCase()) ||
        b.service?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status) {
      filtered = filtered.filter(b => b.status?.toLowerCase() === status.toLowerCase());
    }
    if (userName) {
      filtered = filtered.filter(b => b.userName?.toLowerCase() === userName.toLowerCase());
    }

    // Calculate total revenue
    const totalRevenue = filtered.reduce((acc, curr) => {
      const val = parseFloat(String(curr.amount || '0').replace(/[^0-9.]/g, '')) || 0;
      return acc + val;
    }, 0);

    return res.status(200).json({
      success: true,
      count: filtered.length,
      totalRevenue: totalRevenue.toFixed(2),
      bookings: filtered
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new booking / order
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
  try {
    const { userName, userEmail, providerId, providerName, service, amount, details, status } = req.body;

    const newId = 'u' + (Date.now() % 10000);
    const newBookingObj = {
      id: newId,
      bookingId: newId,
      userName: userName || 'Customer',
      userEmail: userEmail || '',
      providerId: String(providerId || ''),
      providerName: providerName || '',
      service: service || 'Custom Service',
      amount: typeof amount === 'number' ? `$${amount.toFixed(2)}` : (amount || '$100.00'),
      rawAmount: typeof amount === 'number' ? amount : parseFloat(String(amount || '0').replace(/[^0-9.]/g, '')),
      details: details || '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: status || 'Active'
    };

    try {
      const created = await Booking.create(newBookingObj);
      inMemoryBookings.unshift(created);
      return res.status(201).json({ success: true, booking: created });
    } catch {
      inMemoryBookings.unshift(newBookingObj);
      return res.status(201).json({ success: true, booking: newBookingObj });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking details
// @route   PUT /api/bookings/:id
// @access  Public
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, service, status, amount, details } = req.body;

    try {
      const updated = await Booking.findOneAndUpdate(
        { $or: [{ bookingId: id }, { id: id }] },
        { $set: { userName, service, status, amount, details } },
        { new: true }
      );
      if (updated) {
        return res.status(200).json({ success: true, booking: updated });
      }
    } catch {
      // Fallback to in-memory
    }

    const idx = inMemoryBookings.findIndex(b => b.id === id || b.bookingId === id);
    if (idx !== -1) {
      inMemoryBookings[idx] = { ...inMemoryBookings[idx], ...req.body };
      return res.status(200).json({ success: true, booking: inMemoryBookings[idx] });
    }

    return res.status(404).json({ success: false, message: 'Booking not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Public
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await Booking.findOneAndDelete({ $or: [{ bookingId: id }, { id: id }] });
    } catch {
      // Fallback
    }

    inMemoryBookings = inMemoryBookings.filter(b => b.id !== id && b.bookingId !== id);

    return res.status(200).json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get provider specific clients
// @route   GET /api/bookings/provider/:providerId
// @access  Public
export const getProviderClients = async (req, res) => {
  try {
    const { providerId } = req.params;
    const clients = providerClients[providerId] || [
      { id: "c_" + Date.now(), name: "Client for Provider " + providerId, email: "client@example.com", date: "Feb 20", status: "Paid" }
    ];

    return res.status(200).json({
      success: true,
      providerId,
      clients
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
