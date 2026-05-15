import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

import {
  FaTasks,
  FaFolderOpen,
  FaCheckCircle
} from "react-icons/fa";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  const user = JSON.parse(
    sessionStorage.getItem("user")
  );

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const taskRes = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/tasks",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      const projectRes = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/projects",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setTasks(taskRes.data);

      setProjects(projectRes.data);

      setLoading(false);

    } catch(err){

      console.log(err);

      setLoading(false);

    }

  };

  const completedTasks = tasks.filter(
    (task)=>
      task.status === "Completed"
  ).length;

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="ml-72 p-10">

        <div className="mb-10">

          <h1 className="text-5xl font-bold">

            Welcome Back,
            {" "}
            {user?.name}

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            Manage projects smarter and faster.

          </p>

        </div>

        {
          loading ? (

            <div className="text-2xl text-gray-400">

              Loading dashboard...

            </div>

          ) : (

            <>

              <div className="grid grid-cols-3 gap-6 mb-10">

                <div className="bg-[#111827] p-8 rounded-3xl border border-white/10">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-gray-400">

                        Total Tasks

                      </p>

                      <h2 className="text-5xl font-bold mt-4">

                        {tasks.length}

                      </h2>

                    </div>

                    <FaTasks className="text-5xl text-indigo-400" />

                  </div>

                </div>

                <div className="bg-[#111827] p-8 rounded-3xl border border-white/10">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-gray-400">

                        Total Projects

                      </p>

                      <h2 className="text-5xl font-bold mt-4">

                        {projects.length}

                      </h2>

                    </div>

                    <FaFolderOpen className="text-5xl text-purple-400" />

                  </div>

                </div>

                <div className="bg-[#111827] p-8 rounded-3xl border border-white/10">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-gray-400">

                        Completed Tasks

                      </p>

                      <h2 className="text-5xl font-bold mt-4">

                        {completedTasks}

                      </h2>

                    </div>

                    <FaCheckCircle className="text-5xl text-green-400" />

                  </div>

                </div>

              </div>

              <div className="bg-[#111827] p-8 rounded-3xl border border-white/10">

                <h2 className="text-3xl font-bold mb-6">

                  Recent Activity

                </h2>

                <div className="space-y-4">

                  {
                    tasks.length === 0 ? (

                      <p className="text-gray-400">

                        No recent activity found

                      </p>

                    ) : (

                      tasks.slice(0,5).map((task)=>(

                        <div
                          key={task._id}
                          className="bg-[#1f2937] p-5 rounded-2xl flex justify-between"
                        >

                          <div>

                            <h3 className="font-bold text-lg">

                              {task.title}

                            </h3>

                            <p className="text-gray-400 mt-1">

                              {task.description}

                            </p>

                          </div>

                          <div className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full h-fit">

                            {task.status}

                          </div>

                        </div>

                      ))

                    )
                  }

                </div>

              </div>

            </>

          )
        }

      </div>

    </div>

  );

}