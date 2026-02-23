import { BrowserRouter, Route, Routes } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";
import { Login } from "../pages/Login";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
