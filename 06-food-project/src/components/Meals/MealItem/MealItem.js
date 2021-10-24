import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = ({ meal }) => {
  const { addItem } = useContext(CartContext);
  const { id, name, description, price } = meal;

  const addToCart = (amount) => {
    addItem({ ...meal, amount });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{`$${price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm id={id} addToCart={addToCart} />
      </div>
    </li>
  );
};

export default MealItem;
