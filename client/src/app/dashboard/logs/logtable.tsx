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

const LogTable = ({ logs }) => {
  console.log('LogTable logs:', logs); // Add this line to check the logs received

  return (
    <Table>
      <TableCaption>A list of your recent logs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Pathname</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log._id}>
            <TableCell className="font-medium">{log._id}</TableCell>
            <TableCell>{log.status}</TableCell>
            <TableCell>{log.method}</TableCell>
            <TableCell className="text-right">{log.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LogTable;
