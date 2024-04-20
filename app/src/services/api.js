import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request interceptor
api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken'); 
    if (token) {
        config.headers.Authorization =  `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // Handle request errors
    return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(function (response) {
    // Handle successful responses
    return response;
}, function (error) {
    // Handle errors
    return Promise.reject(error);
});

export default api;
