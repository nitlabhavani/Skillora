# 🌟 Skillora — Modern Freelance Marketplace

Skillora is a full-stack freelance service marketplace connecting businesses with top-tier verified professionals in Web Development, UI/UX Design, Growth Marketing, AI & Data Science, and Cybersecurity.

---

## 🚀 Technology Stack

- **Frontend**: React 19, Vite, React Router v7, Axios, Glassmorphic CSS
- **Backend**: Node.js, Express.js (ES Modules), JWT Authentication, bcryptjs, CORS
- **Database**: MongoDB with Mongoose ODM (includes automated seeding & fallback resilience)

---

## 📁 Repository Architecture

```text
Skillora/
├── backend/
│   ├── config/             # MongoDB database connection
│   ├── controllers/        # REST API controllers (Auth, Services, Bookings, Reviews, Payments, Admin)
│   ├── middleware/         # JWT authorization & role verification
│   ├── models/             # Mongoose schemas (User, Service, Booking, Payment, Review)
│   ├── routes/             # Express API routes
│   ├── seed/               # Initial data & database seeder
│   ├── .env.example        # Backend environment template
│   ├── package.json
│   └── server.js           # Express API server entrypoint
│
└── frontend/
    ├── public/             # Static assets, videos, and illustrations
    ├── src/
    │   ├── Pages/          # All UI Pages (Home, About, Services, Profile, Booking, Dashboard, etc.)
    │   ├── components/     # Reusable components (ScrollToTop, ProtectedRoute)
    │   ├── services/       # Centralized Axios API service layer
    │   ├── App.jsx         # App router configuration
    │   └── main.jsx
    ├── .env.example        # Frontend environment template
    ├── package.json
    └── vite.config.js      # Vite build configuration
```

---

## ⚡ Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local MongoDB or MongoDB Atlas URI)

### 2. Backend Setup
```bash
cd backend
npm install

# Configure environment
cp .env.example .env

# (Optional) Seed the database with demo records
npm run seed

# Start backend server
npm start   # or 'npm run dev' for development
```
*Backend runs on `http://localhost:5000`.*

### 3. Frontend Setup
```bash
cd frontend
npm install

# Configure environment
cp .env.example .env

# Start frontend development server
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@skillora.com` | `password123` |
| **Customer** | `customer@skillora.com` | `password123` |
| **Freelancer** | `freelancer@skillora.com` | `password123` |

---

## 🛡️ Key Features

- **Role-Based Access Control**: Secure login & registration for Admins, Customers, and Freelancers.
- **Protected Service & Booking Flow**: Dynamic user profile authentication required before booking services.
- **Provider & Admin Hub**: Comprehensive dashboards for viewing client bookings, CSV exports, revenue metrics, and transaction logs.
- **Responsive & Modern Design**: Dark glassmorphic cyber aesthetic with responsive layout.

---

## 📄 License
MIT License © 2026 Skillora. All rights reserved.
