import { useOutletContext } from "react-router-dom";
import type { Category, User } from "../types/Expense";

export interface AppContext {
  users: User[];
  categories: Category[];
  fetchUsers: () => void;
  fetchCategories: () => void;
}

function useAppContext() {
  return useOutletContext<AppContext>();
}

export default useAppContext;
