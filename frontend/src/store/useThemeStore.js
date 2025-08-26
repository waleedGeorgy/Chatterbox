import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chatterbox-theme") || "dark",
  toggleTheme: (theme) => {
    localStorage.setItem("chatterbox-theme", theme);
    set({ theme });
  },
}));
