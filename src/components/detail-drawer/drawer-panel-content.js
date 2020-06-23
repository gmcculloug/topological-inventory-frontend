import React from 'react';
import PropTypes from 'prop-types';
import ReactJsonView from 'react-json-view';
import { DrawerPanelContent, DrawerHead, DrawerActions, DrawerCloseButton } from '@patternfly/react-core';

const PanelContent = ({ setOpen, type, entityType, name, id, node }) => {
  return (
    <DrawerPanelContent>
      <DrawerHead>
        {`${type || entityType} ${name || id}`}
        <ReactJsonView src={node} />
        <DrawerActions>
          <DrawerCloseButton onClick={() => setOpen(false)} />
        </DrawerActions>
      </DrawerHead>
    </DrawerPanelContent>
  );
};

PanelContent.propTypes = {
  setOpen: PropTypes.func.isRequired,
  type: PropTypes.node,
  entityType: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  node: PropTypes.object,
};

export default PanelContent;
