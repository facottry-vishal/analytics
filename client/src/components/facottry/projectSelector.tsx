import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { activeFilterStore, userStore } from "@/lib/store";

export function ProjectSelector() {
  const {
    projects: allProjects,
    activeProject,
    setActiveProject,
  } = userStore((state) => ({
    projects: state.projects,
    activeProject: state.activeProject,
    setActiveProject: state.setActiveProject,
  }));

  const [setActiveFilter] = activeFilterStore(state => [state.setActiveFilter]);

  const ProjectOptions = allProjects
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => ({
      value: item.projectID,
      label: `${item.name} - ${item.type}`,
    }));

  const handleProjectChange = (selectedOption: any) => {
    const project = allProjects.find((item) => item.projectID === selectedOption) || null;

    if (project) {
      setActiveProject(project);
      setActiveFilter({});
    }
  }

  return (
    <Select defaultValue={activeProject?.projectID} onValueChange={handleProjectChange}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select Project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="font-bold">Projects</SelectLabel>
          {ProjectOptions.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
