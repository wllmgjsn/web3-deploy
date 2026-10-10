import type { Expense } from "../types/Expense";
import ExpenseItem from "../components/ExpenseItem";
import { useState } from "react";
import ExpenseAdd from "../components/ExpenseAdd";
import useExpenses from "../hooks/useExpenses";
import ExpenseReset from "../components/ExpenseReset";
import ExpenseSorter from "../components/ExpenseSorter";
import ExpenseAmountSearch from "../components/ExpenseSearch";

const menuItems = ["Add", "Search", "Reset"] as const;
type MenuItem = (typeof menuItems)[number];

function Home() {
  const { expenses, addExpense, resetExpenses, setExpenses } = useExpenses();
  const [sortingAlgo, setSortingAlgo] = useState<
    (a: Expense, b: Expense) => number
  >(() => () => 1);

  const [activeMenu, setActiveMenu] = useState<MenuItem>("Add");

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo); // We're wrapping algo in a function because useState setter accept either a value or a function returning a value.
  };

  const sortedExpenses = [...expenses].sort(sortingAlgo);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2em",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          // backgroundColor: "red",
          alignItems: "center",
        }}
      >
        <h1>Manage your expenses</h1>
        <nav style={{ display: "flex", gap: "0.5em" }}>
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveMenu(item)}
              disabled={activeMenu === item}
            >
              {item}
            </button>
          ))}
        </nav>
        {activeMenu === "Add" && <ExpenseAdd addExpense={addExpense} />}
        {activeMenu === "Search" && (
          <ExpenseAmountSearch setExpenses={setExpenses} />
        )}
        {activeMenu === "Reset" && (
          <ExpenseReset resetExpenses={resetExpenses} />
        )}
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
