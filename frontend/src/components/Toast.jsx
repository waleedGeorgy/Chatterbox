import toast from "react-hot-toast";
import { CircleX, CircleCheck } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

export default function Toast(state, message) {
  const theme = useThemeStore.getState().theme;

  toast.custom(
    (t) => (
      <div
        data-theme={theme}
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } bg-base-300 px-4 py-3 shadow-md rounded-2xl flex items-center space-x-3 border border-neutral`}
      >
        {state == "error" ? (
          <CircleX className="text-red-400" />
        ) : (
          <CircleCheck className="text-emerald-400" />
        )}
        <p>{message}</p>
      </div>
    ),
    { duration: 4000 }
  );
}
