import { BrowserRouter, Route, Routes } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { RouteWrapper } from "./RouteWrapper";
import { Dashboard } from "../pages/Dashboard";

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
                <h1>Categorias</h1>
              </DefaultLayout>
            </RouteWrapper>
          }
        />
        <Route
          path="/transacoes"
          element={
            <RouteWrapper isPrivate>
              <DefaultLayout>
                <h1>Transações</h1>
              </DefaultLayout>
            </RouteWrapper>
          }
        />
        <Route
          path="/nova-transacao"
          element={
            <RouteWrapper isPrivate>
              <DefaultLayout>
                <h1>Nova Transação</h1>
              </DefaultLayout>
            </RouteWrapper>
          }
        />
        <Route
          path="/perfil"
          element={
            <RouteWrapper isPrivate>
              <DefaultLayout>
                <h1>Perfil</h1>
              </DefaultLayout>
            </RouteWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
