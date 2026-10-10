import { db } from "../src/prisma/db.ts";

export type NewExpense = {
  description: string;
  amount: number;
  payerId: number;
  date?: string;
};

export class ExpensesService {
  
  public static async getExpenses(amount : number) {
    if(!isNaN(amount)) return await (await db.orm.public.Expense.all()).filter(e => e.amount >= amount);
    return ((await db.orm.public.Expense.all()))
  }

  public static async addExpense(expense: NewExpense) {
    const created = await db.orm.public.Expense.create(expense);
    await db.orm.public.ExpenseUser.create({
      userId: expense.payerId,
      expenseId: created.id,
    });

    return created;
  }

  public static async resetExpenses() {
    await db.orm.public.ExpenseUser.where({}).deleteAll();
    await db.orm.public.Expense.where({}).deleteAll();
  }
}
