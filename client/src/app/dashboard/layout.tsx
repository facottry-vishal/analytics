'use client'
import { axios_analytics } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userStore, activeFilterStore } from "@/lib/store";
import { Loader } from "@/components/Loader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [activeFilter, setActiveFilter] = activeFilterStore(state => [state.activeFilter, state.setActiveFilter]);

  const { activeProject, setActiveProject, setCompany, setProjects, setUser } = userStore(state => ({
    activeProject: state.activeProject,
    setActiveProject: state.setActiveProject,
    setCompany: state.setCompany,
    setProjects: state.setProjects,
    setUser: state.setUser
  }));

  const fetchData = async () => {
    try {
      const userResponse = await axios_analytics.get('/get-user');
      setUser(userResponse.data);

      const adminResponse = await axios_analytics.get('/get-admin');
      const { company, projects } = adminResponse.data;

      setProjects(projects);
      setCompany(company);

      const currentProject = projects.find((p: Project) => p.projectID === activeProject?.projectID) || projects[0];
      setActiveProject(currentProject);

      if (Object.keys(activeFilter).length === 0 && projects.length > 0) {
        const defaultFilter = Object.keys(projects[0].filters).reduce((acc, key) => ({ ...acc, [key]: "" }), {});
        setActiveFilter(defaultFilter);
      }

      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      router.push(error.response?.data.code === "NO_PROJECT" ? '/' : '/');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Loader />
    )
  } else {
    return (
      <main>
        {children}
      </main>
    )
  }
}
