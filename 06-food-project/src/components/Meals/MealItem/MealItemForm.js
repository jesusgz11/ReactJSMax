import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = ({ id, addToCart }) => {
  const [validAmount, setValidAmount] = useState(true);

  const inputRef = useRef();

  const addProduct = (event) => {
    event.preventDefault();
    const enteredAmount = Number.parseInt(inputRef.current.value || 0);

    if (!enteredAmount || enteredAmount > 5) {
      setValidAmount(false);
      return;
    }
    addToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={addProduct}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount" + id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!validAmount && <p>Please enter a valid amount (1 - 5)</p>}
    </form>
  );
};

export default MealItemForm;
