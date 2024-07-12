"use client";
import React from "react";
import { userStore } from "@/lib/store";
import Link from "next/link";
import Filter from "@/Components/Filter";
import ProjectSelector from "@/Components/ProjectSelector";

const Home = () => {
  const [user, projects, company] = userStore((state) => [
    state.user,
    state.projects,
    state.company,
  ]);

  console.log(projects);

  return (
    <div className="mx-5">
      <nav className="flex justify-between items-center mt-5">
        <div>
          <Link href={'/'} className="font-bold text-xl">Facottry Analytics</Link>
        </div>

        <div className="flex gap-2 items-center">
          <ul className="flex gap-2">
            <Link
              href="/auth/logout"
              className="font-semibold hover:bg-gray-100 transition-all border rounded-md p-2 text-primary600"
            >
              Logout
            </Link>
          </ul>
        </div>
      </nav>

      <hr className="my-5" />

      {/* User */}
      <div>
        <ul>
          <li>{user.email}</li>
          <li>{user.name}</li>
        </ul>
      </div>

      <hr className="my-5" />

      {/* Filter */}
      <Filter />

      <hr className="my-5" />

      {/* Project Selector */}
      <div className="max-w-sm">
        <ProjectSelector />
      </div>
    </div>
  );
};

export default Home;
