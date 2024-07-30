"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";

export default function LogTable({ log }: {
  log: any
}) {

  const filter = log._id;
  const pathnames = log.pathnames

  return (
    <Card className="">
      <CardHeader className="px-7">
        <CardTitle>Logs</CardTitle>
        <CardDescription className="flex gap-2">
          {Object.keys(filter).map((key, index) => (
            <div key={index} className="text-sm mt-1 text-muted-foreground">
              {key}: {filter[key]}
            </div>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[30vh] overflow-y-scroll scrollbar-hide">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Pathnames</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {pathnames.map((pathname: any, index: number) => {
              const encodedPathname = encodeURIComponent(pathname)

              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {pathname}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    <Link href={`/dashboard/logs/${encodedPathname}`}>
                      <Button variant={'outline'}>View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


{/* <TableRow className="bg-accent">
  <TableCell>
    <div className="font-medium">Liam Johnson</div>
    <div className="hidden text-sm text-muted-foreground md:inline">
      liam@example.com
    </div>
  </TableCell>
  <TableCell className="text-right">$250.00</TableCell>
</TableRow> */}