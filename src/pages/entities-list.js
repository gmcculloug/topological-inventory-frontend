import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Table,
  TableHeader,
  TableBody,
  textCenter
} from '@patternfly/react-table';

import { SET_TITLE } from '../store/action-types/top-toolbar-actions';
import FilterSelect from '../common/filter-select';
import FilterToolbarItem from '../common/filter-toolbar-item';

const entitiesOptions = [{
  value: 'source',
  label: 'Source'
}, {
  value: 'vm',
  label: 'VM'
}];

const columns = [
  { title: 'Repositories' },
  'Branches',
  { title: 'Pull requests' },
  'Workspaces',
  {
    title: 'Last Commit',
    transforms: [ textCenter ],
    cellTransforms: [ textCenter ]
  }
];

const rows = [
  {
    cells: [ 'one', 'two', 'three', 'four', 'five' ]
  },
  {
    cells: [
      {
        title: <div>one - 2</div>,
        props: { title: 'hover title', colSpan: 3 }
      },
      'four - 2',
      'five - 2'
    ]
  },
  {
    cells: [
      'one - 3',
      'two - 3',
      'three - 3',
      'four - 3',
      {
        title: 'five - 3 (not centered)',
        props: { textCenter: false }
      }
    ]
  }
];

const EntitiesList = () => {
  const [ data, setData ] = useState([]);
  const [ entityType, setEntityType ] = useState(entitiesOptions[0]);
  const [ filterValue, setFilterValue ] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(data, setData);
    dispatch({ type: SET_TITLE, payload: 'Inventory' });
  }, []);
  console.log(entityType);
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
      <Table aria-label="entities-list" cells={ columns } rows={ rows }>
        <TableHeader />
        <TableBody />
      </Table>
    </Fragment>
  );
};

export default EntitiesList;
