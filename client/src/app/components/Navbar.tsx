import { User, Wallet } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white shadow flex items-center justify-between px-32 py-3 text-2xl">
      <div className="font-bold flex gap-2 items-center">
        <Wallet className="text-blue-500 " width={35} height={35} />
        <h2>Finance Tracker</h2>
      </div>
      <div className="flex gap-10 text-base">
        <div>
          <p className="text-gray-500">Total Income</p>
          <p className="text-gray-700">+$000.00</p>
        </div>
        <div>
          <p className="text-gray-500">Total Expenses</p>
          <p className="text-gray-700">+$000.00</p>
        </div>
        <div>
          <p className="text-gray-500">Net Balance</p>
          <p className="text-gray-700">+$000.00</p>
        </div>
      </div>
      <div>
        <User className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
