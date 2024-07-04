import AddCardIcon from '@mui/icons-material/AddCard';
import CloseIcon from '@mui/icons-material/Close';

const AddToCartModal = ({ open, onClose, product, quantity, setQuantity }) => {
  if (!open) return null;

  const addProductToCart = () => {
    const order = { id: Date.now(), product, quantity };
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add to Cart</h2>
        <p>Product: {product.name}</p>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            max={product.quantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <AddCardIcon onClick={addProductToCart} />
        <CloseIcon onClick={onClose} />
      </div>
    </div>
  );
};

export default AddToCartModal;
