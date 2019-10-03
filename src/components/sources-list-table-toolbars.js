import React from 'react';
import PropTypes from 'prop-types';
import { Level, LevelItem } from '@patternfly/react-core';

import FilterToolbarItem from '../common/filter-toolbar-item';
import AsyncPagination from '../common/async-pagination';
import debouncePromise from 'awesome-debounce-promise';

const SourcesListTableToolbar = ({
  setFilterValue,
  filterValue,
  meta,
  apiRequest
}) => {
  const debouncedRequest = debouncePromise((value) => apiRequest({ filter: value }, meta), 500);
  return (
    <div className="table-filter pf-u-p-lg">
      <Level style={ { width: '100%' } }>
        <LevelItem>
          <FilterToolbarItem
            placeholder={ `Filter by name...` }
            onFilterChange={ value => {
              setFilterValue(value);
              debouncedRequest(value);
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
};

SourcesListTableToolbar.propTypes = {
  setFilterValue: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  apiRequest: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default SourcesListTableToolbar;
