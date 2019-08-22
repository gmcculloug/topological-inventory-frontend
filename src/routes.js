import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import TopologyView from './pages/topology-view';

const paths = {
  topologyView: '/'
};

const Routes = () => {
  return (
    <Suspense fallback={ <div>Loading</div> }>
      <Switch>
        <Route path={ paths.topologyView } component={ TopologyView } rootClass='samplepage'/>
        <Route path="*" component={ TopologyView }/>
      </Switch>
    </Suspense>
  );
};

export default Routes;
