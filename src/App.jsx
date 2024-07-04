import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import ProductList from './components/ProductList.jsx';
import CategoryList from './components/CategoryList.jsx';
import OrderList from './components/OrderList.jsx';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/orders" element={<OrderList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
