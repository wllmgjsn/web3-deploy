import { useState, type ChangeEvent } from "react";
import type { NewExpense } from "../types/Expense";
import { useForm } from "react-hook-form";
import useCategories from "../hooks/useCategories";

interface ExpenseAddProps {
  addExpense: (expense: NewExpense) => void;
}

// function generateRandomExpense(): Expense {
//   return {
//     id: Math.round(Math.random() * 100).toString(),
//     date: "2026-09-18",
//     description: "New random Expense",
//     payer: "New random Payer",
//     amount: Math.random() * 100,
//   };
// }

// Form component
function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const [payerId, setPayerId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { handleSubmit } = useForm();

  const { categories } = useCategories();

  // useEffect(() => {
  //   console.log(categoryId);
  // }, [categoryId])

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
          addExpense({
            amount: Number(price.replace(",", ".")),
            date: new Date().toISOString(),
            description: description,
            payerId: Number(payerId),
            categoryId: categoryId ? Number(categoryId) : null,
          });
          setPayerId("");
          setCategoryId("");
          setDescription("");
          setPrice("");
        })}
      >
        <h2>Add a new Expense</h2>
        <input
          type="number"
          min="1"
          step="1"
          value={payerId}
          placeholder="Enter payer id here"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPayerId(e.target.value)
          }
          required
        ></input>
        <input
          value={description}
          placeholder="Enter description here"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          required
        ></input>
        <input
          value={price}
          placeholder="Enter price here"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
          required
        ></input>
        <select
          value={categoryId}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setCategoryId(e.target.value)
          }
        >
          <option value="">No category</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button
          type="submit"
          style={{ width: "fit-content", alignSelf: "center" }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default ExpenseAdd;
