import { useState } from "react";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";
import ExpensesList from "./ExpesesList";
import ExpensesChart from "./ExpensesChart";

const Expenses = ({ expenses }) => {
  const [year, setYear] = useState("2021");

  const filteredExpenses = expenses.filter(
    (expense) => expense.date.getFullYear() === +year
  );

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter setYear={setYear} year={year} />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
