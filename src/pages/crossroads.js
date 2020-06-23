import React from 'react';
import { Card, CardBody, CardTitle, Bullseye } from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import TreeIcon from '@patternfly/react-icons/dist/js/icons/tree-icon';
import TopologyIcon from '@patternfly/react-icons/dist/js/icons/topology-icon';
import styled from 'styled-components';

import { paths } from '../routes';

const CrossroadsLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardsWrapper = styled.div`
  display: inline-flex;
  margin: auto;
`;

const StyledCard = styled(Card)`
  margin: 24px;
  width: 300px;
  height: 300px;
  color: var(--pf-global--palette--blue-400);
  text-align: center;
  font-size: 1.5rem;
`;

const Crossroads = () => {
  return (
    <CrossroadsLayout>
      <CardsWrapper>
        <Link to={paths.treeView}>
          <StyledCard>
            <CardTitle>Tree view</CardTitle>
            <CardBody>
              <Bullseye>
                <TreeIcon size="xl" />
              </Bullseye>
            </CardBody>
          </StyledCard>
        </Link>
        <Link to={paths.topologyView}>
          <StyledCard>
            <CardTitle>Topology view</CardTitle>
            <CardBody>
              <Bullseye>
                <TopologyIcon size="xl" />
              </Bullseye>
            </CardBody>
          </StyledCard>
        </Link>
      </CardsWrapper>
    </CrossroadsLayout>
  );
};

export default Crossroads;
