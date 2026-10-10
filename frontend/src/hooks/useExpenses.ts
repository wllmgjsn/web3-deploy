import { useCallback, useEffect, useState } from 'react';
import type { Expense, NewExpense } from '../types/Expense';

const host = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${host}/api`;

interface UseExpensesResult {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  addExpense: (expense: NewExpense) => Promise<void>;
  resetExpenses: () => Promise<void>;
  setExpenses : React.Dispatch<React.SetStateAction<Expense[]>>
  fetchExpenses: (filter?: ExpenseFilter) => Promise<void>;
}

export type ExpenseFilter = {
  amount? : number,
  payerId? : number,
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown error';
}

function useExpenses(): UseExpensesResult {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async ({amount, payerId} : ExpenseFilter = {}) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (amount) params.set('amount', String(amount));
      if (payerId) params.set('payerId', String(payerId));
      const query = params.size > 0 ? `?${params}` : '';
      const response = await fetch(`${API_BASE_URL}/expenses${query}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch expenses (${response.status})`);
      }
      const data = (await response.json()) as Expense[];
      setExpenses(data);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Runs once on mount to load the initial expense list.
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = useCallback(
    async (expense: NewExpense) => {
      try {
        setError(null);
        const response = await fetch(`${API_BASE_URL}/expenses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(expense),
        });
        if (!response.ok) {
          throw new Error(`Failed to add expense (${response.status})`);
        }
        await fetchExpenses();
      } catch (err) {
        setError(errorMessage(err));
      }
    },
    [fetchExpenses],
  );

  const resetExpenses = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/expenses/reset`, { method: 'POST' });
      if (!response.ok) {
        throw new Error(`Failed to reset expenses (${response.status})`);
      }
      await fetchExpenses();
    } catch (err) {
      setError(errorMessage(err));
    }
  }, [fetchExpenses]);

  return { expenses, loading, error, addExpense, resetExpenses, setExpenses, fetchExpenses};
}

export default useExpenses;