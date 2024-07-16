"use client";
import React from "react";
import { userStore } from "@/lib/store";
import Link from "next/link";
import ProjectSelector from "@/Components/ProjectSelector";
import Filter from "@/Components/Filter";
import Sidebar from "@/Components/Sidebar";
import LogTable from "@/Components/dashboard/LogTable";

const LogManager = () => {
  const [user] = userStore((state) => [state.user]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="flex-none">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow px-7 py-5 bg-gray-100 text-black overflow-auto">
        <nav className="flex justify-between items-center mt-5">
          <div>
            <Link href={'/'} className="font-bold text-2xl">Dashboard</Link>
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
        {/* Filter */}
        <div className="flex flex-col items-center">
          <Filter />
          <div className="py-8 my-5">
            <LogTable />
          </div>
        </div>
        <hr className="my-5" />
        {/* Project Selector */}
      </div>
    </div>
  );
};

export default LogManager;