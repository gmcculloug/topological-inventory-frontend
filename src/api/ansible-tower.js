import { getAxtionsInstace } from './api';
import { TOPOLOGICAL_INVETORY_API_BASE } from '../constants/api-constants';

// level 0
export const getSources = () => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/sources`);
export const getServieCredentials = () => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/service_credentials`);
export const getServiceCredentialTypes = () => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/service_credential_types`);

// level 1
export const getServiceOfferings = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/sources/${id}/service_offerings`);
export const getServicePlans = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/sources/${id}/service_plans`);
export const getServiceInstance = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/sources/${id}/service_instances`);
export const getServiceInventories = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/sources/${id}/service_inventories`);
export const getServiceInstanceNodes = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/sources/${id}/service_instance_nodes`);
export const getServiceOfferingNodes = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/sources/${id}/service_offering_nodes`);

export const getSource = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/sources/${id}`);
export const getServiceOffering = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/service_offerings/${id}`);
export const getServicePlan = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/service_plans/${id}`);
export const getServiceInstanc = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/service_instances/${id}`);
export const getServiceInventorie = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/service_inventories/${id}`);
export const getServiceInstanceNode = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/service_instance_nodes/${id}`);
export const getServiceOfferingNode = (id) => getAxtionsInstace().get(`${TOPOLOGICAL_INVETORY_API_BASE}/service_offering_nodes/${id}`);
