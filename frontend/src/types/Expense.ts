interface Expense {
  id: number;
  date: string; // ISO date, JSON serialization of DateTime
  description: string;
  amount: number;
  payerId: number;
  categoryId: number | null;
}

interface User {
  id : number,
  name : string,
  email : string,
  bankAccount? : string
}

interface Category {
  id : number,
  name : string,
  colour : string
}

export type { Expense, User, Category }

export type NewExpense = Omit<Expense, "id" | "date"> & { date?: string };
export type NewUser = Omit<User, 'id'>