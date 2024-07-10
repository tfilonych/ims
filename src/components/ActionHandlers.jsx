import { useState } from 'react';
import { updateItem, createItem, deleteItem } from './../http';
import { isNewWithoutData } from '../utils';

const ActionHandlers = ({
  children,
  findCurrentRow,
  setEditingRowId,
  setEditRowData,
  editRowData,
  collection,
  rowKey,
  rows,
  setRows
}) => {
  const editHandler = (id) => {
    const row = findCurrentRow(id);
    setEditingRowId(id);
    setEditRowData(row);
  };

  const saveHandler = async (id) => {
    if (isNewWithoutData(editRowData)) {
      setRows(
        rows.filter(
          (row) => !(row.isNew && row[rowKey] === editRowData[rowKey])
        )
      );
      setEditingRowId(null);
      return;
    }

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
    if (isNewWithoutData(editRowData)) {
      setRows(
        rows.filter(
          (row) => !(row.isNew && row[rowKey] === editRowData[rowKey])
        )
      );
    }
    setEditingRowId(null);
  };

  const deleteHandler = async (id) => {
    await deleteItem(collection, id);
    setRows(rows.filter((row) => row[rowKey] !== id));
  };

  const purchaseHandler = (id) => {
    const row = findCurrentRow(id);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return children({
    editHandler,
    saveHandler,
    cancelHandler,
    deleteHandler,
    purchaseHandler,
  });
};

export default ActionHandlers;
