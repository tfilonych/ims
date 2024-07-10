import { useState, useEffect } from 'react';
import ActionCell from './ActionCell.jsx';
import EditToolbar from './EditToolbar.jsx';
import AddToCartModal from './AddToCardModal.jsx';
import { getCategoryNameById } from '../utils.js';
import ActionHandlers from './ActionHandlers.jsx';

const GridTable = ({
  initialRows,
  columns,
  rowKey,
  categories,
  allowedActions,
  children,
  collection,
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

  const findCurrentRow = (id) => {
    return rows.find((row) => row[rowKey] === id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setQuantity(1);
  };

  const handleInputChange = (field) => (value) => {
    setEditRowData({
      ...editRowData,
      [field]: value,
    });
  };

  const extendedColumns = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => {
        const id = params.row[rowKey];
        return (
          <ActionHandlers
            findCurrentRow={findCurrentRow}
            setEditingRowId={setEditingRowId}
            setEditRowData={setEditRowData}
            editRowData={editRowData}
            collection={collection}
            rows={rows}
            rowKey={rowKey}
            setRows={setRows}
          >
            {(props) => (
              <ActionCell
                id={id}
                isInEditMode={editingRowId === id}
                allowedActions={allowedActions}
                {...props}
              />
            )}
          </ActionHandlers>
        );
      },
    },
  ];

  return (
    <div className="grid-table">
      {allowedActions?.create && (
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
                        required
                      />
                    ) : col.field === 'category' ? (
                      getCategoryNameById(row[col.field], categories)
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
    </div>
  );
};

export default GridTable;
