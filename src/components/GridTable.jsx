import { useState } from 'react';
import EditToolbar from './EditToolbar';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddToCartModal from './AddToCartModal';

const GridTable = ({ initialRows, columns, rowKey, withPurchase = false }) => {
  const [rows, setRows] = useState(initialRows);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const startEditHandler = (id) => () => {
    const row = rows.find((row) => row[rowKey] === id);
    setEditingRowId(id);
    setEditRowData(row);
  };

  const saveHandler = (id) => () => {
    const updatedRows = rows.map((row) =>
      row[rowKey] === id ? editRowData : row
    );
    setRows(updatedRows);
    setEditingRowId(null);
  };

  const cancelHandler = () => {
    setEditingRowId(null);
  };

  const deleteHandler = (id) => () => {
    setRows(rows.filter((row) => row[rowKey] !== id));
  };

  const handleInputChange = (field) => (event) => {
    setEditRowData({ ...editRowData, [field]: event.target.value });
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

  const extendedColumns = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      getActions: ({ id }) => {
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
      {withPurchase && <EditToolbar setRows={setRows} />}
      <table>
        <thead>
          <tr>
            {extendedColumns.map((col) => (
              <th key={col.field}>{col.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowKey]}>
              {extendedColumns.map((col) => (
                <td key={col.field} data-label={col.headerName}>
                  {col.field === 'actions' ? (
                    col.getActions({ id: row[rowKey] })
                  ) : editingRowId === row[rowKey] ? (
                    <input
                      type="text"
                      value={editRowData[col.field] || ''}
                      onChange={handleInputChange(col.field)}
                    />
                  ) : (
                    row[col.field]
                  )}
                </td>
              ))}
            </tr>
          ))}
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
