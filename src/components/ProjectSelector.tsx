"use client";
import React from "react";
import Link from "next/link";
import { userStore, globalStore } from "@/lib/store";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const ProjectSelector = () => {
  const {
    projects: allProjects,
    activeProject,
    setActiveProject,
    company,
  } = userStore((state) => ({
    projects: state.projects,
    activeProject: state.activeProject,
    setActiveProject: state.setActiveProject,
    company: state.company,
  }));
  const animatedComponents = makeAnimated();

  const {
    sidebar,
    setSidebar,
    sideDetailsCollapsed: sidebarCollapsed,
    setDetailsCollapsed: setSidebarCollapsed,
  } = globalStore((state) => ({
    sidebar: state.sidebar,
    setSidebar: state.setSidebar,
    sideDetailsCollapsed: state.sideDetailsCollapsed,
    setDetailsCollapsed: state.setDetailsCollapsed,
  }));

  const ProjectOptions = allProjects
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => ({
      value: item.projectID,
      label: `${item.name} - ${item.type}`,
    }));

  const handleProjectChange = (selectedOption) => {
    const project =
      allProjects.find((item) => item.projectID === selectedOption.value) ||
      null;
    if (project) setActiveProject(project);
  };

  return (
    <div className="mt-4">
      <Select
        options={ProjectOptions}
        onChange={handleProjectChange}
        styles={{
          singleValue: (provided) => ({
            ...provided,
            color: "#1a202c", // Tailwind gray-900 color
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "#1a202c" : "#1a202c", // Tailwind gray-900 color
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#1a202c", // Tailwind gray-900 color
          }),
          control: (provided) => ({
            ...provided,
            color: "#1a202c", // Tailwind gray-900 color
          }),
        }}
        value={ProjectOptions.find(
          (option) => option.value === activeProject?.projectID
        )}
        closeMenuOnSelect={true}
        components={animatedComponents}
      />

      <div className="flex flex-col mt-4 rounded-md text-sm items-center justify-center bg-gray-800 p-4">
        <button
          className={`bg-gray-700 text-white px-2 w-full py-1 rounded-md`}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? "Show Details" : "Hide Details"}
        </button>

        <div
          className={`rounded-md mt-2 flex flex-col gap-2 text-white collapsible-content ${
            sidebarCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
          }`}
        >
          <span>
            <h3 className="font-bold">Project ID: </h3>
            <p>{activeProject?.projectID}</p>
          </span>

          <span>
            <h3 className="font-bold">Company: </h3>
            <p>{company?.name}</p>
          </span>

          <span>
            <h3 className="font-bold">Project Name: </h3>
            <p>{activeProject?.name}</p>
          </span>

          <span>
            <h3 className="font-bold">Project Type: </h3>
            <p>{activeProject?.type}</p>
          </span>

          <span>
            <h3 className="font-bold">Project Role: </h3>
            <p>{activeProject?.role}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectSelector;
