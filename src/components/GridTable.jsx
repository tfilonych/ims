import { useState, useEffect } from 'react';
import ActionCell from './ActionCell.jsx';
import EditToolbar from './EditToolbar.jsx';
import { updateItem, createItem, deleteItem } from '../http';
import AddToCartModal from './AddToCardModal.jsx';

const GridTable = ({
  initialRows,
  columns,
  allowedActions,
  collection,
  children = null,
}) => {
  const [rows, setRows] = useState(initialRows);
  const [editRowData, setEditRowData] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditRowData((prev) => ({ ...prev, [name]: value }));
  };

  const editHandler = (id) => {
    const row = rows.find((row) => row.id === id);
    setEditRowData(row);
  };

  const saveHandler = async (id) => {
    if (!id && !Object.keys(editRowData).length) {
      return cancelHandler();
    }

    try {
      const item = await saveItem(id, collection, editRowData);
      updateRows(item, id);
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setEditRowData(null);
    }
  };

  const saveItem = async (id, collection, data) => {
    return id
      ? await updateItem(collection, data)
      : await createItem(collection, data);
  };

  const updateRows = (item, id) => {
    setRows((prev) => {
      if (id) {
        return prev.map((el) => (el.id === id ? { ...el, ...item } : el));
      } else {
        return [...prev.filter((el) => el.id), item];
      }
    });
  };

  const cancelHandler = () => {
    setRows((prev) => prev.filter((row) => row.id));
    setEditRowData(null);
  };

  const removeHandler = async (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    await deleteItem(collection, id);
  };

  const purchaseHandler = (id) => {
    const row = rows.find((row) => row.id === id);
    setEditRowData(row);
    setModal(true);
  };

  const renderCell = (row, col) => {
    const isInEditMode = editRowData?.id === row?.id;
    const value = isInEditMode ? editRowData[col.field] : row[col.field] || '';

    if (col.field === 'actions') {
      return col.renderCell({ row }, isInEditMode);
    }

    if (isInEditMode && col.editable) {
      return (
        <input
          value={value}
          onChange={handleInputChange}
          name={col.field}
          required
        />
      );
    }
    // Ensure we're returning a string or a valid React element
    return typeof row[col.field] === 'object'
      ? JSON.stringify(row[col.field])
      : String(row[col.field]);
  };

  const extendedColumns = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }, isInEditMode) => (
        <ActionCell
          id={row?.id}
          isInEditMode={isInEditMode}
          allowedActions={allowedActions}
          editHandler={editHandler}
          purchaseHandler={purchaseHandler}
          cancelHandler={cancelHandler}
          removeHandler={removeHandler}
          saveHandler={saveHandler}
        />
      ),
    },
  ];

  return (
    <div className="grid-table">
      {allowedActions?.create && (
        <EditToolbar setRows={setRows} setEditRowData={setEditRowData} />
      )}
      <div className="table-header-container">
        {extendedColumns.map((col, id) => (
          <div className="table-header" data-label={col.field} key={col.field}>
            {col.headerName}
          </div>
        ))}
        {children && <div className="table-header">category</div>}
      </div>
      <div className="grid-table-body">
        {rows.length > 0 ? (
          rows.map((row) => (
            <div key={row.id} className="grid-table-row">
              {extendedColumns.map((col, id) => (
                <div
                  key={col.field}
                  className="grid-table-cell"
                  data-label={col.field}
                >
                  {renderCell(row, col)}
                </div>
              ))}
              {children && children({
                row,
                editRowData,
              })}
            </div>
          ))
        ) : (
          <div className="grid-table-row">
            <div className="grid-table-cell" style={{ flex: '1 0 100%' }}>
              There are no items. Please add some.
            </div>
          </div>
        )}
      </div>
      {modal && (
        <AddToCartModal editRowData={editRowData} openModal={setModal} />
      )}
    </div>
  );
};

export default GridTable;
