import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactJsonView from 'react-json-view';

import {
  Card,
  CardTitle,
  CardBody,
  TextContent,
  TextListVariants,
  TextList,
  BreadcrumbItem,
  Breadcrumb,
  Spinner,
  Bullseye,
} from '@patternfly/react-core';

import {
  getSource,
  getServiceOfferingNode,
  getServiceInstanceNode,
  getServiceInventorie,
  getServiceInstanc,
  getServicePlan,
  getServiceOffering,
} from '../api/ansible-tower';
import styled from 'styled-components';
import { paths } from '../routes';

const apiMapper = {
  sources: getSource,
  'service-offering-nodes': getServiceOfferingNode,
  'service-instance-nodes': getServiceInstanceNode,
  'service-inventories': getServiceInventorie,
  'service-instances': getServiceInstanc,
  'service-plans': getServicePlan,
  'service-offerings': getServiceOffering,
};

const StyledCard = styled(Card)`
  min-height: 100%;
`;

const EntityDetail = () => {
  const [data, setData] = useState(null);

  const params = new URL(document.location).searchParams;
  const id = params.get('id');
  const type = params.get('type');

  useEffect(() => {
    apiMapper[type](id).then((data) => {
      setData(data);
    });
  }, []);

  if (!data) {
    return (
      <Card>
        <CardTitle>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to={paths.index}>Topology Inventory</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={paths.treeView}>Tree view</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>...</BreadcrumbItem>
            <BreadcrumbItem>{type}</BreadcrumbItem>
            <BreadcrumbItem to="#" isActive>
              {id}
            </BreadcrumbItem>
          </Breadcrumb>
        </CardTitle>
        <CardBody>
          <Bullseye>
            <Spinner size="lg" />
          </Bullseye>
        </CardBody>
      </Card>
    );
  }

  return (
    <StyledCard>
      <CardTitle>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={paths.index}>Topology Inventory</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={paths.treeView}>Tree view</Link>
          </BreadcrumbItem>
          {data.source_id && <BreadcrumbItem>{data.source_id}</BreadcrumbItem>}
          <BreadcrumbItem>{type}</BreadcrumbItem>
          <BreadcrumbItem to="#" isActive>
            {id}
          </BreadcrumbItem>
        </Breadcrumb>
      </CardTitle>
      <CardBody>
        <TextContent>
          <TextList component={TextListVariants.dl}>
            <ReactJsonView src={data} />
          </TextList>
        </TextContent>
      </CardBody>
    </StyledCard>
  );
};

export default EntityDetail;
