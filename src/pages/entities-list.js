import React, { useState, useEffect } from 'react';

const EntitiesList = () => {
  const [ data, setData ] = useState([]);
  useEffect(() => {
    console.log(data, setData);
  }, []);
  return (
    <div>
      There will be dragons
    </div>
  );
};

export default EntitiesList;
