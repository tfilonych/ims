import ProductList from '../components/ProductList';
import DataLoader from '../components/DataLoader';

const ProductListPage = () => (
  <div className="product-list">
    <DataLoader endpoint="products">
      {(products) => <ProductList products={products} />}
    </DataLoader>
  </div>
);

export default ProductListPage;
