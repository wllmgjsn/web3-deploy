import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ExpenseListPage from "./pages/ExpensesPage";
import ExpensePage from "./pages/ExpensePage";
import NewExpensePage from "./pages/NewExpensePage";
import App from "./App";
import Home from "./pages/Home";
  
const router = createBrowserRouter([
  {
    path: "",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "expenses",
        element: <ExpenseListPage></ExpenseListPage>,
      },
      {
        path: "expenses/:id",
        element: <ExpensePage></ExpensePage>,
      },
      {
        path: "expenses/new",
        element: <NewExpensePage></NewExpensePage>,
      },
    ],
  },
]);

// StrictMode doubles the number of requests in development mode, which is useful for testing the idempotency of your API endpoints.

createRoot(document.getElementById("root")!).render(
  <StrictMode> 
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
