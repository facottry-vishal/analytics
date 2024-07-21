'use client'
import React, { useEffect, useState } from 'react';
import { userStore } from '@/lib/store';
import Link from 'next/link';
import LogFilter from '@/components/LogFilters';
import Sidebar from '@/components/Sidebar';
import LogTable from '@/components/dashboard/LogTable';
import axios from 'axios';

const LogManager = () => {
  const [user] = userStore((state) => [state.user]);
  const [logs, setLogs] = useState([]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-none">
        <Sidebar />
      </div>
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
        <div className="flex flex-col items-center">
          <LogFilter />
          <div className="py-8 my-5 mx-5 px-8 w-full overflow-hidden">
            <LogTable logs={logs} />
          </div>
        </div>
        <hr className="my-5" />
      </div>
    </div>
  );
};

export default LogManager;
