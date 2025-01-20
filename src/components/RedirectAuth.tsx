import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface RedirectAuthProps {
  children: React.ReactNode;
}

const RedirectAuth: React.FC<RedirectAuthProps> = ({ children }) => {
  const { loading, authenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!loading && authenticated && user && user.email_verified)
    return <Navigate to="/home" />;
  if (!loading && authenticated && user && !user.email_verified) {
    return <Navigate to="/verify-email/" />;
  }

  return <>{children}</>;
};

export default RedirectAuth;
