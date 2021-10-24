import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [cartShown, setCartShown] = useState(false);

  const cartHandler = () => {
    setCartShown((prevState) => !prevState);
  };

  return (
    <CartProvider>
      {cartShown && <Cart cartHandler={cartHandler} />}
      <Header cartHandler={cartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
