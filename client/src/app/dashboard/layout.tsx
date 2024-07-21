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
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logo_2 from "@/assets/logo_2.svg";
import logo_dark_2 from "@/assets/logo_dark_2.svg";
import { ProjectSelector } from "@/components/facottry/projectSelector";
import { Separator } from "@/components/ui/separator";
import DashboardNav from "./dashboardNav";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios_analytics.get('/get-user');
        setUser(userResponse.data);

        const adminResponse = await axios_analytics.get('/get-admin');
        const { company, projects } = adminResponse.data;

        setProjects(projects);
        setCompany(company);

        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        router.push(error.response?.data.code === "NO_PROJECT" ? '/' : '/');
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Loader />
    )
  } else {
    return (
      <main className={cn(
        "flex flex-col md:flex-row bg-primary-foreground w-full flex-1 mx-auto overflow-hidden text-sm",
        "h-screen"
      )}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between md:relative gap-10 font-semibold">
            <div className="flex flex-col flex-1 overflow-y-auto mt-4">
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

              {open && (<Separator className="my-4" />)}

              {open && (
                <div className="w-[97%] mx-auto mt-4 ">
                  <div className="flex flex-col gap-2 text-md">
                    <h1>Project</h1>
                    <ProjectSelector />
                  </div>
                </div>
              )}
            </div>
          </SidebarBody>
        </Sidebar>

        <div className="w-full flex flex-col gap-4 pt-5 px-10 ">
          <DashboardNav />
          {children}
        </div>
      </main >
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