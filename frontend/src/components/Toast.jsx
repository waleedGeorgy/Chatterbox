import toast from "react-hot-toast";
import { useThemeStore } from "../store/useThemeStore";
import { CircleX, CircleCheck } from "lucide-react";

export default function Toast(state, message) {
  const theme = useThemeStore.getState().theme;
  console.log(theme)

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
