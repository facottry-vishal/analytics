import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
  persist((set) => ({
    user: null,
    company: null,
    projects: [],
    activeProject: null,

    setUser: (user) => set({ user }),
    setCompany: (company) => set({ company }),
    setProjects: (projects) => set({ projects }),
    setActiveProject: (activeProject) => set({ activeProject }),
  }),
  { name: "user" })
);

export const activeFilterStore = create(
  persist(
    (set) => ({
      activeFilter: [],
      setActiveFilter: (item) => set({ activeFilter: item }),
    }),
    { name: "activeFilter" }
  )
);

export const globalStore = create(persist((set) => ({
  sidebar: true,
  setSidebar: (sidebar) => set({ sidebar }),
}), { name: "global" }));