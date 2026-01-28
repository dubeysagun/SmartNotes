# Deployment Visual Guide

## Part 1: Deploy Backend to Railway

### Step 1: Go to Railway.app

```
Visit: https://railway.app
Click "Start New" button
Sign in with GitHub
```

### Step 2: Create New Project

```
Click "New Project" button
↓
Select "Deploy from GitHub repo"
↓
Authorize Railway to access GitHub
↓
Select your SmartNotes repository
```

### Step 3: Select Backend Folder (IMPORTANT!)

```
You'll see a dropdown or option to select folder
↓
Click/Select: /Backend
↓
NOT the root folder!
↓
Click "Deploy" or "Confirm"
```

**This is CRITICAL!** If you select root, it won't work.

### Step 4: Wait for Deployment

```
Railway will start building your app
You'll see a status like:
  ⏳ Building...
  ✅ Deploying...
  ✅ Running

This takes 2-3 minutes
```

### Step 5: Add Environment Variables

```
After deployment completes:
1. Click "Variables" tab
2. Add three variables:

Variable 1:
  Name: MONGO_URI
  Value: mongodb+srv://your_username:your_password@cluster.mongodb.net/smartnotes
  (Copy from your local Backend/.env)

Variable 2:
  Name: JWT_SECRET
  Value: your_secret_key_from_local_env
  (Copy from your local Backend/.env)

Variable 3:
  Name: NODE_ENV
  Value: production

3. Click "Deploy" or apply button
```

### Step 6: Get Your Backend URL

```
Click "Deployments" tab
↓
You'll see your deployment listed
↓
Look for "Public URL" or "Domain"
↓
It looks like: https://smartnotes-backend-abc123.railway.app
↓
COPY THIS URL - You need it next!
```

---

## Part 2: Update Vercel Frontend

### Step 1: Go to Vercel Dashboard

```
Visit: https://vercel.com/dashboard
```

### Step 2: Select Your Project

```
Look for "SmartNotes" or your frontend project
Click on it
```

### Step 3: Go to Settings

```
Top menu bar: Find "Settings" link
Click it
```

### Step 4: Find Environment Variables

```
Left sidebar: Look for "Environment Variables"
Click it
```

### Step 5: Add New Variable

```
Click "Add New" or "+" button
↓
Field 1 - Name: VITE_API_URL
↓
Field 2 - Value: https://smartnotes-backend-abc123.railway.app
           (PASTE your Railway URL here)
↓
Click "Save" or "Add"
```

### Step 6: Redeploy Frontend

```
Go to "Deployments" tab (top menu)
↓
Find your latest deployment
↓
Click the three dots (...) menu
↓
Select "Redeploy"
↓
Wait for new deployment to complete (~1 minute)
↓
Once complete: "Ready" status shows
```

---

## Part 3: Test Your Live App

### Test 1: Open Frontend

```
Copy your Vercel URL: https://your-app.vercel.app
Open in browser
You should see:
  SmartNotes homepage
  Sign Up button
  Login button
```

### Test 2: Create Account

```
Click "Sign Up"
↓
Fill in:
  First Name: John
  Last Name: Doe
  Email: john@example.com
  Password: password123
↓
Click "Sign Up" button
↓
Expected: Redirects to home page (logged in)
```

### Test 3: Add a Note

```
Click "Add New Note"
↓
Fill in:
  Topic: Array
  Title: Two Sum
  Brute Force: Check every pair
  Optimized: Use HashMap
  Time: O(n)
  Space: O(n)
↓
Click "Save Note"
↓
Expected: Redirects to View Notes
```

### Test 4: Verify Note Saved

```
You should see your note in the list:
  - Array: Two Sum
↓
Click it to view details
↓
Should show all your data
```

### Test 5: Test Persistence

```
Refresh the page (Ctrl+R or Cmd+R)
↓
Expected: Note still there! ✅
↓
This proves MongoDB saved it!
```

### Test 6: Create Another Account

```
Click "Logout" (or clear localStorage)
↓
Click "Sign Up"
↓
Different email: jane@example.com
↓
Create account
↓
Add a new note
↓
Expected: Only see Jane's note
↓
NOT John's note from before ✅
```

---

## Common Issues & Fixes

### Issue: Can't select Backend folder in Railway

**Fix:**
```
Some versions of Railway need you to:
1. Go to project settings
2. Find "Service" or "Source"
3. Manually specify: /Backend
4. Re-deploy
```

### Issue: Environment variables not applying

**Fix:**
```
After adding variables in Railway:
1. Look for "Deploy" or "Apply" button
2. Click it - don't just close the dialog
3. Wait 1-2 minutes for re-deployment
4. Check "Logs" tab to confirm
```

### Issue: Vercel still showing old behavior

**Fix:**
```
1. Hard refresh browser (Ctrl+Shift+R on Windows)
2. Clear browser cache
3. Try incognito/private window
4. Check that VITE_API_URL was saved in Vercel
5. Verify redeployment completed
```

### Issue: Frontend can't connect to backend

**Debug:**
```
1. Open browser DevTools (F12)
2. Go to "Network" tab
3. Try to create a note
4. Look for failed request to API
5. Check URL in request matches your Railway URL
6. Verify backend is running in Railway (Logs tab)
```

---

## Verification Checklist

After deployment completes:

```
□ Railway dashboard shows "Running" status
□ Vercel shows successful deployment
□ Opened frontend in browser
□ Can create account
□ Can create note
□ Note appears in View Notes
□ Note still there after refresh
□ Created second account
□ Second account only sees own notes
□ First account still has own notes
□ Can delete notes
□ No console errors in browser DevTools
```

---

## You're Done! 🎉

Your SmartNotes app is now:
✅ **Live on the internet**
✅ **Secure with authentication**
✅ **Data persisting in MongoDB**
✅ **Each user has their own notes**

Share with others! 🚀
