import React, { useState, useEffect } from 'react';
import EditToolbar from './EditToolbar';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddToCartModal from './AddToCartModal';
import { updateItem, createItem, deleteItem } from './../http';

const GridTable = ({
  initialRows,
  columns,
  rowKey,
  withPurchase = true,
  collection,
  children,
  categories,
}) => {
  const [rows, setRows] = useState(initialRows);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const startEditHandler = (id) => () => {
    const row = rows.find((row) => row[rowKey] === id);
    setEditingRowId(id);
    setEditRowData(row);
  };

  const saveHandler = (id) => async () => {
    let updatedRow;
    if (editRowData.isNew) {
      delete editRowData.isNew;
      updatedRow = await createItem(collection, editRowData);
    } else {
      updatedRow = await updateItem(collection, id, editRowData);
    }

    const updatedRows = rows.map((row) =>
      row[rowKey] === id ? updatedRow : row
    );

    setRows(updatedRows);
    setEditingRowId(null);
  };

  const cancelHandler = () => {
    setEditingRowId(null);
  };

  const deleteHandler = (id) => async () => {
    await deleteItem(collection, id);
    setRows(rows.filter((row) => row[rowKey] !== id));
  };

  const handleInputChange = (field) => (value) => {
    setEditRowData({
      ...editRowData,
      [field]: value,
    });
  };

  const addToCartHandler = (id) => () => {
    const product = rows.find((row) => row[rowKey] === id);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setQuantity(1);
  };

  const getCategoryNameById = (id) => {
    const category = categories.find((category) => category.id === id);
    return category ? category.name : id;
  };

  const extendedColumns = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => {
        const id = params.row[rowKey];
        const isInEditMode = editingRowId === id;

        if (isInEditMode) {
          return (
            <>
              <SaveIcon onClick={saveHandler(id)} />
              <CancelIcon onClick={cancelHandler} />
            </>
          );
        }

        return (
          <>
            <EditIcon onClick={startEditHandler(id)} />
            <DeleteIcon onClick={deleteHandler(id)} />
            {withPurchase && (
              <AddShoppingCartIcon onClick={addToCartHandler(id)} />
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="grid-table">
      {withPurchase && (
        <EditToolbar
          setRows={setRows}
          setEditingRowId={setEditingRowId}
          setEditRowData={setEditRowData}
          rowKey={rowKey}
        />
      )}
      <table>
        <thead>
          <tr>
            {extendedColumns.map((col) => (
              <th key={col.field}>{col.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <tr key={row[rowKey]}>
                {extendedColumns.map((col) => (
                  <td key={col.field} data-label={col.headerName}>
                    {col.field === 'actions' ? (
                      col.renderCell({ row })
                    ) : editingRowId === row[rowKey] &&
                      col.field === 'category' ? (
                      children({
                        value: editRowData[col.field] || '',
                        onChange: handleInputChange(col.field),
                      })
                    ) : editingRowId === row[rowKey] && col.editable ? (
                      <input
                        value={editRowData[col.field] || ''}
                        onChange={(e) =>
                          handleInputChange(col.field)(e.target.value)
                        }
                      />
                    ) : col.field === 'category' ? (
                      getCategoryNameById(row[col.field])
                    ) : (
                      row[col.field]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={extendedColumns.length}>
                There are no items. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <AddToCartModal
        open={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </div>
  );
};

export default GridTable;
