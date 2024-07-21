"use client";
import { DateRangePicker } from "@/components/facottry/dateRangePicker";
import FilterSelector from "@/components/facottry/filterSelector";
import { Select } from "@/components/ui/select";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from "react";

const DashboardHome = () => {
    const [parent] = useAutoAnimate({
        duration: 100,
        easing: 'ease-in-out'
    })

    return (
        <div className="w-full h-full gap-4 flex flex-col">
            <div className="rounded-lg w-full flex justify-center mb-8">
                <FilterSelector />
            </div>
        </div>
    );
}

export default DashboardHome;