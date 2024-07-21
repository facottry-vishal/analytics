import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: User | null;
  company: Company | null;
  activeProject: Project | null;
  projects: Project[];
  setUser: (user: User | null) => void;
  setCompany: (company: Company | null) => void;
  setActiveProject: (activeProject: Project | null) => void;
  setProjects: (projects: Project[]) => void;
};

export const userStore = create(
  persist<UserStore>((set) => ({
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

type FilterStore = {
  activeFilter: Filter;
  setActiveFilter: (item: Filter) => void;
};

export const activeFilterStore = create(
  persist<FilterStore>(
    (set) => ({
      activeFilter: [],
      setActiveFilter: (item) => set({ activeFilter: item }),
    }),
    { name: "activeFilter" }
  )
);

type GlobalStore = {
  sideDetailsCollapsed: boolean;
  setDetailsCollapsed: (sideDetailsCollapsed: boolean) => void;
};

export const globalStore = create(persist<GlobalStore>((set) => ({
  sideDetailsCollapsed: false,
  setDetailsCollapsed: (sideDetailsCollapsed) => set({ sideDetailsCollapsed }),
}), { name: "global" }));