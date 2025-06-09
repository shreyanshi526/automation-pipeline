import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // adjust this if your backend runs elsewhere
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
