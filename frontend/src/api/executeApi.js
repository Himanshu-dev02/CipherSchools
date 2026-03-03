import axiosClient from './axiosClient';

export const executeQuery = (query) =>
    axiosClient.post('/execute', { query });
