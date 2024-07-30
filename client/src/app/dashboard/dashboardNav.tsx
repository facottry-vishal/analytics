import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import Link from "next/link"

const truncateSegment = (segment: string, maxLength: number = 11) => {
    return segment.length > maxLength ? `${segment.substring(0, maxLength)}...` : segment;
};

const DashboardNav = () => {
    const path = usePathname();
    const pathSegments = path.split("/").filter(Boolean);

    return (
        <nav className="justify-between items-center hidden md:flex">
            <Breadcrumb className="font-semibold">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Main</BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathSegments.map((segment, index) => {
                        const href = "/" + pathSegments.slice(0, index + 1).join("/");
                        return (
                            <React.Fragment key={index}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem className="capitalize">
                                    {index === pathSegments.length - 1 ? (
                                        <span>{truncateSegment(segment)}</span>
                                    ) : (
                                        <Link href={href}>{truncateSegment(segment)}</Link>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-2 md:gap-4">
                <ModeToggle />
                {/* <Button variant={"outline"}>Profile</Button> */}
            </div>
        </nav>
    )
}

export default DashboardNav