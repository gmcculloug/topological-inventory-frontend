import axios from 'axios';

const axiosInstance = axios.create();

export const getAxtionsInstace = () => axiosInstance;
