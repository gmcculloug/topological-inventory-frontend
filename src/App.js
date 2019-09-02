import React, { useEffect } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components';
import Routes from './routes';
import './App.scss';

const App = () => {
  useEffect(() => {
    insights.chrome.init();
  }, []);

  return (
    <Main>
      <Routes />
    </Main>
  );
};

export default App;
