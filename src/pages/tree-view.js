import React from 'react';
import Tree from '../components/tree';

const dummyData = [
  {
    title: 'Root 1',
    id: '1',
    children: [
      {
        title: 'Sub node 1',
        id: '1-1',
      },
      {
        title: 'Sub node 2',
        id: '1-2',
        children: [
          {
            title: 'Sub node 2-1',
            id: '2-1-1',
          },
          {
            title: 'Sub node 2-2',
            id: '2-1-2',
          },
          {
            title: 'Sub node 2-3',
            id: '2-1-3',
          },
          {
            title: 'Sub node 2-4',
            id: '2-1-4',
          },
        ],
      },
      {
        title: 'Sub node 3',
        id: '1-3',
      },
      {
        title: 'Sub node 4',
        id: '1-4',
      },
    ],
  },
];

const TreeView = () => {
  return (
    <div>
      <Tree data={dummyData} />
    </div>
  );
};

export default TreeView;
