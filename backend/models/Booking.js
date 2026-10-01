import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    default: ''
  },
  providerId: {
    type: String,
    default: ''
  },
  providerName: {
    type: String,
    default: ''
  },
  service: {
    type: String,
    required: true
  },
  workImg: {
    type: String,
    default: ''
  },
  deliveryFormat: {
    type: String,
    default: 'ZIP Source Code Package'
  },
  amount: {
    type: String,
    required: true
  },
  rawAmount: {
    type: Number,
    default: 0
  },
  details: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Completed', 'Paid', 'Cancelled'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
