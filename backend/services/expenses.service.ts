import { db } from "../src/prisma/db.ts";

export type NewExpense = {
  description: string;
  amount: number;
  payerId: number;
  date?: string;
};

export type ExpenseFilter = {
  amount?: number;
  payerId?: number;
};

export class ExpensesService {
  public static async getExpenses(filter: ExpenseFilter) {
    let query = db.orm.public.Expense;    // Stocke le point d'entrée de la table dans query
    if (filter.amount && !isNaN(filter.amount)) {
      query = query.where((e) => e.amount.gte(filter.amount!));
    }
    if(filter.payerId && !isNaN(filter.payerId)){
      query = query.where((e) => e.payerId.eq(filter.payerId!));
    }
    return await query.all();
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
