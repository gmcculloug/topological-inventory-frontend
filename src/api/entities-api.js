import React, { Fragment } from 'react';
import { getAxtionsInstace } from './api';
import { SOURCES_API_BASE, TOPOLOGICAL_INVETORY_API_BASE } from '../constants/api-constants';

const api = getAxtionsInstace();

const generateRow = (dataSet, attributes = [ 'id', 'name' ]) =>
  dataSet.map(row => attributes.map(key => <Fragment key={ key }>{ row[key] }</Fragment>));

export const getSources = () => api.get(`${SOURCES_API_BASE}/sources`).then(({ data }) =>  generateRow(data.data));

export const getVms = () => api.get(`${TOPOLOGICAL_INVETORY_API_BASE}/vms`).then(({ data }) =>  generateRow(data.data));
