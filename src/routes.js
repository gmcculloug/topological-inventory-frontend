import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import EntityDetail from './pages/detail';

const TopologyView = lazy(() => import('./pages/topology-view'));
const TreeView = lazy(() => import('./pages/tree-view'));

const paths = {
  index: '/',
  detail: '/entity',
  topologyView: '/topology-viewer',
};

const Routes = () => (
  <Suspense fallback={<div>Loading</div>}>
    <Switch>
      <Route path={`${paths.detail}`} component={EntityDetail} />
      <Route exact path={paths.index} component={TreeView} />
      <Route exact path={paths.topologyView} component={TopologyView} />
      <Route path="*" component={TreeView} />
    </Switch>
  </Suspense>
);

export default Routes;
