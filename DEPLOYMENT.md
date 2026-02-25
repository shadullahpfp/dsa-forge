# Deployment Checklist & Guide

This guide provides instructions for deploying the DSA Forge application to Render (or similar platforms like Vercel).

## 1. Prerequisites

### Database Setup
The application uses SQLite in development but **must use PostgreSQL in production**.
1. Create a free PostgreSQL database on Render, Supabase, or Railway.
2. Update the `prisma/schema.prisma` file if deploying:
   Replace `provider = "sqlite"` with `provider = "postgresql"`.

### Environment Variables
You will need the following environment variables configured on your hosting platform:
- `DATABASE_URL` (Your PostgreSQL connection string)
- `NEXTAUTH_SECRET` (Run `openssl rand -base64 32` to generate a secure secret)
- `NEXTAUTH_URL` (Your production domain, e.g., `https://dsa-forge-app.onrender.com`)
- `GOOGLE_CLIENT_ID` (From Google Cloud Console)
- `GOOGLE_CLIENT_SECRET` (From Google Cloud Console)

## 2. Platform Setup (Render Example)

1. Connect your GitHub repository to Render.
2. Create a new **Web Service**.
3. Configure the following settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

## 3. Deployment Scripts and Commits

The application has been adjusted for deployment. Specifically:
- `output: "standalone"` was removed from `next.config.ts`.
- `package.json` build and start scripts were modified:
  - `"build": "prisma generate && next build"`
  - `"start": "next start"`
- Basic runtime checks restrict missing env variables.

### Deploying the Database Schema
During the build process or manually upon the first deploy, you need to push the Prisma schema to the database.
If your platform doesn't auto-run migrations during build, you can use:
`npx prisma db push`

### Seeding the Database
To populate the production database with the initial module and problem data:
1. Connect to your server's shell (e.g., via the Render dashboard).
2. Run: `npx tsx prisma/seed.ts`
*(Note: Be careful not to run this multiple times on production unless wiping data is acceptable).*

## 4. Common Failure Fixes

### 502 Bad Gateway / Application Crashes immediately
- **Cause:** Missing `DATABASE_URL` or `NEXTAUTH_SECRET`.
- **Fix:** Check your environment variables and ensure they match the requirements exactly. Notice that `NEXTAUTH_SECRET` is heavily required by NextAuth in production.

### Database Lock Issues
- **Cause:** Using SQLite in a serverless or ephemeral environment (like Render's free tier) where the disk isn't persistent or handles simultaneous connections poorly.
- **Fix:** You *must* switch to PostgreSQL for production deployments.

### `P2025` Prisma Errors on Login/Update
- **Cause:** A user record was unexpectedly missing during an update (e.g., if you wiped the database but kept the browser cookies).
- **Fix:** Already patched in `api/user/route.ts` to return graceful 404s instead of crashing. Clear local cookies if happening frequently during testing.
