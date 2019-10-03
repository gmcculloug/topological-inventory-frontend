import React, { Fragment, useEffect } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components';

import Routes from './routes';
import TopToolbar from './common/top-toolbar';

import './App.scss';

const App = () => {
  useEffect(() => {
    insights.chrome.init();
    insights.chrome.identifyApp('topological-inventory');
  }, []);

  return (
    <Fragment>
      <TopToolbar />
      <Main>
        <Routes />
      </Main>
    </Fragment>
  );
};

export default App;
