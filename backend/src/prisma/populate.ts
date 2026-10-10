import { db } from "./db.ts";

const orm = db.orm.public;

async function main() {
  // Vide la base (ordre des clés étrangères)
  await orm.ExpenseUser.where({}).deleteAll();
  await orm.Transfer.where({}).deleteAll();
  await orm.Expense.where({}).deleteAll();
  await orm.Category.where({}).deleteAll();
  await orm.User.where({}).deleteAll();

  // Users
  const alice = await orm.User.create({ name: "Alice", email: "alice@example.com", bankAccount: "BE68 5390 0754 7034" });
  const bob = await orm.User.create({ name: "Bob", email: "bob@example.com", bankAccount: "BE71 0961 2345 6769" });
  const charlie = await orm.User.create({ name: "Charlie", email: "charlie@example.com" });
  const diana = await orm.User.create({ name: "Diana", email: "diana@example.com" });

  // Categories
  const food = await orm.Category.create({ name: "Food", colour: "#f97316" });
  const transport = await orm.Category.create({ name: "Transport", colour: "#3b82f6" });
  const housing = await orm.Category.create({ name: "Housing", colour: "#10b981" });

  // Expenses + participants
  const expenses = [
    { description: "Groceries", amount: 84.3, date: "2025-01-12", payer: alice, category: food, participants: [alice, bob, charlie] },
    { description: "Train tickets", amount: 62, date: "2025-01-15", payer: bob, category: transport, participants: [alice, bob, diana] },
    { description: "Electricity bill", amount: 120.5, date: "2025-01-20", payer: charlie, category: housing, participants: [alice, bob, charlie, diana] },
    { description: "Shared taxi", amount: 27.5, date: "2025-02-08", payer: bob, category: null, participants: [alice, bob] },
  ];

  for (const e of expenses) {
    const expense = await orm.Expense.create({
      description: e.description,
      amount: e.amount,
      date: e.date,
      payerId: e.payer.id,
      categoryId: e.category ? e.category.id : null,
    });
    await orm.ExpenseUser.createAll(
      e.participants.map((u) => ({ expenseId: expense.id, userId: u.id })),
    );
  }

  // Transfers
  await orm.Transfer.createAll([
    { amount: 28.1, date: "2025-01-18", sourceId: bob.id, targetId: alice.id },
    { amount: 30, date: "2025-01-25", sourceId: diana.id, targetId: charlie.id },
  ]);

  console.log("Base peuplée ✅");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });