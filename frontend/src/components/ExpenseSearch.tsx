import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import useExpenses from "../hooks/useExpenses";
import type { Expense } from "../types/Expense";

interface ExpenseAddProps {
  setExpenses : React.Dispatch<React.SetStateAction<Expense[]>>
}

function ExpenseAmountSearch({
  setExpenses
}: ExpenseAddProps) {
  const [expenseAmount, setExpenseAmount] = useState("");

  const { handleSubmit } = useForm();
  const { expenses } = useExpenses();

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          padding: "1em",
          borderRadius: "1em",
        }}
        onSubmit={handleSubmit(async () => {
          const amount = Number(expenseAmount);
          if (!isNaN(amount)){
            setExpenses(expenses.filter(e => e.amount >= amount));
            setExpenseAmount("");
          }
        })}
      >
        <h2>Minimum amount</h2>
        <input
          type="number"
          step=".10"
          value={expenseAmount}
          placeholder="Enter amount"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setExpenseAmount(e.target.value)
          }
          required
        ></input>

        <button
          type="submit"
          style={{ width: "fit-content", alignSelf: "center" }}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default ExpenseAmountSearch;
