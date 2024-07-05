import React, { useState, useEffect } from 'react';
import GridTable from './GridTable.jsx';

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

    // Transforming storedOrders into the desired format
    const transformedOrders = storedOrders.map((order) => ({
      name: order.product.name,
      price: order.product.price,
      quantity: order.quantity,
      total: order.product.price * order.quantity,
    }));

    setOrderList(transformedOrders);
  }, []);

  const columns = [
    { field: 'name', headerName: 'Product', width: 180, editable: false },
    { field: 'price', headerName: 'Price', width: 120, editable: false },
    { field: 'quantity', headerName: 'Quantity', width: 120, editable: true },
    { field: 'total', headerName: 'Total', width: 120, editable: false },
  ];
  //   const columns2 = [
  //     { field: 'id', headerName: 'Order Number', width: 150 },
  //     { field: 'customerName', headerName: 'Customer Name', width: 180 },
  //     { field: 'orderDate', headerName: 'Order Date', width: 180 },
  //     { field: 'totalCost', headerName: 'Total Cost', width: 150 },
  //   ];

  return (
    <div>
      {orderList.length > 0 ? (
        <GridTable initialRows={orderList} columns={columns} rowKey="_id" />
      ) : (
        <div>There are no orders available</div>
      )}
    </div>
  );
};

export default OrderList;
