import axios from 'axios';

const resolveInterceptor = response => response.data || response;
const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(resolveInterceptor);

export const getAxtionsInstace = () => axiosInstance;

/**
 * graphql API
 */

const grapqlInstance = axios.create();
grapqlInstance.interceptors.request.use(async config => {
  await window.insights.chrome.auth.getUser();
  return config;
});
/**
 * Graphql does not return error response when the qery fails.
 * Instead it returns 200 response with error object.
 * We catch it and throw it to trigger notification middleware
 */
grapqlInstance.interceptors.response.use(({ data }) => {
  if (data.errors) {
    throw {
      message: data.errors[0].errorType,
      data: data.errors[0].message
    };
  }

  return data;
});

export const getGraphqlInstance = () => grapqlInstance;
