'use client'
import { axios_analytics } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userStore, activeFilterStore } from "@/lib/store";
import { Loader } from "@/components/Loader";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/aceternity/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logo_2 from "@/assets/logo_2.svg";
import logo_dark_2 from "@/assets/logo_dark_2.svg";

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
          <SidebarBody className="justify-between gap-10">
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
                  <p className="font-extrabold text-xl">
                    Fac<span className="">OTT</span>ry
                  </p>
                )}
              </Link>
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "User",
                  href: "#",
                  icon: (
                    <Image
                      src="https://res.cloudinary.com/djqdugthw/image/upload/v1721501933/thumbs-1688889944751_w9xb0e_qxawuv.svg"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
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
    href: "#",
    icon: (
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Profile",
    href: "#",
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Logout",
    href: "#",
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];