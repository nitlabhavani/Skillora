import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import Payment from '../models/Payment.js';
import { initialServices, initialBookings, initialPayments, initialReviews } from './mockData.js';

dotenv.config();

const seedData = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skillora';
  
  try {
    await mongoose.connect(uri);
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear existing collections
    await User.deleteMany({});
    await Service.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});
    await Payment.deleteMany({});

    // Seed Demo Users
    const users = [
      { name: 'Admin User', email: 'admin@skillora.com', password: 'password123', role: 'Admin' },
      { name: 'John Doe', email: 'customer@skillora.com', password: 'password123', role: 'Customer' },
      { name: 'Alex Rivera', email: 'freelancer@skillora.com', password: 'password123', role: 'Freelancer' }
    ];
    for (const u of users) {
      await User.create(u);
    }
    console.log('✅ Demo users seeded');

    // Seed Services
    await Service.insertMany(initialServices);
    console.log('✅ Services & Providers seeded');

    // Seed Bookings
    await Booking.insertMany(initialBookings);
    console.log('✅ Bookings seeded');

    // Seed Payments
    await Payment.insertMany(initialPayments);
    console.log('✅ Payments seeded');

    // Seed Reviews
    const allReviews = [];
    Object.keys(initialReviews).forEach(key => {
      allReviews.push(...initialReviews[key]);
    });
    await Review.insertMany(allReviews);
    console.log('✅ Reviews seeded');

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();
