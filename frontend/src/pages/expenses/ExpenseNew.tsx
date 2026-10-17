import ExpenseAdd from "../../components/ExpenseAdd";
import useExpenses from "../../hooks/useExpenses";

function ExpenseNew() {
  const { addExpense } = useExpenses();

  return (
    <div>
      <h1>Add an expense</h1>
      <ExpenseAdd addExpense={addExpense} />
    </div>
  );
}

export default ExpenseNew;
