# SmartNotes Authentication - Quick Start Guide

## ✅ What's Been Implemented (Frontend)

### Pages Created
- **Login Page** (`/login`) - User authentication with email and password
- **Sign Up Page** (`/signup`) - User registration with name, email, and password
- **Protected Home** (`/`) - Shows personalized greeting with logout button

### Authentication Features
- ✅ User registration with validation
- ✅ User login with error handling
- ✅ JWT token-based authentication
- ✅ Protected routes (only authenticated users can access)
- ✅ Automatic token injection in API requests
- ✅ Session persistence (localStorage)
- ✅ Automatic logout on token expiration
- ✅ Beautiful, responsive UI

### Files Created/Modified

**New Files:**
```
Frontend/
├── src/
│   ├── context/
│   │   ├── AuthContextDef.js       # Context definition
│   │   └── AuthContext.jsx         # Provider component
│   ├── hooks/
│   │   └── useAuth.js              # Custom hook
│   ├── services/
│   │   └── api.js                  # Axios API client
│   ├── pages/
│   │   ├── Login.jsx               # Login page
│   │   ├── SignUp.jsx              # Sign up page
│   │   ├── Auth.css                # Auth pages styling
│   │   ├── Home.jsx                # [Modified] Added logout & greeting
│   │   └── Home.css                # [Modified] Added header styling
│   └── components/
│       └── ProtectedRoute.jsx       # Protected route wrapper
└── package.json                     # [Modified] Added axios

Root/
├── BACKEND_SETUP_GUIDE.md          # Complete backend implementation
└── AUTHENTICATION_README.md        # Detailed documentation
```

## 🚀 Next Steps - Backend Setup

### Option 1: Quick Setup (Recommended)
1. Follow `BACKEND_SETUP_GUIDE.md` in the project root
2. Takes ~10 minutes to set up complete authentication backend

### Option 2: Minimal Setup
Create a simple backend with these endpoints:
- `POST /api/auth/signup` - Create user
- `POST /api/auth/login` - Authenticate user
- Add `userId` field to your notes collection

## 📝 API Endpoints to Implement

### Sign Up
```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

## 🔧 Testing the Frontend

### Test User Flow

1. **Start Frontend:**
   ```bash
   cd Frontend
   npm run dev
   ```

2. **Visit App:**
   - Go to `http://localhost:5173`
   - You'll be redirected to `/login`

3. **Try Login/Sign Up:**
   - Sign up form validates:
     - First name required
     - Last name required
     - Email format required
     - Password min 6 characters
     - Passwords must match

4. **Error Handling:**
   - Try submitting empty form - shows validation errors
   - Try invalid email - shows format error
   - Try mismatched passwords - shows error

## 📚 Using the API Client

In your page/component files, use the provided API client:

```javascript
// Import the API client
import apiClient from '../services/api';

// Make a request (token automatically included!)
async function fetchUserNotes() {
  try {
    const response = await apiClient.get('/api/notes');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

The token is automatically added as: `Authorization: Bearer <token>`

## 🔐 Backend Integration Checklist

- [ ] Create Backend folder
- [ ] Install dependencies: express, mongoose, bcryptjs, jsonwebtoken, cors
- [ ] Create User model with password hashing
- [ ] Create auth controller (signup, login)
- [ ] Create auth routes
- [ ] Add auth middleware for protected routes
- [ ] Configure MongoDB connection
- [ ] Set up environment variables (.env)
- [ ] Test endpoints with Postman
- [ ] Update Notes model to include userId
- [ ] Update Notes routes to use auth middleware

## 🎨 Customization

### Change API URL
Update `Frontend/src/services/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://your-api-url:5000";
```

Or create `Frontend/.env`:
```
VITE_API_URL=http://your-api-url:5000
```

### Change Token Expiration
Backend `.env`:
```
JWT_EXPIRE=7d  // Change this
```

### Change Styling
- Auth pages: `Frontend/src/pages/Auth.css`
- Home page: `Frontend/src/pages/Home.css`

## 🛡️ Security Notes

### Frontend
- ✅ Tokens stored in localStorage
- ✅ Automatic token injection
- ✅ Protected routes working
- ✅ Session persistence

### Backend (To Implement)
- ⏳ Password hashing with bcryptjs
- ⏳ JWT secret in environment variable
- ⏳ Token verification middleware
- ⏳ Rate limiting on login attempts
- ⏳ CORS configuration
- ⏳ HTTPS in production

## 📞 Common Issues & Solutions

### Issue: Routes redirect to login
**Solution:** 
- Make sure `AuthProvider` wraps the entire app in `App.jsx`
- Check token is being stored in localStorage

### Issue: Token not sent with requests
**Solution:**
- Use the provided `apiClient` from `services/api.js`
- Don't use plain `fetch` or `axios`

### Issue: 401 errors after login
**Solution:**
- Check backend is running on correct port
- Check `VITE_API_URL` matches backend URL
- Verify token format in response

## 📖 Documentation Files

1. **AUTHENTICATION_README.md** - Complete detailed documentation
2. **BACKEND_SETUP_GUIDE.md** - Complete backend implementation guide
3. **This file** - Quick reference guide

## ✨ Features Ready to Use

### Login Page Features
- Email/password validation
- Error message display
- Loading state
- Remember password (auto-fill via browser)
- Sign up link
- Beautiful UI

### Sign Up Page Features
- First/last name fields
- Email validation
- Password strength check (min 6 chars)
- Password confirmation
- Form validation
- Error messages
- Login link
- Beautiful UI

### Home Page Features
- User greeting with first name
- Logout button
- Protected access
- Session persistence

### API Client Features
- Automatic token injection
- Automatic logout on 401 errors
- Error handling
- Request/response interceptors

## 🎯 Testing Checklist

- [ ] Sign up creates new user
- [ ] Login with correct credentials works
- [ ] Login with wrong password fails
- [ ] Protected routes redirect to login when not authenticated
- [ ] Logout clears session
- [ ] Page refresh maintains session
- [ ] Token is sent with API requests
- [ ] Invalid token causes logout
- [ ] Form validation works
- [ ] Error messages display correctly

## 💡 Tips

1. **Use Postman** to test backend endpoints before connecting frontend
2. **Check Browser DevTools** - Network tab shows token in headers
3. **Check localStorage** - DevTools → Storage → localStorage to see stored token
4. **Watch browser console** - for error messages
5. **Enable CORS** in backend for development

---

**Ready to proceed?** → Follow **BACKEND_SETUP_GUIDE.md** to create the authentication backend!
