// src/pages/expenses/ExpenseList.loader.ts
import type { LoaderFunctionArgs } from 'react-router-dom';
import type { Expense } from '../../types/Expense';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function expenseListLoader({ request }: LoaderFunctionArgs): Promise<Expense[]> {
  // Forward the filters from the page URL (?amount=...&payerId=...&categoryId=...) to the API.
  const { searchParams } = new URL(request.url);
  const query = searchParams.size > 0 ? `?${searchParams}` : '';
  
  const response = await fetch(`${API_BASE_URL}/api/expenses${query}`);

  if (!response.ok) {
    throw new Response('Could not load expenses', { status: response.status });
  }

  return response.json();
}