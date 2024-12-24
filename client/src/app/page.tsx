"use client";
import Image from "next/image";
import AddTransaction from "./components/AddTransaction";
import Data from "./components/Data";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import EditTransaction from "./components/EditTransactions";

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
  const [userId, setUserId] = useState<String>("");
  const [update, setUpdate] = useState<boolean>(false);
  const [updateVal, setUpdateVal] = useState<[] | any>([]);
  const [itemId, setItemId] = useState<String>("");

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

  const getData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/finance/getSingle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );
      const val = await response.json();
      if (response.ok) {
        setData(val.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getData();
    }
  }, [userId, router]);

  return (
    <div className="py-5 flex px-32 gap-10">
      {update ? (
        <EditTransaction
          setData={setData}
          updateVal={updateVal}
          itemId={itemId}
          update={update}
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
