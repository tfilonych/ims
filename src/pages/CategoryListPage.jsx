import { useEffect, useState, Suspense } from 'react';
import CategoryList from '../components/CategoryList';

const CategoryListPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
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
        <CategoryList categories={categories} />
      </Suspense>
    </div>
  );
};

export default CategoryListPage;
