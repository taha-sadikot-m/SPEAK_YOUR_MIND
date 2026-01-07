# Neon DB Integration Setup Guide

## 🚀 Quick Start

### 1. Create Neon Account & Database

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project (e.g., "SYM-Platform")
3. Copy your connection string from the dashboard

### 2. Set Up Database Table

1. Open Neon SQL Editor in your Neon dashboard
2. Run the SQL script from `database/schema.sql`
3. Verify table creation

### 3. Configure Environment Variables

#### For Local Development:
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` and add your Neon connection string:
```env
NEON_DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

#### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add `NEON_DATABASE_URL` with your connection string
4. Apply to Production, Preview, and Development

### 4. Install Dependencies

```bash
npm install
```

### 5. Test Locally

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Run with serverless functions support
vercel dev
```

Visit `http://localhost:3000` and test the inquiry form.

### 6. Deploy to Vercel

```bash
vercel --prod
```

## 📊 Database Schema

The `inquiry_submissions` table includes:
- `id` - Auto-incrementing primary key
- `name` - User's full name (required)
- `email` - User's email address (required)
- `phone` - Phone number (optional)
- `organization` - Organization/Institution name (optional)
- `message` - User's message (optional)
- `created_at` - Timestamp of submission
- `updated_at` - Auto-updated timestamp

## 🔍 View Submissions

### Via Neon SQL Editor:
```sql
-- View all submissions
SELECT * FROM inquiry_submissions ORDER BY created_at DESC;

-- Count total submissions
SELECT COUNT(*) FROM inquiry_submissions;

-- View submissions from last 7 days
SELECT * FROM inquiry_submissions 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

## 🛠️ API Endpoint

**POST** `/api/submit-inquiry`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "organization": "Example Inc",
  "message": "I'm interested in your platform"
}
```

Response:
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "id": 123
}
```

## 🔒 Security Features

- ✅ Database credentials stored in environment variables
- ✅ Server-side validation
- ✅ Email format validation
- ✅ SQL injection protection (using parameterized queries)
- ✅ CORS headers configured

## 📈 Monitoring

1. **Neon Dashboard**: Monitor database usage and performance
2. **Vercel Dashboard**: View function logs and errors
3. **Analytics**: Track submission rates

## 🐛 Troubleshooting

### Form not submitting:
1. Check browser console for errors
2. Verify `NEON_DATABASE_URL` is set in Vercel
3. Check Vercel function logs

### Database connection errors:
1. Verify connection string format
2. Check Neon project is active
3. Ensure database table exists

### CORS errors:
1. Clear browser cache
2. Redeploy to Vercel
3. Check API route configuration

## 📞 Next Steps

Consider adding:
- Email notifications (using Resend/SendGrid)
- Admin dashboard to view submissions
- Export to CSV functionality
- Rate limiting to prevent spam
- Duplicate submission detection

## 💰 Pricing

- **Neon**: Free tier includes 3GB storage
- **Vercel**: Free tier includes 100GB bandwidth
- **Total Cost**: $0/month for starter usage
