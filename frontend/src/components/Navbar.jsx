import { Link, NavLink, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import {
  MessagesSquare,
  UserSquare,
  LogOut,
  LogIn,
  UserRoundPlus,
  MessageCircleMore,
} from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import ThemesDropdown from "./ThemesDropdown";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme}>
      <header className="border-b bg-base-300 border-base-300 w-full z-10 backdrop-blur-lg font-inter">
        <div className="px-8 py-3">
          <div className="flex items-center xs:justify-between justify-center flex-wrap h-full gap-y-2">
            <div className="flex items-center gap-8">
              <Link
                viewTransition
                to="/"
                className="flex items-center gap-2 hover:opacity-80 transition-all duration-300"
              >
                <div className="size-9 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MessagesSquare className="size-5 text-primary" />
                </div>
                <h1 className="text-2xl font-roboto">Chatterbox</h1>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {!authUser && (
                <>
                  <NavLink
                    viewTransition
                    to={"/signup"}
                    className={({ isActive }) =>
                      `btn btn-ghost btn-sm gap-2 ${
                        isActive ? "btn-active btn-accent" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <UserRoundPlus className="size-5" />
                    <span className="hidden sm:inline">Signup</span>
                  </NavLink>
                  <NavLink
                    viewTransition
                    to={"/login"}
                    className={({ isActive }) =>
                      `btn btn-ghost btn-sm gap-2 ${
                        isActive ? "btn-active btn-accent" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <LogIn className="size-5" />
                    <span className="hidden sm:inline">Login</span>
                  </NavLink>
                </>
              )}
              {authUser && (
                <>
                  <NavLink
                    viewTransition
                    to={"/"}
                    className={({ isActive }) =>
                      `btn btn-ghost btn-sm gap-2 ${
                        isActive ? "btn-active btn-accent" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <MessageCircleMore className="size-5" />
                    <span className="hidden sm:inline">Chat</span>
                  </NavLink>
                  <NavLink
                    viewTransition
                    to={"/profile"}
                    className={({ isActive }) =>
                      `btn btn-ghost btn-sm gap-2 ${
                        isActive ? "btn-active btn-accent" : "hover:bg-base-200"
                      }`
                    }
                  >
                    <UserSquare className="size-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </NavLink>

                  <button
                    className="flex gap-2 items-center btn btn-ghost btn-error btn-sm"
                    onClick={logout}
                  >
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
              <ThemesDropdown />
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
