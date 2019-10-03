import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableHeader,
  TableBody
} from '@patternfly/react-table';

import { SET_TITLE } from '../store/action-types/top-toolbar-actions';
import { getSources } from '../api/entities-api';
import { SET_DATA } from '../store/action-types/sources-action-types';
import SourcesListTableToolbar from '../components/sources-list-table-toolbars';

const columns = [
  'Uid',
  'Name',
  'Created at'
];

const generateRow = (dataSet) =>
  dataSet.map(row => [
    row.uid,
    row.name,
    row.created_at
  ]);

const EntitiesList = () => {
  const [ filterValue, setFilterValue ] = useState('');
  const { data, meta } = useSelector(state => state.sourcesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_TITLE, payload: 'Inventory' });
    getSources().then(data => dispatch({ type: SET_DATA, payload: data }));
  }, []);

  return (
    <Fragment>
      <SourcesListTableToolbar
        meta={ meta }
        apiRequest={ (...args) => getSources(...args).then(data => dispatch({ type: SET_DATA, payload: data })) }
        filterValue={ filterValue }
        setFilterValue={ setFilterValue }
      />
      <Table aria-label="entities-list" cells={ columns } rows={ generateRow(data) }>
        <TableHeader />
        <TableBody />
      </Table>
    </Fragment>
  );
};

export default EntitiesList;
