export interface Expense {
  id: number;
  date: string; // ISO date, JSON serialization of DateTime
  description: string;
  amount: number;
  payerId: number;
}

export type NewExpense = Omit<Expense, "id" | "date"> & { date?: string };