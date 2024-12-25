import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Chart from "./Chart";

interface Transaction {
  _id: string;
  type: string;
  userId: string;
  Amount: number;
  Category: string;
  Description: string;
  Date: string;
}

interface Values {
  data: Transaction[];
  setData: (data: any) => void;
  setUpdate: (update: boolean) => void;
  update: boolean;
  setUpdateVal: (data: any) => void;
  setItemId: (itemId: String) => void;
}

const Data = ({
  data,
  setData,
  setUpdate,
  update,
  setUpdateVal,
  setItemId,
}: Values) => {
  const router = useRouter();

  const deleteItem = async (id: String) => {
    try {
      const reponse = await fetch(
        `http://localhost:4000/api/finance/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const datas = await reponse.json();
      if (reponse.ok) {
        toast.success(datas.message);
        setData((prev: Transaction[]) => prev.filter((p: any) => p._id !== id));
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

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
          {data && data.length > 0 ? (
            data.map((d, k) => (
              <TableBody key={k}>
                <TableRow>
                  <TableCell className="font-medium text-center">
                    {d.Date}
                  </TableCell>
                  <TableCell className="text-center">{d.type}</TableCell>
                  <TableCell className="text-center">{d.Category}</TableCell>
                  <TableCell className="text-center">{d.Description}</TableCell>
                  <TableCell className="text-center">{d.Amount}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Pencil
                        className="text-yellow-600 cursor-pointer"
                        onClick={() => {
                          setUpdate(!update);
                          setItemId(d._id);
                          setUpdateVal({
                            _id: d._id,
                            type: d.type,
                            Amount: d.Amount,
                            Category: d.Category,
                            Description: d.Description,
                            Date: d.Date,
                          });
                        }}
                      />
                      <Trash2
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteItem(d._id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <TableBody className="text-center">
              <TableRow className="text-center">
                <TableCell>No Transactaion available</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
      <Chart />
    </div>
  );
};

export default Data;
