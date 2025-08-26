import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

export function ProtectedAuthRoute() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
}

export function ProtectedUnauthRoute() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return !authUser ? <Outlet /> : <Navigate to="/" replace />;
}
