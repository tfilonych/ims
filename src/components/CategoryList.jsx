import { useEffect, useState } from 'react';
import GridTable from './GridTable';
// import axios from 'axios';
import { categories } from '../data.js';

const CategoryList = () => {
  const [categoryList, setCategories] = useState([]);

  useEffect(() => {
    setCategories(categories)
    // axios.get('/api/categories')
    //   .then(response => setCategories(response.data))
    //   .catch(error => console.error(error));
  }, []);

  const columns = [
    { field: 'name', headerName: 'Category', width: 180, editable: true },
  ];

  return <GridTable
    initialRows={categories}
    columns={columns}
    rowKey="id"
  />;
};

export default CategoryList;
