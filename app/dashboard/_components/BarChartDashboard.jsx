"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BarChartDashboard({ budgetList }) {
  return (
    <div className="border p-5 rounded-md">
      <h2 className="text-lg font-semibold">Budget Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={budgetList}
          margin={{
            top: 20,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#4f39f6" />
          <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
