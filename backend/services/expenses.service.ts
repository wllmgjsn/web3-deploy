import type { Expense, NewExpense } from "../types/expense.ts";
import { db } from "../src/prisma/db.ts";

export class ExpensesService {
  
  public static async getExpenses() : Promise<Expense[]> {
    return await db.orm.public.Expense.all();
  }
  
  public static async addExpense(newExpense: NewExpense): Promise<Expense> {
    const created = await db.orm.public.Expense.create(newExpense);
    return created;
  }
  
  public static async resetExpenses() {
    return db.orm.public.Expense.where({}).deleteAll();
  }
  
}