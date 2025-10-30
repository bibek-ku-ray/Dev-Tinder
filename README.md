# Dev-Tinder

Dev-Tinder is a modern web app that helps developers discover and connect with each other for collaboration, mentorship, pair programming, and career opportunities. Think “Tinder for developers,” with profiles, matching, and real-time chat.

This repository is a full‑stack JavaScript project with a React + Vite frontend and a Node.js + Express + MongoDB backend, including real‑time features using Socket.IO.

## Language Composition

- JavaScript: 99.2%
- Other: 0.8%

## Tech Stack

Frontend
- React 19
- Vite 6 (dev server and build)
- React Router DOM 7
- Redux Toolkit + React Redux
- Tailwind CSS 4 + DaisyUI
- Axios (HTTP client)
- Socket.IO Client (real-time)
- ESLint 9 (linting)

Backend
- Node.js + Express 5
- MongoDB + Mongoose 8
- JSON Web Tokens (jsonwebtoken) for auth
- bcryptjs for password hashing
- validator for input validation
- cookie-parser for signed/secure cookies
- cors for Cross-Origin Resource Sharing
- dotenv for environment configuration
- http-status-codes for consistent HTTP responses
- Socket.IO (server) for real-time messaging

Project Scripts
- Frontend
  - dev: vite
  - build: vite build
  - preview: vite preview
  - lint: eslint .
- Backend
  - dev: node --watch src/app.js
  - start: node src/app.js

## Core Features

User Accounts and Authentication
- Sign up, login, and logout flows
- Secure password hashing with bcrypt
- JWT-based authentication
- Cookie-based session handling (with cookie-parser)
- Input validation on API payloads

Developer Profiles
- Rich profile with name, bio, avatar, skills, and links
- Editable profile details
- Public profile viewing (for discovery)

Matching & Discovery
- Browse developers and express interest (like/pass)
- Mutual interest creates a “match”
- Recommendation logic to surface relevant profiles (e.g., by skills, interests)

Real-Time Chat
- One-to-one messaging between matched users
- Online presence and instant message delivery via Socket.IO
- Typing indicators and read receipts (as applicable)

Notifications
- Real-time notifications for matches and incoming messages
- Toasts/badges in the UI

App UX
- Responsive UI using Tailwind CSS and DaisyUI components
- Client-side routing with React Router
- State management with Redux Toolkit (auth state, profile, matches, chat)

API & Server
- RESTful API built with Express
- MongoDB models using Mongoose (Users, Matches, Messages, etc.)
- Robust error handling and HTTP status codes
- CORS configuration for secure cross-origin requests

Security & Best Practices
- JWT secrets and DB credentials via environment variables
- Validation for request bodies (validator)
- Basic rate limiting/throttling can be added behind Express middleware
- Linting enforced by ESLint

## Project Structure

Top-level (typical)
- frontend/ — React + Vite app
  - src/ — app code (components, pages, store, routes, services)
- backend/ — Node.js + Express API
  - src/ — server code (app.js, routes, controllers, models, middleware, sockets)

Note: Exact file structure may evolve. Look in each `src/` folder for current implementation details.

## Getting Started

Prerequisites
- Node.js LTS installed
- MongoDB connection (local or cloud, e.g., MongoDB Atlas)
- Recommended: pnpm or npm as a package manager

1) Clone the repository
- git clone https://github.com/bibek-ku-ray/Dev-Tinder.git
- cd Dev-Tinder

2) Install dependencies
- Frontend
  - cd frontend
  - npm install
- Backend
  - cd backend
  - npm install

3) Configure environment variables

Create a `.env` file in the backend directory:
```
# Backend .env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=your-strong-jwt-secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Optional: If you proxy API requests from the frontend dev server, configure that in the frontend as needed.

4) Run the app in development

- Backend (from backend/)
  - npm run dev
- Frontend (from frontend/)
  - npm run dev

The dev servers will print their URLs in the console (Vite defaults to port 5173; backend port is controlled by `PORT`).

5) Build for production (frontend)
- cd frontend
- npm run build
- npm run preview (to locally preview the production build)

## API Overview

High-level endpoints (typical)
- Auth: /api/auth/register, /api/auth/login, /api/auth/me, /api/auth/logout
- Profiles: /api/profiles (CRUD)
- Discovery/Matches: /api/matches (like/pass/list)
- Messages: /api/messages (send/fetch)
- Sockets: /socket.io for real-time events

Exact endpoints, payloads, and error formats are documented in the server routes and controllers.

## Real-Time Events (Socket.IO)

Typical events
- connection / disconnect
- user:online, user:offline
- message:send, message:receive
- match:new
- typing:start, typing:stop

Namespace/room strategy often includes:
- Per-user rooms (user:<id>)
- Per-conversation rooms (chat:<id>)

## Development Notes

- Code Style: ESLint rules are configured in the frontend; consider adding shared linting for backend.
- Commit Strategy: Conventional commits recommended for clear history.
- Environment: Keep secrets out of VCS. Use `.env` and configure your deployment environment variables securely.

## Roadmap Ideas

- Advanced search and filtering (skills, location, availability)
- Media uploads (avatars) via a cloud storage service
- Push notifications (web/mobile)
- Blocking/reporting and moderation tools
- Internationalization (i18n)
- Accessibility refinements (a11y)

## License

- Backend package.json declares ISC license.
- If you intend to license the entire repository, consider adding a root LICENSE file with the desired terms.

## Acknowledgements

- React, Vite, Tailwind CSS, DaisyUI
- Node.js, Express, MongoDB/Mongoose
- Socket.IO
- The open-source community
