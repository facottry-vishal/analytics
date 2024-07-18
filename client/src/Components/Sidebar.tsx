'use client';
import React from 'react';
import { FiHome, FiPlayCircle, FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import logo_2 from '@/assets/logo_2.svg';
import logo_dark_2 from '@/assets/logo_dark_2.svg';
import { userStore, globalStore } from "@/lib/store";
import ProjectSelector from './ProjectSelector';

const SidebarButton = ({ href, label, icon, target }) => (
  <Link href={href} target={target} className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition">
    <span className="mr-3 text-xl">{icon}</span>
    {label}
  </Link>
);

const Sidebar = () => {
  const { projects: allProjects, activeProject, setActiveProject, company } = userStore(state => ({
    projects: state.projects,
    activeProject: state.activeProject,
    setActiveProject: state.setActiveProject,
    company: state.company
  }));
  const { sidebarCollapsed, setSidebarCollapsed } = globalStore(state => ({
    sidebarCollapsed: state.sideDetailsCollapsed,
    setSidebarCollapsed: state.setDetailsCollapsed
  }));

  const handleProjectChange = (selectedOption) => {
    const project = allProjects.find((item) => item.projectID === selectedOption.value) || null;
    if (project) setActiveProject(project);
  };

  const ProjectOptions = allProjects
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => ({
      value: item.projectID,
      label: `${item.name} - ${item.type}`,
    }));

  return (
    <div className="w-80 bg-white dark:bg-darkblue p-8 pl-5 h-auto">
      <button className="flex gap-2 items-center mb-8">
        <Image
          src={logo_dark_2}
          alt="FacOTTry"
          width={50}
          height={50}
          className="dark:hidden"
        />
        <Image
          src={logo_dark_2}
          alt="FacOTTry"
          width={50}
          height={50}
          className="hidden dark:block"
        />
        <p className="font-extrabold text-2xl text-black">
          Fac<span className="text-primary">OTT</span>ry
        </p>
      </button>

      <div className="font-medium text-black-700">
        <SidebarButton href="/dashboard/home" label="Dashboard" icon={<FiHome />} />
        <SidebarButton href="/dashboard/playground" label="Playground" icon={<FiPlayCircle />} />
        <SidebarButton href="/dashboard/settings/project" label="Project Settings" icon={<FiSettings />} />
        <SidebarButton href="/dashboard/settings/company" label="Company Settings" icon={<FiSettings />} />
      </div>

      <hr className="mt-4 w-full border-gray-300 dark:border-gray-700" />

      <div className="mt-4">
        <ProjectSelector/>

        <Link href="/dashboard/project" className="mt-4 block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
          Add Project
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
