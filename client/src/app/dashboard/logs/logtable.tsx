import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  logData: logData;
}

const LogTable = ({ logData }: Props) => {
  console.log(logData);

  return (
    <Table>
      <TableHeader>
        <TableRow className="">
          <TableHead className="w-[100px]">Filters</TableHead>
          <TableHead className="w-[100px]">Pathname</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logData?.map((log, index) => (
          <TableRow key={index}>
            <TableCell>
              {Object.keys(log._id).map((key, index) => (
                <div>{key} : {log._id[key]}</div>
              ))}
            </TableCell>

            <TableCell>
              {log.pathnames.map((pathname, index) => (
                <div>{pathname}</div>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LogTable;
