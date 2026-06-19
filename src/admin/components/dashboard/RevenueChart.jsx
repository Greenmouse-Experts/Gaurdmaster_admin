import React, { useState } from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as chartjs } from "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../services/api/authApi";

const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => currentYear - i);

const buildMonthlyTotals = (payload) => {
  const totals = new Array(12).fill(0);
  const entries = Array.isArray(payload) ? payload : payload?.data;

  if (!Array.isArray(entries)) return totals;

  entries.forEach((entry, index) => {
    if (typeof entry === "number") {
      totals[index] = entry;
      return;
    }
    const month = entry?.month ?? index + 1;
    const value = entry?.revenue ?? entry?.total ?? entry?.amount ?? 0;
    if (month >= 1 && month <= 12) {
      totals[month - 1] = value;
    }
  });

  return totals;
};

const RevenueChart = () => {
  const [year, setYear] = useState(currentYear);

  const { data } = useQuery({
    queryKey: ["monthly-revenue", year],
    queryFn: async () => {
      const resp = await apiClient.get("/transactions/monthly-revenue", {
        params: { year },
      });
      return resp.data;
    },
  });

  const chartData = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: "Revenue",
        data: buildMonthlyTotals(data),
        backgroundColor: ["#192F59"],
        borderColor: ["#192F59"],
        fill: {
          target: "origin",
          above: "#192f5942",
          below: "#192f5942",
        },
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bar_admin">
      <div className="flex items-center justify-between">
        <h2>This Year Revenue</h2>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border border-gray-200 rounded-lg px-2 py-1 text-sm"
        >
          {YEAR_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="bar_div">
        <Line
          data={chartData}
          options={options}
          style={{ width: "inherit", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default RevenueChart;
