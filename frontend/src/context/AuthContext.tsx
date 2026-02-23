import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import localforage from "localforage";

import { type User } from "../types";
import { type LoginInput, useLogin } from "../hooks/api/useLogin";

interface AuthContextProps {
  login: (data: LoginInput) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  loginError: string | null;
  isLoadingAuthInfo: boolean;
  user: User | null;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuthInfo, setLoadingAuthInfo] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  const init = async () => {
    const user = await localforage.getItem<User>("user");
    setUser(user);
    setLoadingAuthInfo(false);
  };

  useEffect(() => {
    init();
  }, []);

  const { mutate: login, isPending: isLoggingIn } = useLogin({
    onMutate: () => {
      setLoginError(null);
    },
    onSuccess: async (data) => {
      await localforage.setItem("user", data.user);
      await localforage.setItem("token", data.token);

      await init();
      setUser(data.user);
    },
    onError: (err) => {
      setLoginError(err?.message || "Erro ao realizar login");
    },
  });

  const logout = async () => {
    await localforage.removeItem("user");
    await localforage.removeItem("token");

    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        isLoggedIn: !!user,
        isLoadingAuthInfo,
        user,
        logout,
        isLoggingIn,
        loginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
