import React from 'react';
import { Drawer, DrawerContent, DrawerContentBody } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import PanelContent from './drawer-panel-content';

const DetailDrawer = ({ open, data: { type, entityType, ...node }, setOpen, children }) => (
  <Drawer isExpanded={open}>
    <DrawerContent
      panelContent={<PanelContent setOpen={setOpen} type={type} entityType={entityType} {...node} node={node} />}
    >
      <DrawerContentBody>{children}</DrawerContentBody>
    </DrawerContent>
  </Drawer>
);

DetailDrawer.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.shape({
    type: PropTypes.string,
    entityType: PropTypes.string,
  }),
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

export default DetailDrawer;
