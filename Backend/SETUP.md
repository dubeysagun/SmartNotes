# SmartNotes Backend Setup Guide

This guide will help you set up the MongoDB database and start the backend server.

## Prerequisites

1. **Node.js** - Download from https://nodejs.org (v14 or higher)
2. **MongoDB** - Choose one option:
   - **Option A: Local MongoDB** - https://www.mongodb.com/try/download/community
   - **Option B: MongoDB Atlas (Cloud)** - https://www.mongodb.com/cloud/atlas (Recommended for beginners)

---

## Step 1: Install Dependencies

```bash
cd Backend
npm install
```

This installs all required packages:
- express - Web server
- mongoose - Database ORM
- bcryptjs - Password hashing
- jsonwebtoken - Authentication tokens
- cors - Cross-origin requests
- dotenv - Environment variables

---

## Step 2: Set Up MongoDB

### Option A: Use MongoDB Atlas (Cloud - Recommended)

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Verify email

2. **Create Cluster:**
   - Click "Create Deployment"
   - Select FREE tier
   - Choose AWS, any region
   - Create cluster (takes ~5 minutes)

3. **Get Connection String:**
   - Go to "Databases" → "Connect"
   - Choose "Drivers"
   - Copy connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/smartnotes`)
   - Replace `<password>` with your password
   - Replace `smartnotes` with database name

4. **Create .env File:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and update:
   ```
   MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/smartnotes
   JWT_SECRET=your_super_secret_key_here_make_it_long
   PORT=5000
   NODE_ENV=development
   ```

   **How to Generate JWT_SECRET:**
   
   Choose one method:
   
   **Method 1: Online Generator (Easiest)**
   - Go to https://generate-random.org/encryption-key-generator
   - Set length to 64
   - Click Generate
   - Copy the result into JWT_SECRET
   
   **Method 2: Node.js (Terminal)**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Copy the output into JWT_SECRET
   
   **Method 3: PowerShell (Windows)**
   ```powershell
   [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString() + (New-Guid).ToString()))
   ```
   
   **Method 4: Manual Example**
   ```
   JWT_SECRET=aB3$nM9@xY2zQ5#pL7&wE8!vR1%tU4^cD6*fG0(hJ9)
   ```
   (Must be at least 30 characters, mix of letters, numbers, symbols)

### Option B: Use Local MongoDB

1. **Install MongoDB Community:**
   - Windows: https://www.mongodb.com/try/download/community
   - Mac: `brew install mongodb-community`
   - Linux: Follow official docs

2. **Start MongoDB:**
   - Windows: MongoDB will start automatically
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Create .env File:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/smartnotes
   JWT_SECRET=your_super_secret_key_here_make_it_long
   PORT=5000
   NODE_ENV=development
   ```

---

## Step 3: Start Backend Server

```bash
# For development (auto-restart on file changes)
npm run dev

# Or for production
npm start
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
📝 API Documentation:
   POST   /api/auth/signup      - Create new account
   POST   /api/auth/login       - Login to account
   GET    /api/auth/me          - Get current user
   GET    /api/notes            - Get all your notes
   POST   /api/notes            - Create new note
   GET    /api/notes/:id        - Get specific note
   PUT    /api/notes/:id        - Update note
   DELETE /api/notes/:id        - Delete note
```

---

## Step 4: Test Backend (Optional)

Use Postman to test API endpoints:

### 1. Sign Up (Create Account)
```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Get Your Notes
```
GET http://localhost:5000/api/notes
Authorization: Bearer {your_token_from_signup}
```

### 4. Create New Note
```
POST http://localhost:5000/api/notes
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "topic": "Array",
  "title": "Two Sum Problem",
  "link": "https://leetcode.com/problems/two-sum/",
  "statement": "Find two numbers that add up to target",
  "approach": {
    "brute": "Check every pair O(n²)",
    "optimized": "Use HashMap O(n)",
    "notes": "Watch for duplicate numbers"
  },
  "summary": {
    "takeaways": "HashMap is powerful",
    "tricks": "Store complement in map",
    "mistakes": "Don't use same element twice"
  },
  "complexity": {
    "time": "O(n)",
    "space": "O(n)",
    "explanation": "Single pass with HashMap"
  },
  "codeBlocks": []
}
```

---

## Step 5: Connect Frontend to Backend

The frontend is **already configured** to work with both local and deployed backends!

### For Local Development (Both running on your computer)

**Option 1: Using .env file (Recommended)**

Create or edit: `Frontend/.env`
```
VITE_API_URL=http://localhost:5000
```

**Option 2: No .env file needed**
- The frontend automatically uses `http://localhost:5000` in development mode
- Just start the backend and frontend normally

### For Vercel Deployment (Frontend on Vercel, Backend Deployed)

