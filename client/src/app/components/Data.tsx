import { Pencil, Trash2 } from "lucide-react";
import React from "react";
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

const Data = () => {
  return (
    <div className="w-full">
      {/* Wrapper for rounded corners and shadow */}
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-200">
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-center">INV001</TableCell>
              <TableCell className="text-center">Paid</TableCell>
              <TableCell className="text-center">Credit Card</TableCell>
              <TableCell className="text-center">$250.00</TableCell>
              <TableCell className="text-center">$250.00</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Pencil className="text-yellow-600 cursor-pointer" />
                  <Trash2 className="text-red-600 cursor-pointer" />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Data;
