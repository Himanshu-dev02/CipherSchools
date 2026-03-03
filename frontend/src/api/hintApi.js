import axiosClient from './axiosClient';

export const getHint = (query, question) =>
    axiosClient.post('/hint', { query, question });
