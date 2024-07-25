'use client';
import React from 'react';
import LogsFilter from '@/components/facottry/logsFilter';
import { axios_analytics } from "@/lib/axios";
import { activeFilterStore, userStore } from "@/lib/store";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect, useState } from "react";
import LogTable from './logtable';

const LogsPage = () => {
  const [parent] = useAutoAnimate({
    duration: 200,
    easing: 'ease-in-out',
  });
  const [activeFilter, setActiveFilter] = activeFilterStore(state => [state.activeFilter]);
  const [activeProject] = userStore(state => [state.activeProject]);
  const [logData, setLogData] = useState(null);

  const fetchLogs = async (filter) => {
    try {
      const response = await axios_analytics.post('/get-logs', {
        projectID: activeProject?.projectID,
        filter: filter
      });
      console.log('fetchLogs response:', response.data); // Add this line to check the response

      if (response.data.data) {
        setLogData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogs(activeFilter);
  }, [activeFilter]);

  return (
    <div className="w-full h-full gap-4 flex flex-col">
      <div ref={parent} className="rounded-lg w-full flex justify-center mb-8">
        <LogsFilter onApplyFilter={fetchLogs} />
      </div>

      {logData ? (
        <div ref={parent} className="grid lg:grid-cols-1 gap-4 mb-10">
          <LogTable logs={logData} />
        </div>
      ) : (
        <p>No logs available</p> // Add this line to indicate no logs
      )}
    </div>
  );
};

export default LogsPage;
