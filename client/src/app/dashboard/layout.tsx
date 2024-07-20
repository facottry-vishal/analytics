'use client'
import { axios_analytics } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userStore, activeFilterStore } from "@/lib/store";
import { Loader } from "@/components/Loader";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/aceternity/sidebar";
import {
  IconLogout2,
  IconDashboard,
  IconSettings,
  IconArticle,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logo_2 from "@/assets/logo_2.svg";
import logo_dark_2 from "@/assets/logo_dark_2.svg";
import { ProjectSelector } from "@/components/facottry/project-selector";
import { Separator } from "@/components/ui/separator";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
      <main className={cn(
        "rounded-md flex flex-col md:flex-row bg-background w-full flex-1 mx-auto border overflow-hidden",
        "h-screen"
      )}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between relative gap-10 font-semibold">
            <div className="flex flex-col flex-1 overflow-y-auto">
              <Link href='/' className="flex gap-2 items-center">
                <Image
                  src={logo_2}
                  alt="FacOTTry"
                  width={40}
                  height={40}
                  className="dark:hidden"
                />
                <Image
                  src={logo_dark_2}
                  alt="FacOTTry"
                  width={40}
                  height={40}
                  className="hidden dark:block"
                />
                {open && (
                  <p className="font-bold text-2xl">
                    FacOTTry
                  </p>
                )}
              </Link>
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>

              <Separator className="my-4" />

              {open && (
                <div className="w-[97%] mx-auto mt-4 ">
                  <ProjectSelector />
                </div>
              )}
            </div>


            {open && (
              <button className="absolute right-5 bottom-5 z-50 text-zinc-800 dark:text-zinc-200" onClick={() => setOpen(false)}>
                <IconX />
              </button>
            )}
          </SidebarBody>
        </Sidebar>
        {children}
      </main>
    )
  }
}

const links = [
  {
    label: "Dashboard",
    href: "/dashboard/home",
    icon: (
      <IconDashboard className="text-zinc-700 dark:text-zinc-200 h-7 w-7 flex-shrink-0" />
    ),
  },
  {
    label: "Log Manager",
    href: "/dashboard/logs",
    icon: (
      <IconArticle className="text-zinc-700 dark:text-zinc-200 h-7 w-7 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <IconSettings className="text-zinc-700 dark:text-zinc-200 h-7 w-7 flex-shrink-0" />
    ),
  },
  {
    label: "Logout",
    href: "/auth/logout",
    icon: (
      <IconLogout2 className="text-zinc-700 dark:text-zinc-200 h-7 w-7 flex-shrink-0" />
    ),
  },
];