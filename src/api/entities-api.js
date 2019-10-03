import { getAxtionsInstace } from './api';
import { SOURCES_API_BASE, TOPOLOGICAL_INVETORY_API_BASE } from '../constants/api-constants';

import { defaultSettings } from '../utilities/pagination';

const api = getAxtionsInstace();

export const getSources = (apiProps = { filter: '' }, options = defaultSettings) =>
  api.get(`${SOURCES_API_BASE}/sources?filter[name][contains]=${apiProps.filter}&offset=${options.offset}&limit=${options.limit}`);

export const getVms = () => api.get(`${TOPOLOGICAL_INVETORY_API_BASE}/vms`).then(({ data }) =>  data);
