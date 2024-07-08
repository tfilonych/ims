import React from 'react';
import AddCard from '@mui/icons-material/AddCard';

const EditToolbar = ({ setRows, setEditingRowId, setEditRowData, rowKey }) => {
  const clickHandler = () => {
    const id = Date.now().toString();
    const newRow = { [rowKey]: id, isNew: true };

    setRows((oldRows) =>
      Array.isArray(oldRows) ? [...oldRows, newRow] : [newRow]
    );
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
