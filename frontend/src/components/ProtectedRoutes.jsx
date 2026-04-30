import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useShallow } from "zustand/shallow";

export function ProtectedAuthRoute() {
  const { authUser } = useAuthStore(
    useShallow((state) => ({
      authUser: state.authUser,
    })),
  );
  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
}

export function ProtectedUnauthRoute() {
  const { authUser } = useAuthStore(
    useShallow((state) => ({
      authUser: state.authUser,
    })),
  );
  return !authUser ? <Outlet /> : <Navigate to="/" replace />;
}
