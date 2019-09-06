import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableHeader,
  TableBody
} from '@patternfly/react-table';

import { SET_TITLE } from '../store/action-types/top-toolbar-actions';
import FilterSelect from '../common/filter-select';
import FilterToolbarItem from '../common/filter-toolbar-item';
import { getSources, getVms } from '../api/entities-api';
import * as vmsActionTypes from '../store/action-types/vms-action-types';
import * as sourcesActionTypes from '../store/action-types/sources-action-types';

const entitiesOptions = [{
  value: 'sources',
  label: 'Source'
}, {
  value: 'vms',
  label: 'VM'
}];

const columns = [
  'Id',
  'Name'
];

const queries = {
  sources: getSources,
  vms: getVms
};

const actionTypes = {
  vms: vmsActionTypes.SET_DATA,
  sources: sourcesActionTypes.SET_DATA
};

const generateRow = (dataSet, attributes = [ 'id', 'name' ]) =>
  dataSet.map(row => attributes.map(key => <Fragment key={ key }>{ row[key] }</Fragment>));

const EntitiesList = () => {
  const [ entityType, setEntityType ] = useState(entitiesOptions[0]);
  const [ filterValue, setFilterValue ] = useState('');
  const data = useSelector(state => state[`${entityType.value}Reducer`].data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_TITLE, payload: 'Inventory' });
  }, []);

  useEffect(() => {
    queries[entityType.value]().then(data => dispatch({ type: actionTypes[entityType.value], payload: data }));
  }, [ entityType ]);
  return (
    <Fragment>
      <div className="table-filter pf-u-p-lg">
        <FilterSelect simpleValue={ false } onChange={ value => setEntityType(value) } value={ entityType } options={ entitiesOptions } />
        <FilterToolbarItem
          placeholder={ `Filter by ${entityType.label}...` }
          onFilterChange={ value => setFilterValue(value) }
          searchValue={ filterValue }
        />
      </div>
      <Table aria-label="entities-list" cells={ columns } rows={ generateRow(data) }>
        <TableHeader />
        <TableBody />
      </Table>
    </Fragment>
  );
};

export default EntitiesList;
