import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage.jsx";
import Navbar from "./components/Navbar";
import {
  ProtectedAuthRoute,
  ProtectedUnauthRoute,
} from "./components/ProtectedRoutes.jsx";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-12 animate-spin" />
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <ProtectedAuthRoute />,
          children: [
            {
              path: "/",
              element: <HomePage />,
            },
            {
              path: "/profile",
              element: <ProfilePage />,
            },
          ],
        },
        {
          element: <ProtectedUnauthRoute />,
          children: [
            {
              path: "/login",
              element: <LoginPage />,
            },
            {
              path: "/signup",
              element: <SignupPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
