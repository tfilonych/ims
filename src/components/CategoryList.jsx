import GridTableWrapper from './GridTableWrapper';

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
    <GridTableWrapper
      initialRows={categories}
      columns={columns}
      collection="categories"
      rowKey="id"
      allowedActions={allowedActions}
    />
  );
};

export default CategoryList;
