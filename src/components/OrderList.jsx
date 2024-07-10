import React, { useState, useEffect } from 'react';
import GridTableWrapper from './GridTableWrapper.jsx';

const OrderList = ({ orders }) => {
  const columns = [
    { field: 'number', headerName: 'Number', width: 180, editable: false },
    { field: 'customer', headerName: 'Customer', width: 120, editable: false },
    { field: 'date', headerName: 'Date', width: 120, editable: false },
    { field: 'total', headerName: 'Total', width: 120, editable: false },
  ];
  const allowedActions = {
    remove: true,
  };

  return (
    <GridTableWrapper
      initialRows={orders}
      columns={columns}
      rowKey="id"
      collection="orders"
      allowedActions={allowedActions}
    />
  );
};

export default OrderList;
