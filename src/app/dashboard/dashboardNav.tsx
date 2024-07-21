import { ModeToggle } from "@/components/ToggleTheme"
import { Button } from "@/components/ui/button"
import React from 'react'

type Props = {
    title: string
}

const DashboardNav = ({ title }: Props) => {
    return (
        <nav className="flex justify-between">
            <h1 className="text-primary text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-2 md:gap-4">
                <ModeToggle />
                <Button variant={"outline"}>Profile</Button>
            </div>
        </nav>
    )
}

export default DashboardNav