You'll need to:

1. **Deploy your backend** to a service like Railway, Heroku, etc.
2. **Get your backend URL** (example: `https://smartnotes-backend.railway.app`)
3. **Add environment variable in Vercel:**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add: `VITE_API_URL=https://smartnotes-backend.railway.app`
   - Redeploy

### How It Works

The `api.js` file automatically detects your environment:

```javascript
// For local development → uses http://localhost:5000
// For production (Vercel) → uses VITE_API_URL from environment variable
// Fallback → uses your deployed backend URL
```

**Current setup in `Frontend/src/services/api.js`:**
```javascript
const getAPIUrl = () => {
  // 1. Check if VITE_API_URL is set
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // 2. For local dev, use localhost
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5000";
  }
  
  // 3. For production, use your deployed backend
  return "https://your-backend-url.railway.app";
};
```

---

## Step 6: Run Full Application

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```

Now:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## Database Structure

### Users Collection
```javascript
{
  _id: ObjectId,
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "hashed_password",
  createdAt: Date,
  updatedAt: Date
}
```

### Notes Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,              // Links to User
  topic: "Array",
  title: "Two Sum",
  link: "https://...",
  statement: "Problem description",
  approach: {
    brute: "...",
    optimized: "...",
    notes: "..."
  },
  summary: {
    takeaways: "...",
    tricks: "...",
    mistakes: "..."
  },
  complexity: {
    time: "O(n)",
    space: "O(n)",
    explanation: "..."
  },
  codeBlocks: [
    {
      tag: "Approach 1",
      language: "cpp",
      code: "..."
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** 
- Make sure MongoDB is running
- Check MONGO_URI in .env is correct

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
cd Backend
npm install
```

### CORS Error in Frontend
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Backend server is running and CORS is enabled (already done)

---

## API Endpoints Summary

### Authentication (Public)
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login to account

### Authentication (Protected)
- `GET /api/auth/me` - Get current user info

### Notes (All Protected - User must be logged in)
- `GET /api/notes` - Get all your notes
- `POST /api/notes` - Create new note
- `GET /api/notes/:id` - Get specific note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

All protected routes require:
```
Authorization: Bearer {your_jwt_token}
```

---

## Environment Variables (.env)

| Variable | Example | Description |
|----------|---------|-------------|
| MONGO_URI | mongodb://localhost:27017/smartnotes | MongoDB connection string |
| JWT_SECRET | my_super_secret_key | Secret key for JWT signing |
| PORT | 5000 | Server port |
| NODE_ENV | development | Environment mode |

---

## Next Steps

1. ✅ Install Backend dependencies (`npm install`)
2. ✅ Set up MongoDB (Atlas or Local)
3. ✅ Create `.env` file with credentials
4. ✅ Start backend server (`npm run dev`)
5. ✅ Update Frontend API URL
6. ✅ Start Frontend (`npm run dev`)
7. Test signup/login flow
8. Create and view notes

---

---

## Backend Deployment Guide (For Production)

When you want to deploy both frontend and backend:

### Option 1: Deploy Backend to Railway (Recommended - Free)

1. **Create Account:**
   - Go to https://railway.app
   - Sign up with GitHub
   - Authorize Railway

2. **Deploy:**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your SmartNotes repository
   - Select the Backend folder
   - Railway will auto-detect `package.json`

3. **Configure Environment Variables:**
   - In Railway: Variables
   - Add: `MONGO_URI=your_mongodb_atlas_uri`
   - Add: `JWT_SECRET=your_secret_key`
   - Add: `NODE_ENV=production`
   - Railway sets `PORT` automatically

4. **Get Your Backend URL:**
   - Railway gives you: `https://smartnotes-backend-xxx.railway.app`
   - Use this in Vercel frontend environment variable

### Option 2: Deploy Backend to Heroku

1. **Install Heroku CLI**
2. **Login:** `heroku login`
3. **Create App:** `heroku create smartnotes-backend`
4. **Set Env Variables:**
   ```bash
   heroku config:set MONGO_URI=your_uri
   heroku config:set JWT_SECRET=your_secret
   ```
5. **Deploy:**
   ```bash
   git push heroku main
   ```
6. **Get URL:** `https://smartnotes-backend.herokuapp.com`

### Option 3: Deploy Both to Same Service

Some services like Railway support full-stack deployment:
- Frontend folder
- Backend folder
- Both share same MongoDB

---

## Support

- MongoDB Docs: https://docs.mongodb.com
- Express Docs: https://expressjs.com
- Mongoose Docs: https://mongoosejs.com
- JWT: https://jwt.io
- Railway Deployment: https://railway.app
- Vercel Deployment: https://vercel.com

**Ready? Start with:** `cd Backend && npm run dev`
