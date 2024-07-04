import { useEffect, useState } from 'react';
import GridTable from './GridTable.jsx';
import { category, initialRows } from '../data';

const ProductList = ({ products }) => {
  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'category',
      headerName: 'Category',
      type: 'singleSelect',
      valueOptions: category,
      width: 180,
      editable: true,
    },
    { field: 'price', headerName: 'Price', width: 120, editable: true },
    { field: 'quantity', headerName: 'Quantity', width: 120, editable: true },
  ];

  return (
    <div className="product-list">
      {products.length > 0 ? (
        <GridTable
          initialRows={products}
          columns={columns}
          rowKey="id"
          withPurchase={true}
        />
      ) : (
        <div>There are no products available</div>
      )}
    </div>
  );
};

export default ProductList;
