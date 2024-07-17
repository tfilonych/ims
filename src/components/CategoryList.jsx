import GridTable from './GridTable';

const CategoryList = ({ categories }) => {
  const columns = [
    { field: 'name', headerName: 'Category', width: 180, editable: true },
  ];
  const allowedActions = {
    create: true,
    edit: true,
    remove: true
  };

  return (
    <GridTable
      initialRows={categories}
      columns={columns}
      collection="categories"
      allowedActions={allowedActions}
    />
  );
};

export default CategoryList;
