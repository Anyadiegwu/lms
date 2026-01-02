# EduLearn LMS

## Overview

EduLearn is a modern, full-stack Learning Management System (LMS) designed for seamless user authentication and learning experiences. It supports social login via Google as well as traditional email/password registration and login. The frontend is built with React and Vite for a responsive UI, while the backend uses Express.js for secure API handling. This project demonstrates full-stack development skills, including OAuth integration, password hashing, JWT authentication, and modular routing. It's ideal for a portfolio showcase, highlighting secure auth flows and clean code structure.

The app includes a login/registration interface, a dashboard with sidebar navigation, and backend APIs for authentication. Users can sign up or log in via Google (which handles both registration and login seamlessly) or email/password (with full name required for registration).

## Features

- **User Authentication**:
  - Google Sign-In: Secure OAuth 2.0 flow with backend token verification. Automatically registers new users or logs in existing ones.
  - Email/Password Registration: Requires full name, email, and password. Passwords are hashed using bcrypt for security.
  - Email/Password Login: Validates credentials against stored hashed passwords.
- **JWT Sessions**: Generates real JSON Web Tokens for authenticated sessions, with expiration (7 days by default).
- **Dashboard**: Protected user dashboard with sidebar and content display, showing user name and profile picture.
- **In-Memory Storage**: Uses simple in-memory arrays for users (resets on server restart) — suitable for demos; easy to extend to a database like MongoDB.
- **Responsive UI**: Clean, modern design with Lucide icons and CSS styling for login/registration pages.
- **Error Handling**: Robust backend validation, logging, and frontend alerts for network/auth failures.
- **Test Endpoint**: `/api/test` for verifying backend health.

## Tech Stack

- **Frontend**:
  - React.js (with hooks for state management)
  - Vite (build tool and dev server)
  - Lucide React (icons)
- **Backend**:
  - Express.js (web server)
  - google-auth-library (for Google token verification)
  - jsonwebtoken (JWT generation)
  - bcryptjs (password hashing)
  - cors (CORS handling)
- **Deployment**:
  - Frontend: Vercel (static hosting)
  - Backend: Render (Node.js hosting)
- **Other**:
  - dotenv (environment variables)
  - In-memory data (extendable to MongoDB/Mongoose)

## Prerequisites

- Node.js (v18+ recommended)
- npm (or yarn/pnpm)
- Google Cloud Console account (for OAuth Client ID)
- Git (for cloning the repo)

## Installation

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd edulearn
   ```

2. Install root dependencies (if any):
   ```
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd client
   npm install
   ```

4. Install backend dependencies:
   ```
   cd ../server
   npm install
   ```

5. Set up environment variables:
   - In `client/.env`:
     ```
     VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
     VITE_API_URL=http://localhost:5000  # For local dev; update to deployed backend URL in production
     ```
   - In `server/.env`:
     ```
     GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
     JWT_SECRET=your-strong-jwt-secret
     PORT=5000
     ```

   Obtain `GOOGLE_CLIENT_ID` from Google Cloud Console (create OAuth 2.0 Client ID for Web application, add authorized origins like `http://localhost:5173` and your deployed frontend URL).

## Running Locally

1. Start the backend:
   ```
   cd server
   npm run dev  # Or node server.js
   ```
   - Runs on `http://localhost:5000`

2. Start the frontend:
   ```
   cd client
   npm run dev
   ```
   - Runs on `http://localhost:5173`

3. Use concurrent scripts from root (if set up):
   ```
   npm run dev
   ```
   - Starts both frontend and backend simultaneously.

4. Test:
   - Visit `http://localhost:5173` for the app.
   - Test endpoints: `http://localhost:5000/api/test` (should return JSON).

## Deployment

### Frontend (Vercel)
1. Push to GitHub.
2. In Vercel dashboard: New Project → Import repo → Set root directory to `client`.
3. Add env vars: `VITE_GOOGLE_CLIENT_ID` and `VITE_API_URL=https://your-backend.onrender.com`.
4. Deploy — gets a URL like `https://your-app.vercel.app`.

### Backend (Render)
1. In Render dashboard: New Web Service → Connect GitHub repo.
2. Set root directory: `server`.
3. Runtime: Node.
4. Build command: `npm install`.
5. Start command: `node server.js`.
6. Add env vars: `GOOGLE_CLIENT_ID`, `JWT_SECRET`.
7. Deploy — gets a URL like `https://your-backend.onrender.com`.

Update CORS in `server.js` to include the Vercel frontend URL.

## Notes on Render Free Tier

Render's free tier is great for low-traffic demos but has limitations:
- **Sleep on Inactivity**: The backend service sleeps after 15 minutes of no inbound requests to save resources.
- **Cold Starts**: The first request after sleep can take 10–60 seconds to wake up the service. Subsequent requests are fast.
- **Impact on Your App**: If the app hasn't been used for a while, the first login/registration attempt may be slow (e.g., Google auth or email submit). This is normal for free tiers and doesn't affect functionality — it's just a brief delay.
- **Workaround**: For always-on performance, upgrade to Render's paid Starter plan (~$7/month). Alternatively, use a free uptime monitor like UptimeRobot to ping your backend every 10 minutes (e.g., `/api/test` endpoint).

For portfolios, mention this in demos: "Backend hosted on Render free tier — may have cold starts after inactivity."

## Contributing

Contributions welcome! Fork the repo, create a branch, and submit a PR. Focus on bug fixes, features, or docs improvements.

## License

MIT License — free to use, modify, and distribute.

Feel free to reach out with questions or feedback! 🚀
