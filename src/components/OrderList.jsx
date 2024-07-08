import React, { useState, useEffect } from 'react';
import GridTable from './GridTable.jsx';

const OrderList = ({ orders }) => {
  const columns = [
    { field: 'number', headerName: 'Number', width: 180, editable: false },
    { field: 'customer', headerName: 'Customer', width: 120, editable: false },
    { field: 'date', headerName: 'Date', width: 120, editable: true },
    { field: 'total', headerName: 'Total', width: 120, editable: false },
  ];

  return (
    <GridTable
      initialRows={orders}
      columns={columns}
      rowKey="id"
      collection="orders"
    />
  );
};

export default OrderList;
