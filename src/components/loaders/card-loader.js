import React from 'react';
import { Bullseye, Card, CardBody, Spinner } from '@patternfly/react-core';

const CardLoader = () => (
  <Card>
    <CardBody>
      <CardBody>
        <Bullseye>
          <Spinner size="lg" />
        </Bullseye>
      </CardBody>
    </CardBody>
  </Card>
);

export default CardLoader;
