import { db } from "../src/prisma/db.ts";

export type NewExpense = {
  description: string;
  amount: number;
  payerId: number; 
  date?: string; // ISO timestamp
};

export class ExpensesService {

  public static async getExpenses() {
    return await db.orm.public.Expense.all();
  }

  public static async addExpense(expense: NewExpense) {
    const created = await db.orm.public.Expense.create(expense);
    return created;
  }

  public static async resetExpenses() {
    return await db.orm.public.Expense.where({}).deleteAll();
  }

}