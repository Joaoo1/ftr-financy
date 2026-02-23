import { Navigate } from "react-router";

import { useAuth } from "../hooks/context/useAuth";
import { Loading } from "../components/loading";

interface IRouteWrapperProps {
  children: React.ReactNode;
  isPrivate?: boolean;
}

export const RouteWrapper: React.FC<IRouteWrapperProps> = ({
  isPrivate = false,
  children,
}) => {
  const { isLoggedIn, isLoadingAuthInfo } = useAuth();

  if (isLoadingAuthInfo) {
    return <Loading />;
  }

  if (isPrivate && !isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (!isPrivate && isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};
