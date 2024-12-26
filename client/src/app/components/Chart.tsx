"use client";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import React from "react";

interface Transaction {
  _id: string;
  type: string;
  userId: string;
  Amount: number;
  Category: string;
  Description: string;
  Date: string;
}

interface Props {
  Data: Transaction[];
}

const Chart = ({ Data }: Props) => {
  // Prepare data for BarChart (e.g., sum amounts by categories)
  const categories = Array.from(new Set(Data.map((item) => item.Category)));

  const barChartData = categories.map((category) => {
    const total = Data.filter((item) => item.Category === category).reduce(
      (sum, item) => sum + item.Amount,
      0
    );
    return total;
  });

  // Prepare data for PieChart (group amounts by type)
  const incomeTotal = Data.filter((item) => item.type === "Income").reduce(
    (sum, item) => sum + item.Amount,
    0
  );

  const expenseTotal = Data.filter((item) => item.type === "Expenses").reduce(
    (sum, item) => sum + item.Amount,
    0
  );

  const totalAmount = incomeTotal + expenseTotal;

  const pieChartData = [
    {
      id: "Income",
      value: incomeTotal,
      label: `Income (${((incomeTotal / totalAmount) * 100).toFixed(2)}%)`,
    },
    {
      id: "Expenses",
      value: expenseTotal,
      label: `Expenses (${((expenseTotal / totalAmount) * 100).toFixed(2)}%)`,
    },
  ];

  return (
    <div className="bg-white border mt-5 rounded-xl shadow-xl p-5">
      {/* Bar Chart */}
      <h1 className="text-center mb-5 font-bold text-xl">
        Category-wise Spending
      </h1>
      <BarChart
        className="w-full"
        xAxis={[
          {
            id: "barCategories",
            data: categories,
            scaleType: "band",
            label: "Categories",
          },
        ]}
        yAxis={[
          {
            id: "barAmounts",
            label: "Amount ($)",
          },
        ]}
        series={[
          {
            data: barChartData,
            label: "Total Amount",
          },
        ]}
        width={600}
        height={300}
      />

      <hr className="my-8" />

      {/* Pie Chart */}
      <h1 className="text-center mb-5 font-bold text-xl">Income vs Expenses</h1>
      <PieChart
        className="w-full"
        series={[
          {
            data: pieChartData,
          },
        ]}
        width={400}
        height={300}
      />
    </div>
  );
};

export default Chart;
