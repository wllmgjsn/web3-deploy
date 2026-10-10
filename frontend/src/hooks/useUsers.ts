import { useCallback, useEffect, useState } from "react";
import type { User } from "../types/Expense";

const host = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${host}/api`;

interface UseUsersResult {
  users: User[];
  fetchUsers : () => void
}

function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        throw new Error(`Error fetching users : ${response.status}`);
      }
      const data = (await response.json()) as User[];
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers])

  return { users, fetchUsers };
}

export default useUsers;
