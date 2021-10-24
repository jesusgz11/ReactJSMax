import { useContext, useState, useEffect } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = ({ cartHandler }) => {
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doneSubmit, setDoneSubmit] = useState(false);

  const { items, totalAmount, addItem, removeItem, clearCart } =
    useContext(CartContext);

  const onAdd = (item) => {
    addItem({ ...item, amount: 1 });
  };

  const onRemove = (id) => {
    removeItem(id);
  };

  useEffect(() => {
    if (items.length === 0) {
      setCheckoutMode(false);
    }
  }, [items]);

  const itemsList = (
    <ul className={classes['cart-items']}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          name={item.name}
          amount={item.amount}
          onAdd={onAdd.bind(null, item)}
          onRemove={onRemove.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const hasItems = items.length > 0;

  const openCheckout = () => {
    setCheckoutMode(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={cartHandler}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={openCheckout}>
          Order
        </button>
      )}
    </div>
  );

  const submitData = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      'https://react-http-733ef-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: items,
        }),
      }
    );
    setIsSubmitting(false);
    setDoneSubmit(true);
    clearCart();
  };

  const modalContent = (
    <>
      {itemsList}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(totalAmount)}
        </span>
      </div>
      {checkoutMode && (
        <Checkout onClose={cartHandler} onConfirm={submitData} />
      )}
      {!checkoutMode && modalActions}
    </>
  );

  const submittingContent = <p>Sending order data...</p>;

  const doneSubmitContent = (
    <>
      <p>Successfully sent the order.</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={cartHandler}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClick={cartHandler}>
      {!isSubmitting && !doneSubmit && modalContent}
      {isSubmitting && submittingContent}
      {!isSubmitting && doneSubmit && doneSubmitContent}
    </Modal>
  );
};

export default Cart;
