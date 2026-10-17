import { Outlet } from 'react-router-dom';
import './App.css';
import useUsers from './hooks/useUsers';
import useCategories from './hooks/useCategories';
import type { AppContext } from './hooks/useAppContext';

function App() {
  const { users, fetchUsers } = useUsers();
  const { categories, fetchCategories } = useCategories();
  const context: AppContext = { users, categories, fetchUsers, fetchCategories };

  return (
      <Outlet context={context}></Outlet>
  );
}

export default App;
