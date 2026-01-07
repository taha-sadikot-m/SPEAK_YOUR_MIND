# Local Development Guide

## ✅ Setup Complete!

The inquiry form with Neon DB integration is now running.

## 🚀 How to Test Locally

### Important: Use Vercel Dev Server
To test the inquiry form locally with API routes, you **MUST** use:

```bash
vercel dev --listen 3000
```

**Do NOT use** `npm run dev` - it won't support serverless API functions!

### Testing Steps:

1. **Open your browser**: http://localhost:3000

2. **Navigate to the inquiry form section**:
   - Scroll down to the "Why SYM?" section
   - Click the "Get Started Today" button
   - OR click "Contact Us" in the Hero section

3. **Fill out the form**:
   - Name (required)
   - Email (required)  
   - Phone (optional)
   - Organization (optional)
   - Message (optional)

4. **Submit and verify**:
   - Click "Submit Inquiry"
   - You should see a success message
   - Data is saved to your Neon database

### Verify Data in Neon:

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Open SQL Editor
4. Run:
```sql
SELECT * FROM inquiry_submissions ORDER BY created_at DESC LIMIT 10;
```

## 🔧 If You Get Errors:

### "API endpoint not available"
- Make sure you're using `vercel dev`, not `npm run dev`
- Check that `.env.local` has `NEON_DATABASE_URL`

### "Database configuration error"
- Verify `NEON_DATABASE_URL` is set in `.env.local`
- Make sure the database table exists (run `database/schema.sql`)

### "Failed to submit inquiry"
- Check Neon console to ensure database is active
- Verify connection string is correct
- Check browser console for detailed errors

## 📱 Port Information:

- **Vercel Dev**: http://localhost:3000
- **API Endpoint**: http://localhost:3000/api/submit-inquiry

## 🎯 Next Steps:

Once testing is successful:
1. Commit your changes to Git
2. Deploy to Vercel: `vercel --prod`
3. Add `NEON_DATABASE_URL` to Vercel environment variables
4. Test on production URL

## 💡 Tips:

- Vercel dev server has hot reload - changes will reflect automatically
- Check terminal output for API logs
- Use browser DevTools Network tab to inspect API calls
- Environment variables from `.env.local` are automatically loaded
