import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  service: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  rawAmount: {
    type: Number,
    default: 0
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Refunded', 'Failed'],
    default: 'Paid'
  },
  method: {
    type: String,
    enum: ['Visa', 'MasterCard', 'PayPal', 'Apple Pay', 'Bank Transfer', 'Credit Card'],
    default: 'Credit Card'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
