import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

export default function Analytics() {

  const [tasks,setTasks] = useState([]);

  const [projects,setProjects] = useState([]);

  const [loading,setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  useEffect(()=>{

  fetchAnalytics();

  const interval = setInterval(()=>{

    fetchAnalytics();

  },5000);

  return ()=> clearInterval(interval);

},[]);

  const fetchAnalytics = async () => {

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

  const completedTasks =
    tasks.filter(
      task =>
        task.status === "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      task =>
        task.status === "Pending"
    ).length;

  const inProgressTasks =
    tasks.filter(
      task =>
        task.status === "In Progress"
    ).length;

  const completedProjects =
    projects.filter(
      project =>
        project.status === "Completed"
    ).length;

  const activeProjects =
    projects.filter(
      project =>
        project.status === "Active"
    ).length;

  const taskData = [

    {
      name:"Pending",
      value:pendingTasks
    },

    {
      name:"In Progress",
      value:inProgressTasks
    },

    {
      name:"Completed",
      value:completedTasks
    }

  ];

  const projectData = [

    {
      name:"Active",
      value:activeProjects
    },

    {
      name:"Completed",
      value:completedProjects
    }

  ];

  const COLORS = [
    "#6366f1",
    "#8b5cf6",
    "#22c55e"
  ];

  const productivity = tasks.length
  ? Math.round(
      (completedTasks / tasks.length)
      * 100
    )
  : 0;

  const progressData = projects.map(
    (project)=>({

      name:project.title,

      progress:project.progress || 0

    })
  );

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="ml-72 p-10">

        <div className="mb-10">

          <h1 className="text-5xl font-bold">

            Analytics

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            Workspace performance insights

          </p>

        </div>

        {
          loading ? (

            <div className="text-2xl text-gray-400">

              Loading analytics...

            </div>

          ) : (

            <>

              <div className="grid grid-cols-4 gap-6 mb-10">

                <div className="bg-[#111827] p-6 rounded-3xl border border-white/10">

                  <p className="text-gray-400">

                    Total Tasks

                  </p>

                  <h2 className="text-5xl font-bold mt-4">

                    {tasks.length}

                  </h2>

                </div>

                <div className="bg-[#111827] p-6 rounded-3xl border border-white/10">

                  <p className="text-gray-400">

                    Completed Tasks

                  </p>

                  <h2 className="text-5xl font-bold mt-4 text-green-400">

                    {completedTasks}

                  </h2>

                </div>

                <div className="bg-[#111827] p-6 rounded-3xl border border-white/10">

                  <p className="text-gray-400">

                    Total Projects

                  </p>

                  <h2 className="text-5xl font-bold mt-4 text-indigo-400">

                    {projects.length}

                  </h2>

                </div>

                <div className="bg-[#111827] p-6 rounded-3xl border border-white/10">

                  <p className="text-gray-400">

                    Productivity

                  </p>

                  <h2 className="text-5xl font-bold mt-4 text-purple-400">

                    {productivity}%

                  </h2>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-8 mb-10">

                <div className="bg-[#111827] p-8 rounded-3xl border border-white/10">

                  <h2 className="text-3xl font-bold mb-6">

                    Task Distribution

                  </h2>

                  <ResponsiveContainer
                    width="100%"
                    height={350}
                  >

                    <PieChart>

                      <Pie
                        data={taskData}
                        dataKey="value"
                        outerRadius={120}
                        label
                      >

                        {
                          taskData.map(
                            (entry,index)=>(

                              <Cell
                                key={index}
                                fill={
                                  COLORS[index % COLORS.length]
                                }
                              />

                            )
                          )
                        }

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

                <div className="bg-[#111827] p-8 rounded-3xl border border-white/10">

                  <h2 className="text-3xl font-bold mb-6">

                    Project Status

                  </h2>

                  <ResponsiveContainer
                    width="100%"
                    height={350}
                  >

                    <PieChart>

                      <Pie
                        data={projectData}
                        dataKey="value"
                        outerRadius={120}
                        label
                      >

                        {
                          projectData.map(
                            (entry,index)=>(

                              <Cell
                                key={index}
                                fill={
                                  COLORS[index % COLORS.length]
                                }
                              />

                            )
                          )
                        }

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </div>

              <div className="bg-[#111827] p-8 rounded-3xl border border-white/10">

                <h2 className="text-3xl font-bold mb-8">

                  Project Progress

                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={400}
                >

                  <BarChart data={progressData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="progress"
                      fill="#6366f1"
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </>

          )
        }

      </div>

    </div>

  );

}