import React from 'react';

// eslint-disable-next-line react/prop-types
const EditToolbar = ({ setRows }) => {
  const clickHandler = () => {
    const id = Date.now().toString();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', category: '', price: '', quantity: '', isNew: true },
    ]);
  };

  return (
    <div className="toolbar-container">
      <button onClick={clickHandler}>Add</button>
    </div>
  );
};

export default EditToolbar;
