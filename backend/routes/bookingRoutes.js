import express from 'express';
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getProviderClients
} from '../controllers/bookingController.js';

const router = express.Router();

router.get('/', getBookings);
router.post('/', createBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.get('/provider/:providerId', getProviderClients);

export default router;
