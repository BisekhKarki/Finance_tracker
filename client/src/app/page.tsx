"use client";
import Image from "next/image";
import AddTransaction from "./components/AddTransaction";
import Data from "./components/Data";
import { Provider } from "react-redux";
import store from "./store/index.js";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="py-5 flex px-32 gap-10">
        <AddTransaction />
        <Data />
      </div>
    </Provider>
  );
}
