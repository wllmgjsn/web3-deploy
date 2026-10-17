import { useForm } from "react-hook-form";
import useAppContext from "../hooks/useAppContext";
import { useSearchParams } from "react-router-dom";

interface SearchFormValues {
  amount?: number;
  payerId?: string;
  categoryId?: string;
}

function ExpenseSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit, reset } = useForm<SearchFormValues>({
    // keep the form in sync with the URL when the page is opened with filters already set
    defaultValues: {
      amount: searchParams.get("amount")
        ? Number(searchParams.get("amount"))
        : undefined,
      payerId: searchParams.get("payerId") ?? "",
      categoryId: searchParams.get("categoryId") ?? "",
    },
  });

  const { users, categories } = useAppContext();

  const onSubmit = (data: SearchFormValues) => {
    // Only the filters the user actually filled in go into the URL.
    const filter: Record<string, string> = {};
    if (data.amount) filter.amount = String(data.amount);
    if (data.payerId) filter.payerId = data.payerId;
    if (data.categoryId) filter.categoryId = data.categoryId;

    // Changing the URL makes React Router re-run the route loader.
    setSearchParams(filter);
  };

  const onReset = () => {
    reset({ amount: undefined, payerId: "", categoryId: "" });
    setSearchParams({});
  };

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
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Search expenses</h2>

        {/* An untouched select gives `""`*/}
        <select {...register("payerId")}>
          <option value={""}>All expenses</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <select {...register("categoryId")}>
          <option value={""}>All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          step=".01"
          placeholder="Enter minimum amount"
          {...register("amount", { valueAsNumber: true })}
        ></input>

        <div style={{ display: "flex", gap: "0.5em", alignSelf: "center" }}>
          <button type="submit">Search</button>
          <button type="button" onClick={onReset}>
            Reset filter
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseSearch;
