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

function createNodeData(node) {
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
          children: collection.data.data.map((child) => createNodeData(child)),
        },
      ];
    });
  }

  return {
    ...copy,
    id: node.id,
    title: node.name || node.id,
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
    setLoading(true);
    getSources()
      .then((data) => {
        dispatch({ type: SET_DATA, payload: data });
        return data.data;
      })
      .then((sources) => {
        const promises = sources.map(({ id }) => {
          const subCollections = [
            getServiceOfferings(id).then((data) => dispatch({ type: UPDATE_NODE, id, subCollections: { type: 'service-offerings', data } })),
            getServicePlans(id).then((data) => dispatch({ type: UPDATE_NODE, id, subCollections: { type: 'service-plans', data } })),
            getServiceInstance(id).then((data) => dispatch({ type: UPDATE_NODE, id, subCollections: { type: 'service-instances', data } })),
            getServiceInventories(id).then((data) => dispatch({ type: UPDATE_NODE, id, subCollections: { type: 'service-inventories', data } })),
            getServiceInstanceNodes(id).then((data) => dispatch({ type: UPDATE_NODE, id, subCollections: { type: 'service-instance-nodes', data } })),
            getServiceOfferingNodes(id).then((data) => dispatch({ type: UPDATE_NODE, id, subCollections: { type: 'service-offering-nodes', data } })),
          ];
          return Promise.all(subCollections).then(() => setLoading(false));
        });
        return Promise.all(promises);
      });
  }, []);
  if (loading) {
    return <div>Loading</div>;
  }

  const treeData = createTreeData(structure);
  return (
    <div>
      <Tree data={treeData} render={({ title }) => <a>{title}</a>} />
    </div>
  );
};

export default TreeView;
