import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const TopologyView = lazy(() => import('./pages/topology-view'));
const SourcesList = lazy(() => import('./pages/sources-list'));
const EntityDetail = lazy(() => import('./pages/entity-detail'));

const paths = {
  index: '/',
  detail: '/entity',
  topologyView: '/topology-viewer'
};

const Routes = () => {
  return (
    <Suspense fallback={ <div>Loading</div> }>
      <Switch>
        <Route exact path={ paths.index } component={ SourcesList }/>
        <Route exact path={ paths.topologyView } component={ TopologyView }/>
        <Route exact path={ paths.detail } component={ EntityDetail } />
        <Route path="*" component={ SourcesList }/>
      </Switch>
    </Suspense>
  );
};

export default Routes;
