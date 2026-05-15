import Sidebar from "../components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

import { motion } from "framer-motion";

export default function Dashboard(){

  const role = localStorage.getItem("role");

  const data = [
    {name:"Completed",value:80},
    {name:"Pending",value:20}
  ];

  return (

    <div className="bg-[#0f172a] min-h-screen text-white">

      <Sidebar />

      <div className="ml-72 p-10">

        <motion.div
          initial={{opacity:0,y:-20}}
          animate={{opacity:1,y:0}}
        >

          <h1 className="text-5xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Manage projects smarter and faster.
          </p>

        </motion.div>

        <div className="grid grid-cols-3 gap-6 mt-10">

          <motion.div
            whileHover={{y:-5}}
            className="bg-[#111827] p-6 rounded-3xl"
          >

            <p className="text-gray-400">
              Productivity
            </p>

            <h1 className="text-5xl font-bold mt-4">
              87%
            </h1>

          </motion.div>

          <motion.div
            whileHover={{y:-5}}
            className="bg-[#111827] p-6 rounded-3xl"
          >

            <p className="text-gray-400">
              Tasks Completed
            </p>

            <h1 className="text-5xl font-bold mt-4">
              24
            </h1>

          </motion.div>

          <motion.div
            whileHover={{y:-5}}
            className="bg-[#111827] p-6 rounded-3xl"
          >

            <p className="text-gray-400">
              Team Members
            </p>

            <h1 className="text-5xl font-bold mt-4">
              8
            </h1>

          </motion.div>

        </div>

        <div className="grid grid-cols-2 gap-6 mt-10">

          <div className="bg-[#111827] p-6 rounded-3xl">

            <h2 className="text-3xl font-bold mb-5">
              Progress
            </h2>

            <PieChart width={300} height={300}>

              <Pie
                data={data}
                dataKey="value"
                outerRadius={100}
                label
              >

                <Cell fill="#6366f1" />
                <Cell fill="#8b5cf6" />

              </Pie>

              <Tooltip />

            </PieChart>

          </div>

          <div className="bg-[#111827] p-6 rounded-3xl">

            <h2 className="text-3xl font-bold mb-5">
              Recent Activity
            </h2>

            <div className="space-y-4">

              <div className="bg-[#1f2937] p-4 rounded-2xl">
                Rahul completed dashboard UI
              </div>

              <div className="bg-[#1f2937] p-4 rounded-2xl">
                New project created
              </div>

              <div className="bg-[#1f2937] p-4 rounded-2xl">
                API deployed successfully
              </div>

            </div>

          </div>

        </div>

        {
          role === "Admin" && (

            <div className="mt-10 bg-[#111827] p-6 rounded-3xl">

              <h1 className="text-3xl font-bold mb-5">
                Admin Controls
              </h1>

              <div className="flex gap-5">

                <button className="bg-indigo-500 px-6 py-3 rounded-2xl">
                  Create Project
                </button>

                <button className="bg-purple-500 px-6 py-3 rounded-2xl">
                  Create Task
                </button>

              </div>

            </div>

          )
        }

      </div>

    </div>
  );
}