"use client";
import { baseUrl } from "@/lib/BaseUrl";
import { User, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

// Define the type for a transaction
interface Transaction {
  _id: string;
  type: "Income" | "Expenses";
  Amount: string; // Adjust the type if needed based on actual response structure
  Category: string;
  Description: string;
  Date: string;
}

const Navbar = () => {
  const [show, hide] = useState<boolean>(false);
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [transactions, setTransaction] = useState<Transaction[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token && token.length > 0) {
      const parsedToken = JSON.parse(atob(token.split(".")[1] as string));
      if (parsedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("Token");
        router.push("/login");
      } else {
        setUserId(parsedToken.id);
        setToken(token);
      }
    }
  }, [router]);

  const getUserTransaction = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/api/finance/getSingle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (response.ok) {
        setTransaction(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  }, [userId]);

  const resetDataOnLogout = () => {
    setTransaction([]); // Reset transactions
    setUserId(""); // Clear userId
    setToken(""); // Clear token
  };

  useEffect(() => {
    if (userId) {
      getUserTransaction();
    }
  }, [userId, token, getUserTransaction]);

  const totalIncome = transactions.reduce(
    (prev: number, curr: Transaction) =>
      curr.type === "Income" ? prev + parseFloat(curr.Amount) : prev,
    0
  );

  const totalExpenses = transactions.reduce(
    (prev: number, curr: Transaction) =>
      curr.type === "Expenses" ? prev + parseFloat(curr.Amount) : prev,
    0
  );

  const netBalace = totalIncome - totalExpenses;

  return (
    <div className="bg-white shadow flex items-center justify-between px-32 py-3 text-2xl">
      <div className="font-bold flex gap-2 items-center">
        <Wallet className="text-blue-500 " width={35} height={35} />
        <h2>Finance Tracker</h2>
      </div>
      {token && token.length > 0 ? (
        <div className="flex gap-10 text-base">
          <div>
            <p className="text-gray-500">Total Income</p>
            <p className={totalIncome < 0 ? "text-red-600" : "text-green-600"}>
              ${totalIncome}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Expenses</p>
            <p
              className={totalExpenses > 0 ? "text-red-600" : "text-green-600"}
            >
              $({totalExpenses})
            </p>
          </div>
          <div>
            <p className="text-gray-500">Net Balance</p>
            <p className={netBalace < 0 ? "text-red-600" : "text-green-600"}>
              $({netBalace})
            </p>
          </div>
        </div>
      ) : (
        <div className="flex gap-10 text-base">
          <div>
            <p className="text-gray-500">Total Income</p>
            <p className={"text-green-600"}>$0</p>
          </div>
          <div>
            <p className="text-gray-500">Total Expenses</p>
            <p className={"text-red-600"}>$0</p>
          </div>
          <div>
            <p className="text-gray-500">Net Balance</p>
            <p className={"text-green-600"}>$0</p>
          </div>
        </div>
      )}
      <div className="relative">
        <User className="cursor-pointer" onClick={() => hide(!show)} />
        {show && token && token?.length > 0 && (
          <div className="absolute top-4 left-3 w-32 z-[1000] ">
            <ul className="bg-white shadow-2xl rounded-xl px-5 py-2 text-sm space-y-1 border border-gray-300">
              <li className="cursor-pointer">My Profile</li>
              <li>
                <hr className="w-full" />
              </li>
              <li
                className="cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("Token");
                  router.push("/login");
                  resetDataOnLogout();
                  hide(false);
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
