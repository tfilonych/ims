import { useEffect, useState } from 'react';
import GridTable from './GridTable';

const CategoryList = ({ categories }) => {
  const [categoryList, setCategories] = useState([]);
  const columns = [
    { field: 'name', headerName: 'Category', width: 180, editable: true },
  ];

  return (
    <GridTable
      initialRows={categories}
      columns={columns}
      collection="categories"
      rowKey="_id"
    />
  );
};

export default CategoryList;
