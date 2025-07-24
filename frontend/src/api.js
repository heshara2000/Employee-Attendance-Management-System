// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:8000', // Adjust if running differently
// });

// // Set token in header
// export const setAuthToken = (token) => {
//   if (token) {
//     API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete API.defaults.headers.common['Authorization'];
//   }
// };

// export default API;
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // Change this if backend is hosted elsewhere
});

// Attach token from localStorage automatically on every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to set or remove the auth token in localStorage and axios headers
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token); // store token
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
