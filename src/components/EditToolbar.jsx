import React from 'react';
import AddCard from '@mui/icons-material/AddCard';
import AddIcon from '@mui/icons-material/Add';

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
      <AddIcon onClick={clickHandler} />
    </div>
  );
};

export default EditToolbar;
