import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import ExpenseList from "./pages/expenses/ExpenseList";
import ExpenseShow from "./pages/expenses/ExpenseShow";
import ExpenseNew from "./pages/expenses/ExpenseNew";
import Layout from "./pages/Layout";
import { expenseListLoader } from "./pages/expenses/ExpenseList.loader";

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, element: <Navigate to="/expenses" replace /> },
      { path: "expenses", Component: ExpenseList, loader : expenseListLoader },
      { path: "expenses/:id", Component: ExpenseShow },
      { path: "expenses/new", Component: ExpenseNew },
    ],
  },
]);

// StrictMode doubles the number of requests in development mode, which is useful for testing the idempotency of your API endpoints.

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
