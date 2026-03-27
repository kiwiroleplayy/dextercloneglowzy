# Vercel & Supabase Deployment Guide

## Setup Instructions

### 1. Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to find:
   - Project URL
   - Service Role Key
3. Create your database tables in the Supabase SQL editor

### 2. Environment Variables in Vercel
Add these environment variables in your Vercel project settings:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
FRONTEND_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

### 3. Database Migration
Run your SQL migration in Supabase SQL editor:
- Open `link_platform.sql` from this repository
- Copy and execute the content in Supabase SQL editor

### 4. Deployment to Vercel
1. Connect your GitHub repository to Vercel
2. Set the root directory to `backend`
3. Add all environment variables
4. Deploy!

### 5. Important Notes
- File uploads: Vercel's serverless functions have limitations. Consider using Vercel Blob or Supabase Storage for file uploads.
- Sessions: Serverless functions are stateless. Session storage might need adjustment for production.
- Database: All database operations now use Supabase PostgreSQL instead of MySQL/MongoDB.
