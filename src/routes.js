import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import EntityDetail from './pages/detail';
import CardLoader from './components/loaders/card-loader';
import { Grid, GridItem } from '@patternfly/react-core';
import styled from 'styled-components';

const TopologyView = lazy(() => import('./pages/topology-view'));
const TreeView = lazy(() => import('./pages/tree-view'));
const Crossroads = lazy(() => import('./pages/crossroads'));

export const paths = {
  index: '/',
  treeView: '/tree-view',
  detail: '/entity',
  topologyView: '/topology-viewer',
};

const StyledGrid = styled(Grid)`
  min-height: 100%;
`;

const Routes = () => (
  <StyledGrid hasGutter>
    <GridItem>
      <Suspense fallback={<CardLoader />}>
        <Switch>
          <Route path={`${paths.detail}`} component={EntityDetail} />
          <Route exact path={paths.treeView} component={TreeView} />
          <Route exact path={paths.topologyView} component={TopologyView} />
          <Route path={Routes.index} component={Crossroads} />
          <Route path="*" component={Crossroads} />
        </Switch>
      </Suspense>
    </GridItem>
  </StyledGrid>
);

export default Routes;
