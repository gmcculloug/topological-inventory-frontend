import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const TopologyView = lazy(() => import('./pages/topology-view'));
const SourcesList = lazy(() => import('./pages/sources-list'));

const paths = {
  index: '/',
  detail: '/entity',
  topologyView: '/topology-viewer',
};

const Routes = () => (
  <Suspense fallback={<div>Loading</div>}>
    <Switch>
      <Route exact path={paths.index} component={SourcesList} />
      <Route exact path={paths.topologyView} component={TopologyView} />
      <Route path="*" component={SourcesList} />
    </Switch>
  </Suspense>
);

export default Routes;
