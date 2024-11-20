import axios from 'axios';

// Base URL for the backend hosted on Render
const API = axios.create({
  baseURL: 'https://<your-render-url>', // Replace with your Render backend URL
});

// Example to add a request interceptor (optional)
API.interceptors.request.use((config) => {
  // You can add authentication tokens here if needed
  return config;
});

export default API;
