import axios from 'axios';

/**
 * Axios client pre-configured with the API base URL.
 * In dev mode, Vite proxies /api requests to the backend.
 */
const axiosClient = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
