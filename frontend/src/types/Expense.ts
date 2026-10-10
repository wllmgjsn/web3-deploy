interface Expense {
  id: number;
  date: string; // ISO date, JSON serialization of DateTime
  description: string;
  amount: number;
  payerId: number;
}

interface User {
  id : number,
  name : string,
  email : string,
  bankAccount? : string
}

export type { Expense, User }

export type NewExpense = Omit<Expense, "id" | "date"> & { date?: string };
export type NewUser = Omit<User, 'id'>