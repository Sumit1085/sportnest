# SportNest 🏅

SportNest is a premium, state-of-the-art full-stack Sports Facility Booking Platform designed for modern athletes and sports enthusiasts. Built using the MERN stack (Next.js, Express, MongoDB) and integrated with Better Auth for secure, seamless session management, SportNest offers a frictionless booking experience from court search to checkout.

## 🔗 Live Application URL
* **Live Deployment**: [https://sportnest-booking.vercel.app](https://sportnest-booking.vercel.app) *(Temporary Demo Link)*
* **Client Local Dev**: [http://localhost:3000](http://localhost:3000)
* **Server Local Dev**: [http://localhost:8000](http://localhost:8000)

---

## 🎯 Purpose
The purpose of **SportNest** is to eliminate the complexity of sports facility reservations. Whether you're booking a late-night football turf, a premium tennis court, or high-capacity badminton courts, SportNest provides:
1. Instant visibility into facility availability and pricing.
2. Dynamic session management and owner/manager administrative panels.
3. Fully secure user registration, email authentication, and social sign-in.

---

## ✨ Features

### 🌟 Core Capabilities
* **Interactive Facility Explorer**: Browse facilities with dynamic search, real-time category filtering (Badminton, Football, Tennis, Swimming, etc.), and price sorting (low-to-high, high-to-high).
* **Frictionless Court Reservations**: Interactive booking module that automatically computes hourly pricing, validates selected slots, and processes bookings under the authenticated user.
* **Premium Client Dashboard**:
  * **My Bookings**: View current reservation statuses (pending, approved, completed, cancelled) and cancel bookings with dynamic UI state updates.
  * **Add Facility**: Beautiful multi-step styling for owners to create and list new sports venues.
  * **Manage Facilities**: An intuitive console for facility owners to edit facility details (price, capacity, type, thumbnail) via pop-up modals or permanently remove them with confirmation safety nets.

### 🛡️ Security & Experience
* **Better Auth Session Persistence**: Prevents annoying route redirects on page reload by utilizing react state-guided loading spinners.
* **Rigorous Password Validation**: Enforces strong authentication policies (minimum 6 characters, at least 1 uppercase letter, and at least 1 lowercase letter) with direct client notification responses.
* **Modern Design System**: Sleek glassmorphic details, Outfit typography from Google Fonts, custom load states, and dynamic micro-animations built using `@heroui/react` and Vanilla CSS.

---

## 📦 NPM Packages Used

### 💻 Client-Side (`sportnest`)
* **Framework**: `next@16.2.6` (React 19)
* **UI Components**: `@heroui/react@3.0.5`, `@heroui/styles@3.0.5`
* **Icons**: `react-icons@5.6.0`, `lucide-react@1.16.0`, `@gravity-ui/icons@2.18.0`
* **Authentication**: `better-auth@1.6.11` & `@better-auth/mongo-adapter@1.6.11`
* **Alert Notifications**: `react-hot-toast@2.6.0`
* **Styling**: `tailwindcss@4`

### ⚙️ Server-Side (`SportNest-server`)
* **Runtime Framework**: `express@5.2.1`
* **Database Driver**: `mongodb@7.2.0`
* **Utility Libraries**: `cors@2.8.6`, `dotenv@17.4.2`
* **Development Automation**: `nodemon@3.1.14`

---

## 🛠️ Installation & Setup

### 1. Database Configuration
Ensure a MongoDB cluster is running. Configure environment variables in the client (`.env.local`) and server (`.env`):
```env
MONGODB_URI=your_mongodb_connection_string
```

### 2. Client Installation
```bash
cd sportnest
npm install
npm run dev
```

### 3. Server Installation
```bash
cd SportNest-server
npm install
npm run dev
```

---

*SportNest — Unleash the athlete within, effortlessly.*
