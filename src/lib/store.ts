import { create } from "zustand";

interface AppState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeJobFilter: "all" | "standard" | "data_collection";
  setActiveJobFilter: (filter: "all" | "standard" | "data_collection") => void;
  taskEarnings: number;
  addTaskEarning: (amount: number) => void;
  resetTaskEarnings: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  activeJobFilter: "all",
  setActiveJobFilter: (filter) => set({ activeJobFilter: filter }),
  taskEarnings: 0,
  addTaskEarning: (amount) => set((s) => ({ taskEarnings: s.taskEarnings + amount })),
  resetTaskEarnings: () => set({ taskEarnings: 0 }),
}));
