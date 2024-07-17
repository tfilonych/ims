import { useState } from 'react';
import { updateItem, createItem, deleteItem } from './../http';
import { isNewWithoutData } from '../utils';

const ActionHandlers = ({
  children,
  setEditingRowId,
  setEditRowData,
  editRowData,
  collection,
  rowKey,
  rows,
  setRows,
  openModal,
}) => {
  const edit = (id) => {
    debugger;
    setEditRowData(id)
    // const rxow = rows.find((row) => row[rowKey] === id);
    // setEditingRowId(id);
    // setEditRowData(row);
  };

  const save = async (id) => {
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

  const cancel = () => {
    if (isNewWithoutData(editRowData)) {
      setRows(
        rows.filter(
          (row) => !(row.isNew && row[rowKey] === editRowData[rowKey])
        )
      );
    }
    setEditingRowId(null);
  };

  const remove = async (id) => {
    // setRows(rows.filter((row) => row[rowKey] !== id));
    await deleteItem(collection, id);
  };

  const purchase = (id) => {
    const row = rows.find((row) => row[rowKey] === id);
    setEditRowData(row);
    openModal(true);
    //setIsModalOpen(true);
  };

  return children({
    edit,
    save,
    cancel,
    remove,
    purchase,
  });
};

export default ActionHandlers;
