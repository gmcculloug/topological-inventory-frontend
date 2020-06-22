import React, { Fragment, useEffect } from 'react';

import Routes from './routes';

const App = () => {
  useEffect(() => {
    insights.chrome.init();
    insights.chrome.identifyApp('topological-inventory');
  }, []);

  return (
    <Fragment>
      <Routes />
    </Fragment>
  );
};

export default App;
