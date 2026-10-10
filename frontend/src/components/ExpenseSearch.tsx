import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import type { ExpenseFilter } from "../hooks/useExpenses";
import useUsers from "../hooks/useUsers";

interface ExpenseSearchProps {
  fetchExpenses: (filter?: ExpenseFilter) => Promise<void>;
}

function ExpenseSearch({ fetchExpenses }: ExpenseSearchProps) {
  const [expenseAmountInput, setExpenseAmountInput] = useState("");
  const [payerIdInput, setPayerIdInput] = useState("");

  const { users } = useUsers();

  const { handleSubmit } = useForm();

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
          await fetchExpenses({
            amount: expenseAmountInput ? Number(expenseAmountInput) : undefined,
            payerId: payerIdInput ? Number(payerIdInput) : undefined,
          });
        })}
      >
        <h2>Search expenses</h2>

        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setPayerIdInput(e.target.value)
          }
        >
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          step=".010"
          value={expenseAmountInput}
          placeholder="Enter minimum amount"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setExpenseAmountInput(e.target.value)
          }
        ></input>

        <div style={{ display: "flex", gap: "0.5em", alignSelf: "center" }}>
          <button type="submit">Search</button>
          <button
            type="button"
            onClick={async () => {
              setExpenseAmountInput("");
              setPayerIdInput("");
              await fetchExpenses();
            }}
          >
            Reset filter
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseSearch;
