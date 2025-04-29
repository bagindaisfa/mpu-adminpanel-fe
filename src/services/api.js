import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ambil token dari localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika token tidak valid/expired
      localStorage.removeItem('token');
      window.location.href = '/'; // Redirect paksa ke login
    }

    if (error.response && error.response.status === 403) {
      // Jika token tidak valid/expired
      localStorage.removeItem('token');
      window.location.href = '/'; // Redirect paksa ke login
    }
    return Promise.reject(error);
  }
);

export default api;
