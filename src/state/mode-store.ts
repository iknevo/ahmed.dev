import { create } from "zustand";

export type Mode = "NORMAL" | "INSERT";

type ModeStore = {
  mode: Mode;
  currentSequence: string;
  focusedIndex: number | undefined;

  setMode: (newMode: Mode) => void;
  updateShortcutSequence: (key: string) => void;
  resetShortcutSequence: () => void;
  removeLastShortcutChar: () => void;
  setFocusedIndex: (index: number | undefined) => void;
};

export const useModeStore = create<ModeStore>((set) => ({
  mode: "NORMAL",
  currentSequence: "",
  focusedIndex: undefined,

  setMode: (newMode) => {
    set((state) => ({
      mode: newMode,
      currentSequence: newMode !== "INSERT" ? "" : state.currentSequence,
    }));

    const root = document.documentElement;

    switch (newMode) {
      case "NORMAL":
        root.style.setProperty("--mode-color", "var(--normal)");
        break;
      case "INSERT":
        root.style.setProperty("--mode-color", "var(--insert)");
        break;
    }
  },

  updateShortcutSequence: (key) =>
    set((state) => ({
      currentSequence: state.currentSequence + key,
    })),

  resetShortcutSequence: () => set({ currentSequence: "" }),

  removeLastShortcutChar: () =>
    set((state) => ({
      currentSequence: state.currentSequence.slice(0, -1),
    })),

  setFocusedIndex: (index) => set({ focusedIndex: index }),
}));
