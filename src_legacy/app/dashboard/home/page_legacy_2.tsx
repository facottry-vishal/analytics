"use client";
import React from "react";
import { userStore } from "@/lib/store";
import Link from "next/link";
import Cards from "@/components/Card.jsx";
import Filter from "@/components/Filter";

const Home = () => {
  const [user] = userStore((state) => [state.user]);

  return (
    <div className="flex h-screen overflow-hidden">

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
            <Cards />
          </div>
        </div>
        <hr className="my-5" />
        {/* Project Selector */}
      </div>
    </div>
  );
};

export default Home;
