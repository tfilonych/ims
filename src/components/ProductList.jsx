import GridTable from './GridTable';
import DataLoader from './DataLoader';
import CategoryInput from './CategoryInput';

const ProductList = ({ products }) => {
  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'category',
      headerName: 'Category',
      type: 'singleSelect',
      valueOptions: [],
      width: 180,
      editable: true,
    },
    { field: 'price', headerName: 'Price', width: 120, editable: true },
    { field: 'quantity', headerName: 'Quantity', width: 120, editable: true },
  ];
  const allowedActions = {
    create: true,
    edit: true,
    purchase: true,
  };

  return (
    <div className="product-list">
      <DataLoader endpoint="categories">
        {(categories) => (
          <GridTable
            initialRows={products}
            columns={columns}
            rowKey="id"
            withPurchase={true}
            collection="products"
            categories={categories}
            allowedActions={allowedActions}
          >
            {({ value, onChange }) => (
              <CategoryInput
                value={value}
                onChange={onChange}
                categories={categories}
              />
            )}
          </GridTable>
        )}
      </DataLoader>
    </div>
  );
};

export default ProductList;
