import { getAxtionsInstace } from './api';
import { SOURCES_API_BASE, TOPOLOGICAL_INVETORY_API_BASE } from '../constants/api-constants';

const api = getAxtionsInstace();

export const getSources = () => api.get(`${SOURCES_API_BASE}/sources`).then(({ data }) =>  data);

export const getVms = () => api.get(`${TOPOLOGICAL_INVETORY_API_BASE}/vms`).then(({ data }) =>  data);
