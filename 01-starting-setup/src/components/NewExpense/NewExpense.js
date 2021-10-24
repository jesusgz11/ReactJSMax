import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = ({ addExpense }) => {
  const [isAdding, setIsAdding] = useState(false);

  const addingHandler = () => {
    setIsAdding((prevState) => !prevState);
  };

  const onAddExpense = (expenseData) => {
    const data = {
      ...expenseData,
      id: Math.random().toString(10),
    };
    addExpense(data);
  };

  let addExpenseContent = (
    <button onClick={addingHandler}>Add new Expense</button>
  );

  if (isAdding) {
    addExpenseContent = (
      <ExpenseForm onAddExpense={onAddExpense} addingHandler={addingHandler} />
    );
  }

  return <div className="new-expense">{addExpenseContent}</div>;
};

export default NewExpense;
