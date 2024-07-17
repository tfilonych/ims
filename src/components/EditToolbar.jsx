import React from 'react';
import AddCard from '@mui/icons-material/AddCard';
import AddIcon from '@mui/icons-material/Add';

const EditToolbar = ({ setRows, setEditingRowId, setEditRowData }) => {
  const clickHandler = () => {
    setRows((oldRows) => (Array.isArray(oldRows) ? [...oldRows, {}] : {}));
    setEditRowData({});
  };

  return (
    <div className="toolbar-container">
      <AddIcon onClick={clickHandler} />
    </div>
  );
};

export default EditToolbar;
