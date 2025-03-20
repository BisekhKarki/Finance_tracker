// // "use client";

// // import AddTransaction from "./components/AddTransaction";
// // import Data from "./components/Data";

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { toast } from "react-toastify";
// // import EditTransaction from "./components/EditTransactions";

// // interface Transaction {
// //   _id: string;
// //   type: string;
// //   userId: string;
// //   Amount: number;
// //   Category: string;
// //   Description: string;
// //   Date: string;
// // }

// // export default function Home() {
// //   const [data, setData] = useState<Array<Transaction> | []>([]);
// //   const router = useRouter();
// //   const [userId, setUserId] = useState<string>("");
// //   const [update, setUpdate] = useState<boolean>(false);
// //   const [updateVal, setUpdateVal] = useState<Transaction | null>(null);
// //   const [itemId, setItemId] = useState<string>("");

// //   useEffect(() => {
// //     const token = localStorage.getItem("Token");
// //     if (token && token.length > 0) {
// //       const parsedToken = JSON.parse(atob(token.split(".")[1] as string));
// //       if (parsedToken.exp * 1000 < Date.now()) {
// //         localStorage.removeItem("Token");
// //         router.push("/login");
// //       } else {
// //         setUserId(parsedToken.id);
// //       }
// //     } else {
// //       router.push("/login");
// //     }
// //   }, [router]);

// //   const getData = async () => {
// //     try {
// //       const response = await fetch(
// //         "http://localhost:4000/api/finance/getSingle",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ userId }),
// //         }
// //       );
// //       const val = await response.json();
// //       if (response.ok) {
// //         setData(val.message);
// //       }
// //     } catch (error: unknown) {
// //       toast.error(String(error));
// //     }
// //   };

// //   useEffect(() => {
// //     if (userId) {
// //       getData();
// //     }
// //   }, []);

// //   return (
// //     <div className="py-5 flex px-32 gap-10">
// //       {update ? (
// //         <EditTransaction
// //           setData={setData}
// //           updateVal={updateVal}
// //           itemId={itemId}
// //           update={update}
// //           setUpdate={setUpdate}
// //         />
// //       ) : (
// //         <AddTransaction setData={setData} />
// //       )}
// //       <Data
// //         data={data}
// //         setData={setData}
// //         setUpdate={setUpdate}
// //         update={update}
// //         setUpdateVal={setUpdateVal}
// //         setItemId={setItemId}
// //       />
// //     </div>
// //   );
// // }

// "use client";

// import AddTransaction from "./components/AddTransaction";
// import Data from "./components/Data";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import EditTransaction from "./components/EditTransactions";

// interface Transaction {
//   _id: string;
//   type: string;
//   userId: string;
//   Amount: number;
//   Category: string;
//   Description: string;
//   Date: string;
// }

// export default function Home() {
//   const [data, setData] = useState<Array<Transaction> | []>([]);
//   const router = useRouter();
//   const [userId, setUserId] = useState<string>("");
//   const [update, setUpdate] = useState<boolean>(false);
//   const [updateVal, setUpdateVal] = useState<Transaction | null>(null);
//   const [itemId, setItemId] = useState<string>("");

//   useEffect(() => {
//     const token = localStorage.getItem("Token");
//     if (token && token.length > 0) {
//       const parsedToken = JSON.parse(atob(token.split(".")[1] as string));
//       if (parsedToken.exp * 1000 < Date.now()) {
//         localStorage.removeItem("Token");
//         router.push("/login");
//       } else {
//         setUserId(parsedToken.id);
//       }
//     } else {
//       router.push("/login");
//     }
//   }, [router]);

//   const getData = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:4000/api/finance/getSingle",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userId }),
//         }
//       );
//       const val = await response.json();
//       if (response.ok) {
//         setData(val.message);
//       }
//     } catch (error: unknown) {
//       toast.error(String(error));
//     }
//   };

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(() => {
//     if (userId) {
//       getData();
//     }
//   }, []);

//   return (
//     <div className="py-5 flex px-32 gap-10">
//       {update ? (
//         <EditTransaction
//           setData={setData}
//           updateVal={updateVal!} // Non-null assertion
//           itemId={itemId}
//           update={update}
//           setUpdate={setUpdate}
//         />
//       ) : (
//         <AddTransaction setData={setData as (data: Transaction[]) => void} /> // Type assertion
//       )}
//       <Data
//         data={data}
//         setData={setData}
//         setUpdate={setUpdate}
//         update={update}
//         setUpdateVal={setUpdateVal}
//         setItemId={setItemId}
//       />
//     </div>
//   );
// }

"use client";

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
  const [data, setData] = useState<Array<Transaction> | []>([]);
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
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  useEffect(() => {
    if (userId) {
      getData();
    }
  }); // Added userId to dependency array

  return (
    <div className="py-5 flex px-32 gap-10">
      {update ? (
        <EditTransaction
          setData={setData}
          updateVal={updateVal!} // Non-null assertion (safe if updateVal is set when update is true)
          itemId={itemId}
          update={update}
          setUpdate={setUpdate}
        />
      ) : (
        <AddTransaction
          setData={(newData: Omit<Transaction, "_id">[]) =>
            setData([...data, ...newData.map((d) => ({ ...d, _id: "" }))])
          }
        />
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
