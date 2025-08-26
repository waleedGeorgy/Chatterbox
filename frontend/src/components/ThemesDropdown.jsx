import THEMES from "../constants/themes";
import { useThemeStore } from "../store/useThemeStore";
import { Palette, Check } from "lucide-react";

const ThemesDropdown = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <>
      <button
        className="btn btn-ghost btn-sm gap-2 hover:bg-base-200"
        popoverTarget="popover-1"
        style={{ anchorName: "--anchor-1" }}
      >
        <Palette className="size-5" />
        <span className="hidden sm:inline">Themes</span>
      </button>

      <ul
        className="dropdown dropdown-bottom dropdown-end outline-1 outline-neutral menu w-64 h-[350px] bg-base-100 rounded-box shadow-md overflow-y-scroll mt-6"
        popover="auto"
        id="popover-1"
        style={{ positionAnchor: "--anchor-1" }}
      >
        {THEMES.map((t) => (
          <button
            key={t}
            className="flex items-center w-full gap-2 py-2 px-1 rounded-lg transition-colors cursor-pointer hover:bg-base-200"
            onClick={() => toggleTheme(t)}
          >
            <div
              className="relative size-6 overflow-hidden rounded-md"
              data-theme={t}
            >
              <div className="absolute inset-0 grid grid-cols-2 gap-px p-[3px]">
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-neutral"></div>
              </div>
            </div>
            <span className="text-sm truncate">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
            {theme == t && (
              <span className="ml-auto mt-0.5">
                <Check className="size-4" />
              </span>
            )}
          </button>
        ))}
      </ul>
    </>
  );
};

export default ThemesDropdown;
