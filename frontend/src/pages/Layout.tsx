import { NavLink, Outlet } from "react-router";
import type { AppContext } from "../hooks/useAppContext";
import useCategories from "../hooks/useCategories";
import useUsers from "../hooks/useUsers";
import '../App.css';

function Layout() {
  const { users, fetchUsers } = useUsers();
  const { categories, fetchCategories } = useCategories();
  const context: AppContext = {
    users,
    categories,
    fetchUsers,
    fetchCategories,
  };

  return (
    <div>
      <nav>
        <NavLink to="/" end>
          {" "}
          Home{" "}
        </NavLink>
        <NavLink to="/expenses" end>
          {" "}
          Expenses{" "}
        </NavLink>
        <NavLink to="/expenses/new">Add an expense</NavLink>
      </nav>
      <main>
        <Outlet context={context} />
      </main>
    </div>
  );
}

export default Layout;
