import axios from 'axios';

const axiosInstance = axios.create();

const responseInterceptor = (({ data }) => data);
axiosInstance.interceptors.response.use(responseInterceptor);

export const getAxtionsInstace = () => axiosInstance;
