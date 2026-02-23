import { BrowserRouter, Route, Routes } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";

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
        <Route
          path="/cadastro"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
