import Payment from '../models/Payment.js';
import { initialPayments } from '../seed/mockData.js';

let inMemoryPayments = [...initialPayments];

// @desc    Get all payment transactions
// @route   GET /api/payments
// @access  Public
export const getPayments = async (req, res) => {
  try {
    let payments = [];
    try {
      payments = await Payment.find({});
    } catch {
      // Fallback
    }

    if (!payments || payments.length === 0) {
      payments = inMemoryPayments;
    }

    const totalRevenue = payments
      .filter(p => p.status?.toLowerCase() === 'paid')
      .reduce((acc, p) => {
        const val = parseFloat(String(p.amount || '0').replace(/[^0-9.]/g, '')) || 0;
        return acc + val;
      }, 0);

    const pendingAmount = payments
      .filter(p => p.status?.toLowerCase() === 'pending')
      .reduce((acc, p) => {
        const val = parseFloat(String(p.amount || '0').replace(/[^0-9.]/g, '')) || 0;
        return acc + val;
      }, 0);

    return res.status(200).json({
      success: true,
      stats: {
        totalRevenue: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        pending: `$${pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        successfulCount: `${payments.filter(p => p.status?.toLowerCase() === 'paid').length} Transactions`
      },
      payments
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Process a new payment
// @route   POST /api/payments
// @access  Public
export const createPayment = async (req, res) => {
  try {
    const { user, service, amount, method } = req.body;

    const newPayment = {
      id: "TXN-" + Math.floor(100 + Math.random() * 900),
      user: user || "Customer",
      service: service || "General Service",
      amount: typeof amount === 'number' ? `$${amount.toFixed(2)}` : (amount || "$100.00"),
      rawAmount: typeof amount === 'number' ? amount : parseFloat(String(amount || '0').replace(/[^0-9.]/g, '')),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: "Paid",
      method: method || "Credit Card"
    };

    try {
      const created = await Payment.create(newPayment);
      inMemoryPayments.unshift(created);
      return res.status(201).json({ success: true, payment: created });
    } catch {
      inMemoryPayments.unshift(newPayment);
      return res.status(201).json({ success: true, payment: newPayment });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
