import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import ProjectSection from "../components/ProjectSection";
import TaskSection from "../components/TaskSection";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchTasks();

    const interval = setInterval(() => {
      fetchTasks();
    }, 2000);

    return () => clearInterval(interval);

  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (

    <div>

      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">

        <h1 className="text-4xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-5">

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold">
              Total Tasks
            </h2>

            <p className="text-3xl mt-3">
              {totalTasks}
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold">
              Completed Tasks
            </h2>

            <p className="text-3xl mt-3 text-green-600">
              {completedTasks}
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold">
              Pending Tasks
            </h2>

            <p className="text-3xl mt-3 text-red-500">
              {pendingTasks}
            </p>

          </div>

        </div>

        <ProjectSection />

        <TaskSection />

      </div>

    </div>

  );

}