import type { Expense } from "../types/Expense";
import ExpenseItem from "../components/ExpenseItem";
import { useState } from "react";
import ExpenseAdd from "../components/ExpenseAdd";
import useExpenses from "../hooks/useExpenses";
import ExpenseReset from "../components/ExpenseReset";
import ExpenseSorter from "../components/ExpenseSorter";

function Home() {
  const { expenses, addExpense, resetExpenses } = useExpenses();
  const [sortingAlgo, setSortingAlgo] = useState<
    (a: Expense, b: Expense) => number
  >(() => () => 1);

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo); // We're wrapping algo in a function because useState setter accept either a value or a function returning a value.
  };

  const sortedExpenses = [...expenses].sort(sortingAlgo);

  return (
    <div style={{
      display : 'flex',
      gap : '2em'
    }}>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",        
        }}
      >
        <h1>Manage your expenses</h1>
        <ExpenseAdd addExpense={addExpense} />
        <ExpenseReset resetExpenses={resetExpenses} />
      </div>

      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
          padding: "2em",
          borderRadius: "1em",
          boxSizing: "border-box",
          width: "24em",
          height: "70vh",
          flexShrink: 0,
          overflowY: "auto",
        }}
      >
        <h2>Expenses</h2>
        {sortedExpenses.length > 0 && (
          <ExpenseSorter setSortingAlgo={handleAlgoChange} />
        )}
        <ul>
          {sortedExpenses.map((expense) => (
            <li key={expense.id}>
              <ExpenseItem expense={expense} />
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Home;
