import React, { useState, useEffect } from 'react';

import { Card, CardTitle, CardBody, TextContent, TextListItem, TextListItemVariants, TextListVariants, TextList } from '@patternfly/react-core';

import {
  getSource,
  getServiceOfferingNode,
  getServiceInstanceNode,
  getServiceInventorie,
  getServiceInstanc,
  getServicePlan,
  getServiceOffering,
} from '../api/ansible-tower';

const apiMapper = {
  sources: getSource,
  'service-offering-nodes': getServiceOfferingNode,
  'service-instance-nodes': getServiceInstanceNode,
  'service-inventories': getServiceInventorie,
  'service-instances': getServiceInstanc,
  'service-plans': getServicePlan,
  'service-offerings': getServiceOffering,
};

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
    return '...loading';
  }

  return (
    <Card>
      <CardTitle>
        {type} -- {id}
      </CardTitle>
      <CardBody>
        <TextContent>
          <TextList component={TextListVariants.dl}>
            {Object.keys(data).map((key) => (
              <React.Fragment key={key}>
                <TextListItem component={TextListItemVariants.dt}>{key}</TextListItem>
                <TextListItem component={TextListItemVariants.dd}>
                  {typeof data[key] === 'string' ? data[key] : <pre>{JSON.stringify(data[key], null, 2)}</pre>}
                </TextListItem>
              </React.Fragment>
            ))}
          </TextList>
        </TextContent>
      </CardBody>
    </Card>
  );
};

export default EntityDetail;
