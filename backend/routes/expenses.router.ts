
import express from "express";
import { ExpensesService } from "../services/expenses.service.ts";
import { isValidNewExpense } from "../guards/expenses.guard.ts";
import type { ExpenseFilter } from "../services/expenses.service.ts";

const expensesRouter = express.Router();

expensesRouter.get("/", async (req, res) => {
  try {
    const filter = { payerId : Number(req.query.payerId), amount : Number(req.query.amount) } as ExpenseFilter;
    const expenses = await ExpensesService.getExpenses(filter);
    console.log("fetched from db : ", expenses);
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

expensesRouter.post("/", async (req, res) => {
  try {
    const expense = req.body;
    if (!isValidNewExpense(expense)) {
      return res.status(400).json({ error: "Invalid expense" });
    }
    const expenses = await ExpensesService.addExpense(expense);
    res.status(201).json(expenses);
  } catch (error) {
    // 23503 = foreign key violation: payerId does not reference an existing user
    if ((error as { sqlState?: string }).sqlState === "23503") {
      return res.status(400).json({ error: "Unknown payer" });
    }
    console.error(error)
    res.status(500).json({ error: "Internal server error" });
  } 
});

expensesRouter.post("/reset", async (req, res) => {
  try {
    const expenses = await ExpensesService.resetExpenses();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default expensesRouter;