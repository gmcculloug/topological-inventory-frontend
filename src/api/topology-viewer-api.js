/* eslint-disable no-console */
import { getAxtionsInstace } from './api';
import { TOPOLOGICAL_INVETORY_API_BASE } from '../constants/api-constants';
const API = getAxtionsInstace();

const structureQuery = `
query {
  sources {
    id,
    source_regions {
      id
      name
      networks {
        id
        name
        subnets {
          id
          name
          network_adapters {
            id
          }
        }
      }
    }
  }
}
`;
export const loadFullStructure = () => API.post(`${TOPOLOGICAL_INVETORY_API_BASE}/graphql`, {
  query: structureQuery
}).then(({ data }) => data);
