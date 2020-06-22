import React, { useEffect, useReducer } from 'react';
import TopologyViewer from '@data-driven-forms/topology-viewer';

const Icons = {
  info: '',
};

import { loadFullStructure } from '../api/topology-viewer-api';

const reducer = (state, { type, payload }) => {
  const states = {
    setEdges: (data) => ({ ...state, edges: data }),
    setNodes: (data) => ({ ...state, nodes: data }),
    setData: (data) => ({ ...state, ...data }),
    updateGraph: (data) => ({ ...state, nodes: [...state.nodes, ...data.nodes], edges: [...state.edges, ...data.edges] }),
    markNode: (data) => ({ ...state, nodes: state.nodes.map((node) => (node.id === data.id ? { ...data } : node)) }),
  };
  return states[type](payload);
};

const initialState = {
  nodes: [],
  edges: [],
};

const buildNodes = (childKeys = [], data, level = 0) => {
  const keys = [...childKeys];
  let newData = { ...data };
  let result = [];
  let currentKey = keys.shift();
  console.log('data: ', data);
  newData[keys[0]] = [];
  if (currentKey) {
    result = data[currentKey].map((item) => {
      if (keys[0]) {
        newData[keys[0]] = [
          ...newData[keys[0]],
          ...item[keys[0]].map((subItem) => ({
            ...subItem,
            parentId: `${currentKey}-${item.id}`,
            parentKey: currentKey,
            level,
            group: item.id,
          })),
        ];
      }

      return {
        id: `${currentKey}-${item.id}`,
        originalId: item.id,
        children: item[keys[0]] && item[keys[0]].length > 0 ? item[keys[0]].length : undefined,
        nodeType: currentKey,
        childKey: keys[0],
        title: item.name || `${currentKey}-${item.id}`,
        parentKey: item.parentKey,
        parentId: item.parentId,
        level: item.level,
        group: item.group,
      };
    });
    return buildNodes(keys, { ...newData, [currentKey]: result }, level + 1);
  } else {
    return data;
  }
};

const TopologyView = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    loadFullStructure()
      .then((data) => buildNodes(['sources', 'source_regions', 'networks', 'subnets', 'network_adapters'], data))
      .then((structure) => {
        dispatch({ type: 'setData', payload: { structure, nodes: [...structure.sources] } });
      });
  }, []);

  const findAllChildren = (nodeIds, edges = []) => {
    let allEdges = [...edges];
    let newIds = [];
    nodeIds.forEach((id) => {
      allEdges.push(
        ...state.edges.filter(({ source, target }) => {
          if (source === id) {
            newIds.push(target);
          }

          return source === id;
        })
      );
    });
    if (newIds.length > 0) {
      return findAllChildren(newIds, allEdges);
    }

    return allEdges;
  };

  const handleNodeClick = (node) => {
    console.log(node);
    dispatch({ type: 'markNode', payload: { ...node, wasClicked: true } });
    if (!node.wasClicked && node.children !== undefined) {
      const nodes = [
        ...state.nodes.map((item) => ({
          ...item,
          wasClicked: item.wasClicked ? true : node.id === item.id,
          children: item.id === node.id ? undefined : item.children,
        })),
        ...state.structure[node.childKey]
          .filter(({ parentId }) => node.id === parentId)
          .map((item) => ({
            mainGroup: node.mainGroup || node.originalId,
            ...item,
          })),
      ];
      const edges = [
        ...state.edges,
        ...state.structure[node.childKey]
          .filter(({ parentId }) => node.id === parentId)
          .map(({ id }) => ({
            source: node.id,
            target: id,
            id: `${node.id}-${id}`,
          })),
      ];
      dispatch({ type: 'setData', payload: { nodes, edges } });
    } else if (node.wasClicked) {
      const originalNode = state.structure[node.nodeType].find((item) => node.id === item.id);
      const obsoleteEdges = findAllChildren([node.id]);
      const nodes = state.nodes
        .filter((item) => !obsoleteEdges.find(({ target }) => target === item.id))
        .map((item) => (item.id === originalNode.id ? originalNode : item));
      const edges = state.edges.filter((edge) => !obsoleteEdges.find(({ id }) => id === edge.id));
      dispatch({ type: 'setData', payload: { nodes, edges } });
    }
  };

  const iconMapper = {
    vm: Icons.memory,
    sources: Icons.info,
    source_regions: Icons.info,
    networks: Icons.info,
    subnets: Icons.info,
    network_adapters: Icons.info,
  };
  return <TopologyViewer handleNodeClick={handleNodeClick} edges={state.edges} nodes={state.nodes} iconMapper={iconMapper} />;
};

export default TopologyView;
