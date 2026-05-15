import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from "recharts";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import ProjectSection from "../components/ProjectSection";
import TaskSection from "../components/TaskSection";

import { useEffect,useState } from "react";

import axios from "axios";

export default function Dashboard(){

  const [tasks,setTasks] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  },[]);

  const fetchTasks = async () => {

    try{

      const res = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/tasks",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setTasks(res.data);

    }catch(err){

      console.log(err);

    }

  };

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

  const COLORS = [
    "#ffffff",
    "#555555"
  ];

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="p-8">

        <motion.h1
          initial={{opacity:0,y:-20}}
          animate={{opacity:1,y:0}}
          className="text-5xl font-bold mb-10"
        >
          Dashboard
        </motion.h1>

        <div className="grid grid-cols-3 gap-6">

          <motion.div
            whileHover={{scale:1.03}}
            className="glass p-6 rounded-3xl"
          >
            <h2 className="text-gray-400">
              Total Tasks
            </h2>

            <p className="text-5xl mt-4 font-bold">
              {tasks.length}
            </p>

          </motion.div>

          <motion.div
            whileHover={{scale:1.03}}
            className="glass p-6 rounded-3xl"
          >
            <h2 className="text-gray-400">
              Completed
            </h2>

            <p className="text-5xl mt-4 font-bold">
              {completed}
            </p>

          </motion.div>

          <motion.div
            whileHover={{scale:1.03}}
            className="glass p-6 rounded-3xl"
          >
            <h2 className="text-gray-400">
              Pending
            </h2>

            <p className="text-5xl mt-4 font-bold">
              {pending}
            </p>

          </motion.div>

        </div>

        <div className="grid grid-cols-2 gap-6 mt-10">

          <div className="glass p-6 rounded-3xl">

            <h2 className="text-3xl font-bold mb-5">
              Progress
            </h2>

            <PieChart width={350} height={300}>

              <Pie
                data={data}
                dataKey="value"
                outerRadius={100}
                label
              >

                {
                  data.map((entry,index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </div>

          <div className="glass p-6 rounded-3xl">

            <h2 className="text-3xl font-bold mb-5">
              Recent Activity
            </h2>

            <div className="space-y-4">

              <div className="bg-white/5 p-4 rounded-xl">
                New project created
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                Backend task completed
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                UI updated
              </div>

            </div>

          </div>

        </div>

        <ProjectSection />

        <TaskSection />

      </div>

    </div>
  );
}