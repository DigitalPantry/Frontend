import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://1706t520-8080.usw3.devtunnels.ms/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;