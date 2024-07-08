import OrderList from '../components/OrderList';
import DataLoader from '../components/DataLoader';

const OrderListPage = () => (
  <div className="product-list">
    <DataLoader endpoint="orders">
      {(orders) => <OrderList orders={orders} />}
    </DataLoader>
  </div>
);

export default OrderListPage;
