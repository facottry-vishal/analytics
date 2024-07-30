'use client';
import React from 'react';
import LogsFilter from '@/components/facottry/logsFilter';
import { axios_analytics } from "@/lib/axios";
import { activeFilterStore, userStore } from "@/lib/store";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect, useState } from "react";
import LogTable from './logtable';
import FilterSelector from "@/components/facottry/filterSelector";

const LogsPage = () => {
  const [parent] = useAutoAnimate({
    duration: 200,
    easing: 'ease-in-out',
  });
  const [activeFilter] = activeFilterStore(state => [state.activeFilter]);
  const [activeProject] = userStore(state => [state.activeProject]);
  const [logData, setLogData] = useState<logData>(null);

  const fetchLogs = async (filter: any) => {
    try {
      const response = await axios_analytics.post('/get-logs', {
        projectID: activeProject?.projectID,
        filter: filter
      });

      console.log(response.data.data);
      setLogData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogs(activeFilter);
  }, [activeFilter]);

  return (
    <div className="w-full h-full gap-4 flex flex-col">
      <div ref={parent} className="rounded-lg w-full flex justify-center">
        <FilterSelector />
      </div>

      <div className="my-5 flex flex-col gap-6">
        {logData && logData.map((log, index) => (
          <LogTable key={index} log={log} />
        ))}
      </div>
    </div>
  );
};

export default LogsPage;
