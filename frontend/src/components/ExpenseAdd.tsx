import type { NewExpense } from "../types/Expense";
import { useForm } from "react-hook-form";
import useAppContext from "../hooks/useAppContext";

interface ExpenseAddProps {
  addExpense: (expense: NewExpense) => void;
}

interface ExpenseFormValues {
  payerId: string;
  description: string;
  price: string;
  categoryId: string;
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
  const { register, handleSubmit, reset } = useForm<ExpenseFormValues>({
    defaultValues: { payerId: "", description: "", price: "", categoryId: "" },
  });

  const { users, categories } = useAppContext();

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
        onSubmit={handleSubmit((data) => {
          addExpense({
            amount: Number(data.price.replace(",", ".")),
            date: new Date().toISOString(),
            description: data.description,
            payerId: Number(data.payerId),
            categoryId: data.categoryId ? Number(data.categoryId) : null,
          });
          reset();
        })}
      >
        <h2>Add a new Expense</h2>
        <select {...register("payerId", { required: true })}>
          <option value="">Select a payer</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Enter description here"
          {...register("description", { required: true })}
        ></input>
        <input
          placeholder="Enter price here"
          {...register("price", { required: true })}
        ></input>
        <select {...register("categoryId")}>
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
