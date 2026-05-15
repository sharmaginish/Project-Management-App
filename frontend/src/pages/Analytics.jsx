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
  CartesianGrid,
} from "recharts";

export default function Analytics() {

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  useEffect(() => {

    fetchAnalytics();

    }, []);

    

  const fetchAnalytics = async () => {

    try {

      setLoading(true);

      const taskRes = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const projectRes = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const memberRes = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/auth/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(taskRes.data);

      setProjects(projectRes.data);

      setMembers(memberRes.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  // TASK COUNTS

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status === "Pending"
    ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status === "In Progress"
    ).length;

  // PROJECT COUNTS

  const completedProjects =
    projects.filter(
      (project) =>
        project.status === "Completed"
    ).length;

  const activeProjects =
    projects.filter(
      (project) =>
        project.status === "Active"
    ).length;

  // MEMBER COUNTS

  const admins =
    members.filter(
      (member) =>
        member.role === "Admin"
    ).length;

  const normalMembers =
    members.filter(
      (member) =>
        member.role === "Member"
    ).length;

  // PIE DATA

  const taskData = [

    {
      name: "Pending",
      value: pendingTasks
    },

    {
      name: "In Progress",
      value: inProgressTasks
    },

    {
      name: "Completed",
      value: completedTasks
    }

  ];

  const projectData = [

    {
      name: "Active",
      value: activeProjects
    },

    {
      name: "Completed",
      value: completedProjects
    }

  ];

  const COLORS = [
    "#6366f1",
    "#8b5cf6",
    "#22c55e"
  ];

  // PRODUCTIVITY

  const productivity = tasks.length
    ? Math.round(
        (completedTasks / tasks.length) * 100
      )
    : 0;

  // BAR DATA

  const progressData =
    projects.map((project) => ({

      name: project.title,

      progress:
        project.progress || 0

    }));

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="md:ml-72 p-4 md:p-10">

        {/* HEADER */}

        <div className="
  mb-10
  flex
  flex-col
  md:flex-row
  md:items-center
  md:justify-between
  gap-5
">

  <div>

    <h1 className="text-3xl md:text-5xl font-bold break-words">

      Analytics

    </h1>

    <p className="text-gray-400 mt-3 text-base md:text-lg">

      Workspace performance insights

    </p>

  </div>

  <button
    onClick={fetchAnalytics}
    className="
      bg-indigo-500
      hover:bg-indigo-600
      transition
      px-5
      py-3
      rounded-2xl
      font-semibold
      w-fit
    "
  >

    Refresh Analytics

  </button>

</div>

        {
          loading ? (

            <div className="text-xl md:text-2xl text-gray-400">

              Loading analytics...

            </div>

          ) : (

            <>

              {/* STATS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

                <div className="bg-[#111827] p-6 rounded-3xl border border-white/10">

                  <p className="text-gray-400">

                    Total Tasks

                  </p>

                  <h2 className="text-3xl md:text-5xl font-bold mt-4">

                    {tasks.length}

                  </h2>

                </div>

                <div className="bg-[#111827] p-6 rounded-3xl border border-white/10">

                  <p className="text-gray-400">

                    Completed Tasks

                  </p>

                  <h2 className="text-3xl md:text-5xl font-bold mt-4 text-green-400">

                    {completedTasks}

                  </h2>

                </div>

                <div className="bg-[#111827] p-6 rounded-3xl border border-white/10">

                  <p className="text-gray-400">

                    Total Projects

                  </p>

                  <h2 className="text-3xl md:text-5xl font-bold mt-4 text-indigo-400">

                    {projects.length}

                  </h2>

                </div>

                <div className="bg-[#111827] p-6 rounded-3xl border border-white/10">

                  <p className="text-gray-400">

                    Productivity

                  </p>

                  <h2 className="text-3xl md:text-5xl font-bold mt-4 text-purple-400">

                    {productivity}%

                  </h2>

                </div>

                <div className="bg-[#111827] p-6 rounded-3xl border border-white/10">

                  <p className="text-gray-400">

                    Admins

                  </p>

                  <h2 className="text-3xl md:text-5xl font-bold mt-4 text-cyan-400">

                    {admins}

                  </h2>

                </div>

                <div className="bg-[#111827] p-6 rounded-3xl border border-white/10">

                  <p className="text-gray-400">

                    Members

                  </p>

                  <h2 className="text-3xl md:text-5xl font-bold mt-4 text-orange-400">

                    {normalMembers}

                  </h2>

                </div>

              </div>

              {/* PIE CHARTS */}

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

                <div className="bg-[#111827] p-5 md:p-8 rounded-3xl border border-white/10">

                  <h2 className="text-2xl md:text-3xl font-bold mb-6">

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
                            (entry, index) => (

                              <Cell
                                key={index}
                                fill={
                                  COLORS[
                                    index %
                                    COLORS.length
                                  ]
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

                <div className="bg-[#111827] p-5 md:p-8 rounded-3xl border border-white/10">

                  <h2 className="text-2xl md:text-3xl font-bold mb-6">

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
                            (entry, index) => (

                              <Cell
                                key={index}
                                fill={
                                  COLORS[
                                    index %
                                    COLORS.length
                                  ]
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

              {/* BAR CHART */}

              <div className="bg-[#111827] p-5 md:p-8 rounded-3xl border border-white/10 overflow-x-auto">

                <h2 className="text-2xl md:text-3xl font-bold mb-8">

                  Project Progress

                </h2>

                <div className="min-w-[300px] md:min-w-[600px]">

                  <ResponsiveContainer
                    width="100%"
                    height={400}
                  >

                    <BarChart
                      data={progressData}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis
                        dataKey="name"
                      />

                      <YAxis />

                      <Tooltip />

                      <Bar
                        dataKey="progress"
                        fill="#6366f1"
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

              {/* RECENT TASKS */}

              <div className="bg-[#111827] p-5 md:p-8 rounded-3xl border border-white/10 mt-10">

                <h2 className="text-2xl md:text-3xl font-bold mb-8">

                  Recent Tasks

                </h2>

                <div className="space-y-4">

                  {
                    tasks.slice(0, 5).map(
                      (task) => (

                        <div
                          key={task._id}
                          className="bg-[#1f2937] p-4 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                        >

                          <div>

                            <h3 className="font-bold text-lg">

                              {task.title}

                            </h3>

                            <p className="text-gray-400 text-sm mt-1">

                              {task.description}

                            </p>

                          </div>

                          <div className={`
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            w-fit
                            ${
                              task.status === "Completed"
                                ? "bg-green-500/20 text-green-400"
                                : task.status === "In Progress"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-indigo-500/20 text-indigo-400"
                            }
                          `}>

                            {task.status}

                          </div>

                        </div>

                      )
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