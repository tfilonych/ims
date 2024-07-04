import React from 'react';
import AddCard from '@mui/icons-material/AddCard';

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
      <AddCard onClick={clickHandler} />
    </div>
  );
};

export default EditToolbar;
