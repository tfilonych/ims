import { useEffect, useState } from 'react';
import GridTable from './GridTable.jsx';
import { category, initialRows } from '../data';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(initialRows);
    console.log('products are ', products);
  }, []);

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
      <GridTable
        initialRows={initialRows}
        columns={columns}
        rowKey="id"
        withPurchase={true}
      />
    </div>
  );
};

export default ProductList;
