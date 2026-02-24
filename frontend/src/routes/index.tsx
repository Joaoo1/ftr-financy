import { BrowserRouter, Route, Routes } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { RouteWrapper } from "./RouteWrapper";
import { Dashboard } from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Transactions from "../pages/Transaction";
import Profile from "../pages/Profile";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteWrapper>
              <AuthLayout>
                <Login />
              </AuthLayout>
            </RouteWrapper>
          }
        />
        <Route
          path="/cadastro"
          element={
            <RouteWrapper>
              <AuthLayout>
                <Signup />
              </AuthLayout>
            </RouteWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RouteWrapper isPrivate>
              <DefaultLayout>
                <Dashboard />
              </DefaultLayout>
            </RouteWrapper>
          }
        />
        <Route
          path="/categorias"
          element={
            <RouteWrapper isPrivate>
              <DefaultLayout>
                <Categories />
              </DefaultLayout>
            </RouteWrapper>
          }
        />
        <Route
          path="/transacoes"
          element={
            <RouteWrapper isPrivate>
              <DefaultLayout>
                <Transactions />
              </DefaultLayout>
            </RouteWrapper>
          }
        />
        <Route
          path="/perfil"
          element={
            <RouteWrapper isPrivate>
              <DefaultLayout>
                <Profile />
              </DefaultLayout>
            </RouteWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
