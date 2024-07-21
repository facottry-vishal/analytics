"use client";
import { DateRangePicker } from "@/components/facottry/dateRangePicker";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from "react";

const DashboardHome = () => {
    const [parent] = useAutoAnimate({
        duration: 100,
        easing: 'ease-in-out'
    })

    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["react", "angular"]);

    return (
        <div className="w-full h-full gap-4 flex flex-col">
            <div className="flex items-center px-5 py-2 bg-primary-foreground justify-end rounded-lg">
                <DateRangePicker />
            </div>

            <div className="bg-primary-foreground rounded-lg h-full mb-8">
            </div>
        </div>
    );
}

export default DashboardHome;