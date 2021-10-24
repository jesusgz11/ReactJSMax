import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = ({ cartHandler }) => {
  const { items } = useContext(CartContext);
  const [isBumping, setIsBumping] = useState(false);
  const btnClasses = `${classes.button} ${isBumping ? classes.bump : ""}`;
  const totalItems = items.reduce(
    (acc, current) => acc + Number.parseInt(current.amount),
    0
  );

  useEffect(() => {
    if (!items.length) {
      return;
    }
    setIsBumping(true);
    const timer = setTimeout(() => {
      setIsBumping(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [items]);

  return (
    <button className={btnClasses} onClick={cartHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default HeaderCartButton;
