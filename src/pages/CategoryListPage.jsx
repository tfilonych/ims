import { useEffect, useState, Suspense } from 'react';
import DataLoader from '../components/DataLoader';
import CategoryList from '../components/CategoryList';

const CategoryListPage = () => {
  return (
    <div className="product-list">
      <DataLoader endpoint="categories">
        {(categories) => <CategoryList categories={categories} />}
      </DataLoader>
    </div>
  );
};

export default CategoryListPage;
