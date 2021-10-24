import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const checkValidIdx = (idx) => idx >= 0;

const cartReducer = (state, action) => {
  let existingItemIdx;
  let updatedTotalAmount;
  let updatedItems;

  switch (action.type) {
    case 'REMOVE':
      existingItemIdx = state.items.findIndex((item) => item.id === action.id);
      const itemCart = state.items[existingItemIdx];
      updatedTotalAmount = state.totalAmount - itemCart.price;
      if (checkValidIdx(existingItemIdx) && itemCart.amount > 1) {
        const updatedItem = {
          ...itemCart,
          amount: itemCart.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIdx] = updatedItem;
      } else {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      }
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    case 'ADD':
      existingItemIdx = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      updatedTotalAmount =
        state.totalAmount + action.item.amount * action.item.price;

      if (checkValidIdx(existingItemIdx)) {
        const updatedItem = {
          ...action.item,
          amount: action.item.amount + state.items[existingItemIdx].amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIdx] = updatedItem;
      } else {
        updatedItems = [...state.items, action.item];
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    case 'CLEAR':
      return defaultCart;
    default:
      return defaultCart;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCart);

  const addItem = (item) => {
    // Add item to array
    dispatchCartAction({ type: 'ADD', item });
  };

  const removeItem = (id) => {
    // Remove item from array
    dispatchCartAction({ type: 'REMOVE', id });
  };

  const clearCart = () => {
    // Clear cart
    dispatchCartAction({ type: 'CLEAR' });
  };

  const context = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
