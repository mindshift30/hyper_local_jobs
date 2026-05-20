# ⚡ QuickGig: Hyperlocal Job Marketplace

QuickGig is a high-fidelity, mobile-first hyperlocal job marketplace designed to connect blue-collar workers and daily wagers with nearby employers in real-time. Built for the modern workforce, it focuses on speed, trust, and geographic proximity.

## ✨ Features

- **📍 Real-Time Discovery**: Interactive job discovery via a custom **Leaflet + OpenStreetMap** implementation focused on Chennai.
- **💬 Seamless Communication**: Built-in messaging system for instant seeker-employer coordination.
- **🗺️ Intelligent Geocoding**: Powered by **Nominatim (OSM)** for automated location detection and geographic analytics.
- **📱 Mobile-First Experience**: Premium, glassmorphic UI optimized for the best experience on any mobile device.
- **🏢 Unified Dashboards**: Custom interfaces for Seekers, Employers, and Administrators.
- **⚡ Performance First**: Hardcoded coordinates for common Chennai areas to ensure sub-second map loading.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Maps & Geolocation**: Leaflet, OpenStreetMap, Nominatim API
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Modern CSS Variables & Responsive Design

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mindshift30/hyper_local_jobs.git
cd hyper_local_jobs
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Environment Setup
Copy the example environment file and fill in your credentials:
```bash
cp .env.example .env.local
```
*Note: You will need Supabase or a similar Postgres-compatible database URL.*

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/src/components/screens`: Core application screens (Seeker, Employer, Admin).
- `/src/components/maps`: Specialized Leaflet map components.
- `/src/services`: Geocoding and external API integration logic.
- `/src/lib/constants`: Hardcoded Chennai geographic data for performance.
- `/src/stores`: Global state management for jobs, auth, and UI.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ⚡ by QuickGig Team.
