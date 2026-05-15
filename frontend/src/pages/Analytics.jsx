import Sidebar from "../components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

export default function Analytics(){

  const tasks = JSON.parse(
    sessionStorage.getItem("tasks")
  ) || [];

  const completed = tasks.filter(
    t => t.status === "Completed"
  ).length;

  const pending = tasks.filter(
    t => t.status === "Pending"
  ).length;

  const data = [
    {
      name:"Completed",
      value:completed
    },
    {
      name:"Pending",
      value:pending
    }
  ];

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="ml-72 p-10">

        <h1 className="text-5xl font-bold mb-10">
          Analytics
        </h1>

        <div className="bg-[#111827] p-10 rounded-3xl w-fit">

          <PieChart width={400} height={400}>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={140}
              label
            >

              <Cell fill="#6366f1" />
              <Cell fill="#8b5cf6" />

            </Pie>

            <Tooltip />

          </PieChart>

        </div>

      </div>

    </div>
  );
}