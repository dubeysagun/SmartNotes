# SmartNotes Authentication Implementation Guide

This document provides a complete overview of the authentication system implemented for SmartNotes, enabling personalized notes vault for each user.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend Requirements](#backend-requirements)
4. [Setup Instructions](#setup-instructions)
5. [API Integration](#api-integration)
6. [Security Features](#security-features)
7. [File Structure](#file-structure)

## Overview

The SmartNotes application now includes a complete authentication system with:

- **User Registration (Sign Up)**: New users can create accounts with email and password
- **User Login**: Existing users can log in with their credentials
- **JWT Token Authentication**: Secure token-based authentication
- **Protected Routes**: Only authenticated users can access notes
- **Personalized Vault**: Each user's notes are stored separately
- **Session Management**: Automatic token refresh and session handling

## Frontend Architecture

### Key Components Created

#### 1. **AuthContext** (`src/context/AuthContext.jsx`)
Global state management for authentication:
- Manages user data and authentication token
- Provides login, signup, and logout functions
- Persists authentication state in localStorage
- Handles loading and error states

#### 2. **Login Page** (`src/pages/Login.jsx`)
Features:
- Email and password input fields
- Form validation
- Error message display
- Loading state during authentication
- Link to signup page
- Integration with AuthContext

#### 3. **Sign Up Page** (`src/pages/SignUp.jsx`)
Features:
- First name and last name fields
- Email and password inputs
- Password confirmation validation
- Minimum password length requirement
- Form validation
- Error handling
- Link to login page

#### 4. **ProtectedRoute** (`src/components/ProtectedRoute.jsx`)
Component that:
- Wraps protected pages
- Checks user authentication status
- Redirects to login if not authenticated
- Shows loading state while checking auth

#### 5. **Updated Home Page** (`src/pages/Home.jsx`)
Enhancements:
- Displays user's first name in greeting
- Logout button in header
- Personalized welcome message
- Improved UI/UX with header styling

### API Service

**API Client** (`src/services/api.js`)
- Axios instance with automatic token injection
- Request interceptor that adds Bearer token
- Response interceptor for 401 error handling
- Automatic logout on token expiration

## Backend Requirements

### Technologies Needed
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variables

### Complete Backend Setup

See `BACKEND_SETUP_GUIDE.md` in the project root for detailed backend implementation.

**Quick Overview:**

```
Backend/
├── models/User.js              # User schema with password hashing
├── controllers/authController.js # Login/signup logic
├── routes/auth.js              # Auth endpoints
├── middleware/auth.js          # JWT verification middleware
├── server.js                   # Express server setup
└── .env                        # Environment variables
```

### Required API Endpoints

#### POST `/api/auth/signup`
Create a new user account

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
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

#### POST `/api/auth/login`
Authenticate existing user

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
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

#### GET `/api/auth/me`
Get current user information (Protected)

**Request Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

## Setup Instructions

### Frontend Setup

1. **Navigate to Frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies** (axios already installed):
   ```bash
   npm install
   ```

3. **Create `.env` file** (optional, if needed):
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The app will redirect unauthenticated users to `/login`.

### Backend Setup

1. **Follow the complete guide in `BACKEND_SETUP_GUIDE.md`**

2. **Quick start:**
   ```bash
   # Create Backend folder
   mkdir Backend
   cd Backend
   npm init -y
   
   # Install dependencies
   npm install express mongoose bcryptjs jsonwebtoken cors dotenv
   npm install --save-dev nodemon
   ```

3. **Create files** according to the structure in `BACKEND_SETUP_GUIDE.md`

4. **Create `.env` file:**
   ```
   MONGO_URI=mongodb://localhost:27017/smartnotes
   JWT_SECRET=your_super_secret_key_here
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   ```

5. **Start backend:**
   ```bash
   npm run dev
   ```

## API Integration

### How Authentication Works

1. **User visits app** → Redirected to `/login` if not authenticated
2. **User signs up/logs in** → API returns token and user data
3. **Token stored** → Saved in localStorage and AuthContext
4. **Token sent** → Automatically included in all API requests
5. **Protected pages accessed** → Can now view personalized content
6. **Token expires** → User automatically logged out and redirected to login

### Making Authenticated API Calls

Use the provided API client:

```javascript
import apiClient from '../services/api';

// Example: Get user's notes
async function getUserNotes() {
  try {
    const response = await apiClient.get('/api/notes');
    // Token is automatically included!
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

The token is automatically added to the Authorization header:
```
Authorization: Bearer <token>
```

### Notes API Example

Update your notes routes to be user-specific:

```javascript
// Backend: routes/notes.js
const express = require('express');
const { protect } = require('../middleware/auth');

router.get('/notes', protect, async (req, res) => {
  // req.user.id contains the authenticated user's ID
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
});

router.post('/notes', protect, async (req, res) => {
  const note = new Note({
    ...req.body,
    userId: req.user.id
  });
  await note.save();
  res.json(note);
});
```

## Security Features

### Frontend Security

1. **Protected Routes**: Components wrapped with `ProtectedRoute` are only accessible to authenticated users
2. **Token Storage**: JWT tokens stored in localStorage with key `authToken`
3. **Automatic Logout**: Invalid/expired tokens trigger automatic logout
4. **Error Handling**: Sensitive error messages don't expose system details

### Backend Security (Important)

1. **Password Hashing**: Passwords hashed with bcryptjs (10 rounds)
2. **JWT Signing**: Tokens signed with secret key
3. **Token Expiration**: Tokens expire after 7 days (configurable)
4. **Middleware Protection**: Protected routes require valid JWT
5. **CORS Configuration**: Only allow requests from your domain
6. **Environment Variables**: Sensitive data not exposed in code

### Best Practices to Implement

1. **HTTPS Only**: Use HTTPS in production
2. **Token Refresh**: Implement refresh token rotation
3. **Rate Limiting**: Limit login attempts
4. **Input Validation**: Validate all user inputs
5. **CORS Configuration**: Restrict to your domain
6. **HTTPS Cookies**: Use `httpOnly` flag for cookies (instead of localStorage in production)

## File Structure

### Frontend Files Added/Modified

```
Frontend/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx          [NEW] Authentication state
│   ├── pages/
│   │   ├── Login.jsx                [NEW] Login page
│   │   ├── SignUp.jsx               [NEW] Sign up page
│   │   ├── Auth.css                 [NEW] Authentication styling
│   │   ├── Home.jsx                 [MODIFIED] Added user greeting & logout
│   │   └── Home.css                 [NEW] Home page styling
│   ├── components/
│   │   └── ProtectedRoute.jsx       [NEW] Route protection
│   ├── services/
│   │   └── api.js                   [NEW] Axios API client
│   └── App.jsx                      [MODIFIED] Added auth routes
└── package.json                     [MODIFIED] Added axios

Root/
├── BACKEND_SETUP_GUIDE.md          [NEW] Complete backend guide
└── AUTHENTICATION_README.md         [THIS FILE]
```

## User Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    User Access App                      │
└────────────────────────┬────────────────────────────────┘
                         │
                    Is User Authenticated?
                    /              \
                   /                \
                 YES                NO
                  │                  │
                  ▼                  ▼
          ┌──────────────────┐   ┌──────────────────┐
          │  Home Page       │   │  Login Page      │
          │  Add Note        │   │  or Sign Up Page │
          │  View Notes      │   │  Create Account  │
          └──────────────────┘   └──────┬───────────┘
                  │                      │
                  │                  Credentials OK?
                  │                  /          \
                  │                 /            \
                  │               YES            NO
                  │                │              │
                  │                ▼              ▼
                  │         ┌──────────────┐  Error Message
                  │         │ Get JWT Token│  Retry
                  │         │ Store Token  │
                  │         └──────┬───────┘
                  │                │
                  └────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │ All API Requests Include Token │
        │ (Authorization: Bearer)        │
        └────────────────────────────────┘
```

## Testing the Authentication

### 1. Test Sign Up
- Navigate to `http://localhost:5173/signup`
- Fill in form with test data
- Click "Sign Up"
- Should redirect to home page

### 2. Test Login
- Navigate to `http://localhost:5173/login`
- Enter registered email and password
- Click "Login"
- Should redirect to home page

### 3. Test Protected Routes
- Try accessing `/add-note` without login
- Should redirect to login page
- Login and try again - should work

### 4. Test Logout
- Click "Logout" button on home page
- Should redirect to login page
- localStorage should be cleared

### 5. Test Token Persistence
- Login
- Refresh the page
- Should remain logged in
- Close and reopen browser - should still be logged in

## Troubleshooting

### Issue: CORS Error
**Solution**: Ensure backend has CORS enabled:
```javascript
const cors = require('cors');
app.use(cors());
```

### Issue: Token Not Being Sent
**Solution**: Check that `apiClient` is used for API calls, and token is in localStorage with key `authToken`

### Issue: Login Redirects Back to Login
**Solution**: Check backend `/api/auth/login` returns correct response format with `token` and `user`

### Issue: Protected Routes Not Working
**Solution**: Ensure `AuthProvider` wraps entire app in `App.jsx`

## Next Steps

1. ✅ Frontend authentication complete
2. ⏭️ Create backend with the provided guide
3. ⏭️ Update notes API to be user-specific
4. ⏭️ Test authentication flow
5. ⏭️ Deploy to production with HTTPS
6. ⏭️ Implement refresh tokens for security
7. ⏭️ Add profile page (optional)
8. ⏭️ Add password reset functionality (optional)

## Support & Documentation

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT.io](https://jwt.io)

---

**Last Updated**: January 28, 2026
**Version**: 1.0.0
