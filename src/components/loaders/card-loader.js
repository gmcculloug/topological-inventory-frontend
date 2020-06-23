import React from 'react';
import { Bullseye, Card, CardBody, Spinner } from '@patternfly/react-core';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  height: 100%;
`;

const CardLoader = () => (
  <StyledCard>
    <CardBody>
      <Bullseye>
        <Spinner size="xl" />
      </Bullseye>
    </CardBody>
  </StyledCard>
);

export default CardLoader;
