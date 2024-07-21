import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Loader } from "@/components/Loader";

type CountCardProps = {
    data: {
        title: string;
        countList: { [key: string]: string };
    };
};

export default function CountCard({ data }: CountCardProps) {
    if (!data) {
        return (
            <Loader />
        )
    }
    return (
        <Card className="">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>{data?.title}</CardTitle>
                    <CardDescription >API hits based on <span className="lowercase">{data?.title}</span></CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                        View Details
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">{data?.title}</TableHead>
                            <TableHead className="text-right">COUNT</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.keys(data?.countList).map((key, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="text-left">{key}</TableCell>
                                    <TableCell className="text-right">{data?.countList[key]}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}