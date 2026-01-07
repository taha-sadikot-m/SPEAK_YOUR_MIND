# Development & Deployment Guide

## 🚀 How It Works

### Local Development (npm run dev)
- Runs Vite dev server on `http://localhost:3000`
- **Form submissions use MOCK data** (not saved to database)
- Perfect for UI/UX development and testing
- Fast hot reload

### Production (Vercel Deployment)
- API routes in `/api` folder become serverless functions
- Form submissions save to Neon database
- Fully functional with real data

## 💻 Local Development

### Option 1: Quick Development (Mock Data)
```bash
npm run dev
```
- Opens `http://localhost:3000`
- Form works but data is NOT saved to database
- Console shows: "Using mock API"
- Good for testing UI/layout

### Option 2: Full Testing (Real Database)
```bash
vercel dev
```
- Runs Vercel dev server with serverless functions
- Form submissions save to Neon database
- Requires Vercel CLI: `npm install -g vercel`
- First time setup required

## 📦 Deployment to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variable:
   - Name: `NEON_DATABASE_URL`
   - Value: Your Neon connection string
4. Deploy!

### 3. Verify
- Visit your deployed URL
- Test the inquiry form
- Check Neon database for submissions

## 🗄️ Database Setup

### Create Table in Neon
1. Go to [Neon Console](https://console.neon.tech)
2. Open SQL Editor
3. Run the script from `database/schema.sql`

### Verify Data
```sql
SELECT * FROM inquiry_submissions ORDER BY created_at DESC;
```

## 🔧 Configuration

### Environment Variables

**Local (`.env.local`):**
```env
NEON_DATABASE_URL=your_connection_string
GEMINI_API_KEY=your_gemini_key
```

**Vercel Dashboard:**
- Add `NEON_DATABASE_URL` in Settings → Environment Variables

## 📝 How API Routes Work

### Structure:
```
/api/submit-inquiry.ts → Becomes serverless function on Vercel
```

### Local Development:
- `npm run dev` → Mock API (no real database)
- `vercel dev` → Real API with database

### Production:
- Vercel automatically creates serverless functions from `/api` folder
- No backend server needed!

## 🎯 Why This Approach?

✅ **Simple**: No complex backend setup
✅ **Serverless**: Vercel handles API routes automatically  
✅ **Fast Development**: Mock mode for quick UI work
✅ **Production Ready**: Real database on Vercel
✅ **Cost Effective**: Free tier for both Neon and Vercel

## 🐛 Troubleshooting

### Form shows "Mock Mode" message
- This is normal for `npm run dev`
- Use `vercel dev` for real database testing

### API 404 Error
- In local dev with `npm run dev`: Expected (uses mock)
- With `vercel dev`: Check that you're logged in to Vercel
- In production: Check environment variables are set

### Database errors
- Verify `NEON_DATABASE_URL` in `.env.local`
- Check table exists in Neon database
- Ensure Neon project is active
