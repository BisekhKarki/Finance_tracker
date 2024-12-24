"use client";
import Image from "next/image";
import AddTransaction from "./components/AddTransaction";
import Data from "./components/Data";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      const parsedToken = JSON.parse(atob(token.split(".")[1] as string));
      if (parsedToken.exp * 1000 < Date.now()) {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <Provider store={store}>
      <div className="py-5 flex px-32 gap-10">
        <AddTransaction />
        <Data />
      </div>
    </Provider>
  );
}
