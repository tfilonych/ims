import React from 'react';
import AddCard from '@mui/icons-material/AddCard';

const EditToolbar = ({ setRows, setEditingRowId, setEditRowData, rowKey }) => {
  const clickHandler = () => {
    const id = Date.now().toString();
    const newRow = { [rowKey]: id, name: '', category: '', price: '', quantity: '', isNew: true };

    setRows((oldRows) => [...oldRows, newRow]);
    setEditingRowId(id);
    setEditRowData(newRow);
  };

  return (
    <div className="toolbar-container">
      <AddCard onClick={clickHandler} />
    </div>
  );
};

export default EditToolbar;
