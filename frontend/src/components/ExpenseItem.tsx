/**
 * A simple component to display an expense item
 */

import useAppContext from "../hooks/useAppContext";
import type { Expense } from "../types/Expense";

interface ExpenseItemProps {
  expense: Expense;
}

function ExpenseItem({ expense }: ExpenseItemProps) {
  
  const { users, categories } = useAppContext();
  
  return <div>
    <h3>Expense {expense.id}</h3>
    <p>Date: {expense.date}</p>
    <p>Description: {expense.description}</p>
    {/* amount must be restricted to 2 decimal places */}
    <p>Amount: {expense.amount.toFixed(2)}</p>
    <p>Payer: {users.find(u => u.id === expense.payerId)?.name}</p>
    <p>Category : {categories.find(c => c.id === expense.categoryId)?.name ?? 'Unknown'}</p>
  </div>;
}

export default ExpenseItem;