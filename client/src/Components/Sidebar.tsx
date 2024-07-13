'use client';
import React, { useState } from 'react';
import { FiHome, FiPlayCircle, FiBarChart2, FiFileText, FiShoppingCart, FiDollarSign, FiPhone, FiSettings, FiFolder } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import logo_2 from '@/assets/logo_2.svg';
import logo_dark_2 from '@/assets/logo_dark_2.svg';
import { userStore, globalStore } from "@/lib/store";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ProjectSelector from './ProjectSelector';

const SidebarButton = ({ href, label, icon, target }) => (
  <Link href={href} target={target} className="flex items-center p-3 hover:text-primary transition">
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
  const animatedComponents = makeAnimated();
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
    <div className="w-80 bg-white p-8 pl-5 dark:bg-darkblue h-auto">
      <button className="flex gap-2 items-center mb-8">
        <Image
          src={logo_2}
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
        <p className="font-extrabold text-2xl text-black dark:text-white">
          Fac<span className="text-primary">OTT</span>ry
        </p>
      </button>

      <div className="font-medium text-slate-700 dark:text-white">
        <SidebarButton href="/dashboard/home" label="Dashboard" icon={<FiHome />} />
        <SidebarButton href="/dashboard/playground" label="Playground" icon={<FiPlayCircle />} />
        <SidebarButton href="/dashboard/settings/project" label="Project Settings" icon={<FiSettings />} />
        <SidebarButton href="/dashboard/settings/company" label="Company Settings" icon={<FiSettings />} />
      </div>

      <hr className="mt-4 w-full" />

      <div className="mt-4">
        <ProjectSelector/>

        <Link href="/dashboard/project" className="mt-4 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-center hover:bg-gray-100 transition-all">
          Add Project
        </Link>

        
      </div>
    </div>
  );
};

export default Sidebar;
