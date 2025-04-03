"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AddTransaction from "./components/AddTransaction";
import Data from "./components/Data";
import EditTransaction from "./components/EditTransactions";
import { baseUrl } from "@/lib/BaseUrl";

interface Transaction {
  _id: string;
  type: string;
  userId: string;
  Amount: number;
  Category: string;
  Description: string;
  Date: string;
}

export default function Home() {
  const [data, setData] = useState<Transaction[]>([]);
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);
  const [updateVal, setUpdateVal] = useState<Transaction | null>(null);
  const [itemId, setItemId] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token && token.length > 0) {
      const parsedToken = JSON.parse(atob(token.split(".")[1] as string));
      if (parsedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("Token");
        router.push("/login");
      } else {
        setUserId(parsedToken.id);
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (!userId) return;

    // ✅ Define `getData` inside `useEffect` to avoid dependency issues
    const getData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/finance/getSingle`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        const val = await response.json();
        if (response.ok) {
          setData(val.message);
        }
      } catch (error: unknown) {
        toast.error(String(error));
      }
    };

    getData();
  }, [userId]); // ✅ Only depends on `userId`

  return (
    <div className="py-5 flex px-32 gap-10">
      {update ? (
        <EditTransaction
          setData={setData}
          updateVal={updateVal}
          itemId={itemId}
          setUpdate={setUpdate}
        />
      ) : (
        <AddTransaction setData={setData} />
      )}
      <Data
        data={data}
        setData={setData}
        setUpdate={setUpdate}
        update={update}
        setUpdateVal={setUpdateVal}
        setItemId={setItemId}
      />
    </div>
  );
}
