# ClevTech DevHub

A full-stack portfolio and business platform for **ClevTech DevHub** — a software development brand under ClevTech Global Ventures. Built as a real production-style application: React frontend, Express/MongoDB REST API, JWT authentication, and a full admin dashboard for managing content.

---

## Features

- **Public site** — Home, About, Services, Portfolio (filter/search/pagination), project case-study pages, Blog (filter/search/pagination), Contact form, Quote request form, legal pages.
- **Admin dashboard** — protected by JWT auth, with CRUD management for Projects, Blog Posts, Services, Testimonials, Contact Messages, and Quote Requests, plus a Settings panel and an analytics overview with charts.
- **REST API** — layered `routes → controllers → services → models` architecture, centralized error handling, request validation, rate limiting, and image upload support.
- **Security** — Helmet, CORS restricted to the frontend origin, bcrypt password hashing, JWT with httpOnly cookie + bearer token fallback, MongoDB injection sanitization, and rate limiting on auth/form endpoints.
- **Design** — dark, developer-focused interface (VS Code / GitHub / Vercel inspired), built with plain CSS custom properties rather than a heavy framework, fully responsive.

## Technology Stack

**Frontend:** React, Vite, React Router, Axios, React Hook Form, Chart.js, react-icons
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, express-validator, Helmet, express-rate-limit

## Architecture

```
Routes → Controllers → Services → Models → MongoDB
```

Routes handle HTTP wiring and middleware only. Controllers translate requests into service calls and shape responses. Services hold all business logic and talk to Mongoose models directly. This keeps route files and controllers thin and testable.

## Folder Structure

```
clevtech-devhub/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # Reusable UI components (+ components/admin for dashboard-only pieces)
│       ├── context/        # AuthContext, SiteContext, ToastContext
│       ├── layouts/        # PublicLayout, AdminLayout
│       ├── pages/public/   # Public-facing pages
│       ├── pages/admin/    # Admin dashboard pages
│       └── services/       # Axios API service layer
├── server/                  # Express + MongoDB backend
│   ├── config/, controllers/, middleware/, models/, routes/, services/, utils/, validators/
│   └── uploads/             # Local dev image storage
├── .env.example
└── package.json             # Root orchestration scripts
```

## Getting Started

### 1. Install dependencies

```bash
npm run install:all
```

(Or manually: `npm install --prefix server` and `npm install --prefix client`.)

### 2. Configure environment variables

```bash
cp server/.env.example server/.env
```

Fill in:
- `MONGODB_URI` — a MongoDB Atlas connection string (free tier works fine: [mongodb.com/atlas](https://mongodb.com/atlas))
- `JWT_SECRET` — a long random string, e.g. `openssl rand -hex 32`

### 3. Seed the database

```bash
npm run seed
```

This creates an admin user (`admin@clevtechdevhub.com` / `ChangeThisPassword123!` by default — override via `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` in `.env`) plus 8 sample projects, 6 blog posts, 6 services, and 5 testimonials.

**Change the seeded admin password on first login.**

### 4. Run the development servers

```bash
npm run dev
```

This starts the Vite dev server (`http://localhost:5173`) and the Express API (`http://localhost:5000`) together via `concurrently`. The Vite dev server proxies `/api` and `/uploads` requests to the backend, so no CORS configuration is needed locally.

Admin dashboard: `http://localhost:5173/admin/login`

### 5. Build for production

```bash
npm run build     # builds the React frontend into client/dist
npm start          # starts the Express server (serve client/dist separately, e.g. via Vercel)
```

## API Documentation

All responses follow a consistent envelope:

```json
{ "success": true, "message": "...", "data": { } }
{ "success": false, "message": "...", "errors": [] }
```

| Resource | Public | Admin (JWT required) |
|---|---|---|
| Projects | `GET /api/projects`, `GET /api/projects/slug/:slug` | `GET /api/projects/:id`, `POST`, `PUT /:id`, `DELETE /:id` |
| Blog | `GET /api/blog`, `GET /api/blog/slug/:slug` | `GET /api/blog/:id`, `POST`, `PUT /:id`, `DELETE /:id` |
| Services | `GET /api/services` | `POST`, `PUT /:id`, `DELETE /:id` |
| Testimonials | `GET /api/testimonials` | `POST`, `PUT /:id`, `DELETE /:id` |
| Contact | `POST /api/contact` | `GET`, `PUT /:id/status`, `DELETE /:id` |
| Quotes | `POST /api/quotes` | `GET`, `GET /:id`, `PUT /:id/status`, `POST /:id/notes`, `DELETE /:id` |
| Settings | `GET /api/settings` | `PUT /api/settings` |
| Analytics | `POST /api/analytics/track` | `GET /api/analytics/overview` |
| Auth | `POST /api/auth/login` | `POST /api/auth/logout`, `GET /api/auth/me` |
| Upload | — | `POST /api/upload` (multipart `image` field) |

List endpoints (`projects`, `blog`, `contact`, `quotes`) accept `page`, `limit`, `search`, `category`/`status`, and return a `meta: { total, page, limit, totalPages }` object alongside `data`.

## Admin Setup

Login at `/admin/login` with the seeded admin credentials. From there you can manage all content — projects, blog posts, services, testimonials — and review incoming messages and quote requests. Site-wide settings (company info, social links, WhatsApp number, SEO defaults) are managed under **Settings**, so none of that requires touching source code.

## Deployment

- **Frontend:** deploy `client/` to Vercel (build command `npm run build`, output directory `dist`).
- **Backend:** deploy `server/` to Render, Railway, or a VPS. Set the environment variables from `.env.example`, with `CLIENT_URL` pointing at your deployed frontend domain and `NODE_ENV=production`.
- **Database:** MongoDB Atlas.
- Update the frontend's Axios `baseURL` (or add a `VITE_API_URL` env var) to point at the deployed API once it's not being proxied by Vite locally.

## Security Notes

- Passwords are hashed with bcrypt (12 salt rounds) and never returned in API responses.
- JWTs are issued on login and stored both as an httpOnly cookie and returned in the response body for clients that need a bearer token.
- All public form submissions (`/api/contact`, `/api/quotes`) are rate-limited and server-side validated regardless of frontend validation.
- CORS is restricted to `CLIENT_URL` in production — never wildcarded on authenticated routes.

## Future Improvements

- Payment provider integration (Paystack/Flutterwave) — the quote/project schema already anticipates this.
- Client portal (login, project tracking, invoices) — noted as a future module in the folder structure.
- Swap local `multer` disk storage for Cloudinary/S3 in `server/middleware/upload.js` and `server/controllers/uploadController.js` for production image hosting.

## Author

ClevTech DevHub — a ClevTech Global Ventures company.

## License

MIT
