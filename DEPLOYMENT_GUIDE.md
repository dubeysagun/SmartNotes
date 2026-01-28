# SmartNotes - Complete Deployment Guide

Deploy your backend to production and connect with your Vercel frontend.

---

## 🚀 Quick Start Summary

| Component | Location | Status |
|-----------|----------|--------|
| Frontend | Vercel | ✅ Already Deployed |
| Backend | Your Computer | ⏳ Needs Deployment |
| Database | MongoDB Atlas | ✅ Already Setup |

---

## Step 1: Deploy Backend to Railway (Recommended)

Railway is free, fast, and works great with Node.js apps.

### 1.1 Create Railway Account

1. Go to **https://railway.app**
2. Click **"Start New"** or **"Sign Up"**
3. Sign in with **GitHub** (easiest)
4. Authorize Railway to access your GitHub

### 1.2 Create a New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your **SmartNotes** repository
4. **Important:** Select the **Backend folder** (not root)
   - Click "Configure" → select `/Backend` directory
5. Click **"Deploy"** and wait 2-3 minutes

### 1.3 Add Environment Variables

Once deployed, you need to configure the environment variables:

1. Go to your Railway project dashboard
2. Click **"Variables"** tab
3. Add these variables (copy from your local `.env`):

```
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/smartnotes
JWT_SECRET=your_secret_key_from_local_env
NODE_ENV=production
```

4. Click **"Deploy"** button to apply changes

### 1.4 Get Your Backend URL

1. Go to **"Deployments"** tab
2. Click on your latest deployment
3. Look for **"Public URL"** or **"Domain"**
4. It looks like: `https://smartnotes-backend-xxx.railway.app`
5. **Copy this URL** - you'll need it next!

---

## Step 2: Update Vercel Frontend with Backend URL

Now connect your Vercel frontend to the deployed backend.

### 2.1 Add Environment Variable in Vercel

1. Go to **Vercel Dashboard** (https://vercel.com/dashboard)
2. Select your **SmartNotes Frontend** project
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)
5. Add new variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://smartnotes-backend-xxx.railway.app` (your Railway URL from Step 1.4)
6. Click **"Save"**

### 2.2 Redeploy Frontend

1. Go back to **"Deployments"** tab
2. Find your latest deployment
3. Click the **three dots (...)** menu
4. Select **"Redeploy"**
5. Wait for deployment to complete
6. Your site will automatically update!

---

## Step 3: Test the Connection

### 3.1 Test Login/Signup Flow

1. Go to your Vercel frontend URL
2. Click **"Sign Up"**
3. Create a test account
4. Should redirect to home
5. Click **"Add New Note"**
6. Fill in the form with test data
7. Click **"Save Note"**
8. Go to **"View Notes"**
9. Should see your note in the list!

### 3.2 Test Data Persistence

1. Refresh the page or close and reopen browser
2. **Your notes should still be there!** ✅
3. This proves data is saved in MongoDB

### 3.3 Test User Isolation

1. Create **another account** with different email
2. Login with this new account
3. Add a note
4. You should **only see your own notes**
5. Previous account's notes are **not visible** ✅

---

## Troubleshooting

### Backend Deploy Failed

**Error:** Deployment failed, check logs

**Solution:**
```bash
# Check what went wrong:
# 1. Go to Railway dashboard
# 2. Click "Logs" tab
# 3. Look for error messages
# Common issues:
# - MONGO_URI is invalid
# - JWT_SECRET not set
# - Node version incompatible
```

### Frontend Says "Cannot Reach Backend"

**Error:** Network error when creating/viewing notes

**Solutions:**
1. Check `VITE_API_URL` in Vercel settings is correct
2. Make sure backend deployment is running
3. Check MongoDB is still running
4. Clear browser cache and reload

### Notes Aren't Saving

**Error:** Create note works but notes don't appear

**Solutions:**
1. Check MONGO_URI in Railway environment variables
2. Make sure database allows connections from Railway IP
3. Verify JWT token is being sent (check browser DevTools → Network)

