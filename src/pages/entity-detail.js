import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { SET_TITLE } from '../store/action-types/top-toolbar-actions';

const EntityDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const entity = params.get('entity');
  const id = params.get('id');

  useEffect(() => {
    dispatch({ type: SET_TITLE, payload: `Entity type: ${entity} #${id}` });
  }, [ location.search ]);
  return (
    <div>
      <h1>Entity type: { entity }</h1>
      <h1>Entity has ID: { id }</h1>
    </div>
  );
};

export default EntityDetail;
