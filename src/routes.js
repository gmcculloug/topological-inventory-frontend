import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const TopologyView = lazy(() => import('./pages/topology-view'));
const EntitiesList = lazy(() => import('./pages/sources-list'));

const paths = {
  index: '/',
  topologyView: '/topology-viewer'
};

const Routes = () => {
  return (
    <Suspense fallback={ <div>Loading</div> }>
      <Switch>
        <Route path={ paths.index } component={ EntitiesList }/>
        <Route path={ paths.topologyView } component={ TopologyView }/>
        <Route path="*" component={ EntitiesList }/>
      </Switch>
    </Suspense>
  );
};

export default Routes;
