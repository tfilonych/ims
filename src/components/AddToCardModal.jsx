import React, { useState } from 'react';
import AddCardIcon from '@mui/icons-material/AddCard';
import CloseIcon from '@mui/icons-material/Close';
import { createItem, updateItem, deleteItem } from './../http';

const AddToCartModal = ({
  open,
  onClose,
  product,
  quantity,
  setQuantity,
  setRows,
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  if (!open) return null;

  const generateOrderNumber = () => {
    return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const getCustomerId = () => {
    let customerId = sessionStorage.getItem('customerId');
    if (!customerId) {
      customerId = `CUST-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      sessionStorage.setItem('customerId', customerId);
    }
    return customerId;
  };

  const addProductToCart = async () => {
    const total = product.price * quantity;
    const order = {
      number: generateOrderNumber(),
      date: new Date().toDateString(),
      customer: getCustomerId(),
      quantity,
      product: product.id,
      total,
    };
    try {
      await createItem('orders', order);

      if (quantity === product.quantity) {
        await deleteItem('products', product.id);
        setRows((prevRows) => prevRows.filter((row) => row.id !== product.id));
      } else {
        const updatedProduct = {
          ...product,
          quantity: product.quantity - quantity,
        };
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === product.id ? updatedProduct : row))
        );
        await updateItem('products', product.id, updatedProduct);
      }

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <CloseIcon className="close-button" onClick={onClose} />
        <h2>Add to Cart</h2>
        <div>
          <p>Product: {product.name}</p>
          {showSuccessMessage ? (
            <div className="success-message">
              Purchase successful! If you want to see your orders, go to the
              orders page
            </div>
          ) : (
            <>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <div className="modal-actions">
                <button className="add-button" onClick={addProductToCart}>
                  Add new order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
