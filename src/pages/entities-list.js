import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_TITLE } from '../store/action-types/top-toolbar-actions';

const EntitiesList = () => {
  const [ data, setData ] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(data, setData);
    dispatch({ type: SET_TITLE, payload: 'Inventory' });
  }, []);
  return (
    <div>
      There will be dragons
    </div>
  );
};

export default EntitiesList;
