import React from 'react';
import PropTypes from 'prop-types';
import { Level, LevelItem } from '@patternfly/react-core';
import debouncePromise from 'awesome-debounce-promise';

import FilterToolbarItem from '../common/filter-toolbar-item';
import AsyncPagination from '../common/async-pagination';

const debouncedRequest = debouncePromise((value, apiRequest) => apiRequest({ filter: value }), 500);

const SourcesListTableToolbar = ({
  setFilterValue,
  filterValue,
  meta,
  apiRequest
}) => (
  <div className="table-filter pf-u-p-lg">
    <Level style={ { width: '100%' } }>
      <LevelItem>
        <FilterToolbarItem
          placeholder={ `Filter by name...` }
          onFilterChange={ value => {
            setFilterValue(value);
            debouncedRequest(value, apiRequest);
          } }
          searchValue={ filterValue }
        />
      </LevelItem>
      <LevelItem>
        <AsyncPagination meta={ meta } apiRequest={ apiRequest }/>
      </LevelItem>
    </Level>
  </div>
);

SourcesListTableToolbar.propTypes = {
  setFilterValue: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  apiRequest: PropTypes.func.isRequired
};

export default SourcesListTableToolbar;
