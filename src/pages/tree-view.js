import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tree from '../components/tree';
import {
  getSources,
  getServiceOfferingNodes,
  getServiceInstanceNodes,
  getServiceInventories,
  getServiceInstance,
  getServicePlans,
  getServiceOfferings,
} from '../api/ansible-tower';
import { UPDATE_NODE, SET_DATA } from '../store/action-types/sources-action-types';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import CardLoader from '../components/loaders/card-loader';
import { paths } from '../routes';

function createNodeData(node, type) {
  if (!node) {
    return;
  }

  const copy = {};
  if (node.subCollections) {
    node.subCollections.forEach((collection) => {
      copy.children = [
        ...(copy.children || []),
        {
          id: `sub-collection-${collection.type}`,
          title: collection.type,
          children: collection.data.data.map((child) => createNodeData(child, collection.type)),
        },
      ];
    });
  }

  return {
    ...copy,
    id: node.id,
    title: node.name || node.id,
    ...(type && { type }),
    ...(node.entityType && { type: node.entityType }),
    nodeData: node,
  };
}

function createTreeData(sources) {
  if (!sources?.data) {
    return;
  }

  return sources.data.map((source) => createNodeData(source));
}

const TreeView = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const structure = useSelector(({ sourcesReducer }) => sourcesReducer);

  useEffect(() => {
    if (!structure?.data || structure?.data?.length === 0) {
      setLoading(true);
      getSources()
        .then((data) => {
          dispatch({
            type: SET_DATA,
            payload: { ...data, data: data.data.map((d) => ({ ...d, entityType: 'sources' })) },
          });
          return data.data;
        })
        .then((sources) => {
          const promises = sources.map(({ id }) => {
            const subCollections = [
              getServiceOfferings(id).then((data) =>
                dispatch({ type: UPDATE_NODE, id, subCollections: { type: 'service-offerings', data } })
              ),
              getServicePlans(id).then((data) =>
                dispatch({ type: UPDATE_NODE, id, subCollections: { type: 'service-plans', data } })
              ),
              getServiceInstance(id).then((data) =>
                dispatch({ type: UPDATE_NODE, id, subCollections: { type: 'service-instances', data } })
              ),
              getServiceInventories(id).then((data) =>
                dispatch({ type: UPDATE_NODE, id, subCollections: { type: 'service-inventories', data } })
              ),
              getServiceInstanceNodes(id).then((data) =>
                dispatch({ type: UPDATE_NODE, id, subCollections: { type: 'service-instance-nodes', data } })
              ),
              getServiceOfferingNodes(id).then((data) =>
                dispatch({ type: UPDATE_NODE, id, subCollections: { type: 'service-offering-nodes', data } })
              ),
            ];
            return Promise.all(subCollections).then(() => setLoading(false));
          });
          return Promise.all(promises);
        });
    }
  }, []);
  if (loading) {
    return <CardLoader />;
  }

  const treeData = createTreeData(structure);
  return (
    <Card>
      <CardTitle>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={paths.index}>Topology Inventory</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Tree view</BreadcrumbItem>
        </Breadcrumb>
      </CardTitle>
      <CardBody>
        <Tree
          data={treeData}
          render={({ title, id, type }) =>
            type ? (
              <Link
                to={{
                  pathname: '/entity',
                  search: `?id=${id}&type=${type}`,
                }}
              >
                {title}
              </Link>
            ) : (
              <div>{title}</div>
            )
          }
        />
      </CardBody>
    </Card>
  );
};

export default TreeView;
