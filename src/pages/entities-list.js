import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Table,
  TableHeader,
  TableBody
} from '@patternfly/react-table';

import { SET_TITLE } from '../store/action-types/top-toolbar-actions';
import FilterSelect from '../common/filter-select';
import FilterToolbarItem from '../common/filter-toolbar-item';
import { getSources } from '../api/entities-api';

const entitiesOptions = [{
  value: 'source',
  label: 'Source'
}, {
  value: 'vm',
  label: 'VM'
}];

const columns = [
  'Id',
  'Name'
];

const queries = {
  source: getSources,
  vm: getSources
};

const EntitiesList = () => {
  const [ data, setData ] = useState([]);
  const [ entityType, setEntityType ] = useState(entitiesOptions[0]);
  const [ filterValue, setFilterValue ] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_TITLE, payload: 'Inventory' });
  }, []);
  useEffect(() => {
    queries[entityType.value]().then(data => setData(data));
  }, [ entityType ]);
  console.log('render: ', data);
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
      <Table aria-label="entities-list" cells={ columns } rows={ data }>
        <TableHeader />
        <TableBody />
      </Table>
    </Fragment>
  );
};

export default EntitiesList;
