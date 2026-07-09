# 🐝 Beezy Buy - Frontend

A modern React application for managing e-commerce products with authentication and real-time updates. Part of the Beezy Buy Admin Hive management system.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)

## ✨ Features

- **Authentication**
  - Secure login system
  - Forgot password with OTP verification
  - User signup functionality

- **Product Management**
  - Dashboard with product overview
  - Create, Read, Update, Delete products
  - Image upload with preview
  - Search functionality
  - Filter and sort products

- **UI/UX**
  - Responsive design (mobile, tablet, desktop)
  - Beautiful bee-themed branding
  - Toast notifications
  - Real-time feedback

## 🛠️ Tech Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Notifications**: React Hot Toast
- **HTTP Client**: Fetch API

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/beezy-buy-frontend.git
   cd beezy-buy-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Running Locally

```bash
npm run dev
```

App runs on `http://localhost:5173`

## 📤 Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select `/frontend` as root directory

3. **Add Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-backend-url.railway.app/api
   ```

4. **Deploy** - Click Deploy and wait for completion

## 📁 Folder Structure

```
frontend/src/
├── components/      # Reusable components
├── layouts/        # Layout components
├── pages/          # Page components
├── assets/         # Images and files
├── App.jsx         # Main app
└── main.jsx        # Entry point
```

## 📄 License

MIT License - feel free to use this project however you like.
