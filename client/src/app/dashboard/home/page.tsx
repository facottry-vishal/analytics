"use client";
import FilterSelector from "@/components/facottry/filterSelector";
import { axios_analytics } from "@/lib/axios";
import { activeFilterStore, userStore } from "@/lib/store";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect, useState } from "react";
import CountCard from "./countCard";

type CountData = {
    [key: string]: {
        title: string;
        description: string;
        countList: any;
    };
} | null;

const DashboardHome = () => {
    const [parent] = useAutoAnimate({
        duration: 200,
        easing: 'ease-in-out'
    })
    const [activeFilter, setActiveFilter] = activeFilterStore(state => [state.activeFilter, state.setActiveFilter]);
    const [activeProject] = userStore(state => [state.activeProject]);
    const [countData, setCountData] = useState<CountData>(null);

    console.log(countData)

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await axios_analytics.post('/get-count', {
                    projectID: activeProject?.projectID,
                    filter: activeFilter
                });

                if(response.data.data) {
                    setCountData(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchCount();
    }, [activeFilter]);

    return (
        <div className="w-full h-full gap-4 flex flex-col">
            <div ref={parent} className="rounded-lg w-full flex justify-center mb-8">
                <FilterSelector />
            </div>

            {countData ? (
                <div ref={parent} className="grid lg:grid-cols-2 gap-4 mb-10">
                    {countData && Object.keys(countData).map((key, index) => {
                        return (
                            <CountCard key={index} data={{
                                title: key,
                                countList: countData[key]
                            }} />
                        )
                    }
                    )}
                </div>) : null}
        </div>
    );
}

export default DashboardHome;