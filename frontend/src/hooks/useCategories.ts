import { useCallback, useEffect, useState } from "react";
import type { Category } from "../types/Expense";

const host = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${host}/api`;

interface UseCategoriesResult {
  categories: Category[];
  fetchCategories : () => void
}

function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error(`Error fetching categories : ${response.status}`);
      }
      const data = (await response.json()) as Category[];
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories])

  return { categories, fetchCategories };
}

export default useCategories;
