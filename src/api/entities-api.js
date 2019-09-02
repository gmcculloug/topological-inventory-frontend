import React, { Fragment } from 'react';
import { getAxtionsInstace } from './api';
import { SOURCES_API_BASE } from '../constants/api-constants';

const api = getAxtionsInstace();

const sourcesQuery = `
query {
  sources {
    name
    id
  }
}
`;

export const getSources = () => api.post(`${SOURCES_API_BASE}/graphql`, {
  query: sourcesQuery
}).then(({ data: { sources }}) => sources.map(({ id, name }) => ({
  cells: [ <Fragment key={ id }>{ id }</Fragment>, <Fragment key={ name }>{ name }</Fragment> ]})));
