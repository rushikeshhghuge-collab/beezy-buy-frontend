# Beezy Buy — Frontend

React admin dashboard for the Beezy Buy e-commerce product management system.

## Technology Stack

- React 19 + Vite 8
- Tailwind CSS v4
- React Router DOM v7
- React Hot Toast
- React Icons
- Axios

## Features

- Admin login with JWT
- OTP-based password reset
- Product CRUD (add, edit, delete)
- Search, filter, sort products
- Dashboard with analytics
- Responsive layout
- Toast notifications

## Environment Variables

Create a `.env` file in the frontend root:

```
VITE_API_URL=https://your-backend.railway.app
```

> Leave empty for local dev (Vite proxy handles it automatically)

## Installation

```bash
npm install
npm run dev       # development (http://localhost:5173)
npm run build     # production build
```

## Deployment (Vercel)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import GitHub repo
3. Framework preset: **Vite**
4. Add environment variable: `VITE_API_URL` = your Railway backend URL
5. Deploy

## Live URLs

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.railway.app`

## Screenshots

> Add screenshots of: Login, Dashboard, Product List, Add Product pages

## Default Admin Credentials

```
Email:    admin@beezy.com
Password: Admin@123
```
