import axios from "axios";

// Automatically detect API URL based on environment
const getAPIUrl = () => {
  // If VITE_API_URL is explicitly set in .env or deployment
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // For local development
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5000";
  }
  
  // For production (Vercel, Netlify, etc.)
  // Replace with your actual backend URL when deployed
  return "https://your-backend-url.railway.app"; // Change this to your deployed backend URL
};

const API_URL = getAPIUrl();

// Log API URL for debugging
if (import.meta.env.MODE === "development") {
  console.log("📡 API URL:", API_URL);
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
