import type { NewExpense } from "../services/expenses.service.ts";

export function isValidNewExpense(data: any): data is NewExpense {
   if (typeof data !== 'object' || data === null) {
    return false;
  }
  const candidate = data as Record<string, unknown>;
  return (
    (candidate.date === undefined ||
      (typeof candidate.date === 'string' && !Number.isNaN(Date.parse(candidate.date)))) &&
    typeof candidate.description === 'string' &&
    Number.isInteger(candidate.payerId) &&
    typeof candidate.amount === 'number'
  );
}
