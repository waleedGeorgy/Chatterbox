import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

export function ProtectedAuthRoute() {
  const { authUser } = useAuthStore();
  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
}

export function ProtectedUnauthRoute() {
  const { authUser } = useAuthStore();
  return !authUser ? <Outlet /> : <Navigate to="/" replace />;
}
