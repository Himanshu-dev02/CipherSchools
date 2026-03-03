import axiosClient from './axiosClient';

export const getAssignments = () => axiosClient.get('/assignments');

export const getAssignmentById = (id) => axiosClient.get(`/assignments/${id}`);
