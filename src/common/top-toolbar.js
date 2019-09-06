import React from 'react';
import { Title } from '@patternfly/react-core';
import { useSelector } from 'react-redux';

const TopToolbar = () => {
  const title = useSelector(({ topToolbarReducer: { title }}) => title);
  return (
    <div className="top-toolbar pf-u-p-lg">
      <Title size="2xl">{ title }</Title>
    </div>
  );
};

export default TopToolbar;
