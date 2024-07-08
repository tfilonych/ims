import GridTable from './GridTable';

const CategoryList = ({ categories }) => {
  const columns = [
    { field: 'name', headerName: 'Category', width: 180, editable: true },
  ];

  return (
    <GridTable
      initialRows={categories}
      columns={columns}
      collection="categories"
      rowKey="id"
    />
  );
};

export default CategoryList;
