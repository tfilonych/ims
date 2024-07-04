import { useEffect, useState, Suspense } from 'react';
import ProductList from '../components/ProductList';

const ProductListPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <Suspense
        fallback={
          <div className="">
            <div className="bar1 bar">Loading.....</div>
          </div>
        }
      >
        <ProductList products={products} />
      </Suspense>
    </div>
  );
};

export default ProductListPage;
