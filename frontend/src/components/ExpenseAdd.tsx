import { useState, type ChangeEvent } from "react";
import type { NewExpense } from "../types/Expense";
import { useForm } from "react-hook-form";

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

  const { handleSubmit } = useForm();

  // const handleSubmit = (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   const toAdd: NewExpense = {
  //     date: new Date().toISOString(),
  //     description: description,
  //     payer: payer,
  //     amount: Number(price.replace(',', '.')),
  //   };
  //   addExpense(toAdd);
  //   console.log("Added expense :", toAdd);
  //   clearForm();
  // };

  // const clearForm = () => {
  //   setPayer("");
  //   setDescription("");
  //   setPrice("");
  // }

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",          
          width : '50%',
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
          });
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