### CORS Error

**Error:** "Access to XMLHttpRequest blocked by CORS policy"

**Solution:** Backend already has CORS enabled, but verify:
- Backend is running
- API URL is correct
- No typos in environment variable

---

## How Data Flows in Production

```
User Browser (Vercel Frontend)
    ↓
https://your-app.vercel.app/add-note
    ↓
Creates note → POST to https://smartnotes-backend-xxx.railway.app/api/notes
    ↓
Backend receives request
    ↓
Verifies JWT token from Authorization header
    ↓
Checks user ID from token
    ↓
Creates note in MongoDB with userID
    ↓
Returns success response
    ↓
Frontend displays "Note saved!"
    ↓
User can see it in View Notes
```

---

## Alternative: Deploy Backend to Heroku

If you prefer Heroku over Railway:

### Option A: Free Heroku (Older Method)

Note: Heroku free tier ended in Nov 2022. Use Railway instead.

### Option B: Heroku Paid Tier

1. Go to **https://heroku.com**
2. Create account
3. Install Heroku CLI: `npm install -g heroku`
4. Login: `heroku login`
5. Create app: `heroku create smartnotes-backend`
6. Set variables:
   ```bash
   heroku config:set MONGO_URI=your_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set NODE_ENV=production
   ```
7. Deploy:
   ```bash
   git push heroku main
   ```
8. Get URL: `heroku apps:info smartnotes-backend`

**Not recommended** - Railway is simpler and free.

---

## Success Checklist

- [ ] Backend deployed to Railway
- [ ] Railway environment variables set (MONGO_URI, JWT_SECRET)
- [ ] Backend URL obtained from Railway
- [ ] Vercel VITE_API_URL set to Railway backend URL
- [ ] Frontend redeployed in Vercel
- [ ] Can sign up on live site
- [ ] Can create notes on live site
- [ ] Notes persist after refresh
- [ ] Only see your own notes (not others')
- [ ] Can delete notes
- [ ] Generate button works (when you add AI)

---

## Important Notes

### Security
- ✅ Passwords hashed in database
- ✅ JWT tokens expire after 7 days
- ✅ Each user only sees their own notes
- ✅ All requests require authentication token

### Database
- ✅ MongoDB Atlas keeps your data safe
- ✅ Data persists forever (until you delete it)
- ✅ Can access from Railway, Vercel, and your local computer

### Performance
- ✅ Railway auto-scales if needed
- ✅ MongoDB Atlas has built-in replication
- ✅ Vercel CDN makes frontend fast globally

---

## Next Steps (Optional)

### 1. Custom Domain
Instead of `smartnotes-xxx.vercel.app`, use `smartnotes.com`:
- Buy domain from GoDaddy, Namecheap, etc.
- Add to Vercel Settings → Domains
- Points there automatically ✅

### 2. Add AI Features
The "Generate" buttons are ready for AI:
- Integrate with OpenAI API
- Generate approaches, complexity, code
- See `Frontend/src/pages/AddNote.jsx` for button locations

### 3. Analytics
- Use Vercel Analytics to track frontend usage
- Use Railway logs to debug backend issues
- Check MongoDB Atlas usage stats

### 4. Continuous Deployment
- Already setup! Just push to GitHub
- Railway auto-deploys on push (if configured)
- Vercel auto-deploys on every commit

---

## Contact Support

If anything goes wrong:

1. **Railway Issues:** https://railway.app/support
2. **Vercel Issues:** https://vercel.com/support
3. **MongoDB Issues:** https://docs.mongodb.com
4. **Express Issues:** https://expressjs.com

---

## You Did It! 🎉

Your app is now **live on the internet**!
- Frontend: `https://your-app.vercel.app`
- Backend: `https://smartnotes-backend-xxx.railway.app`
- Database: MongoDB Atlas (cloud)

Share your app with friends and celebrate! 🚀
