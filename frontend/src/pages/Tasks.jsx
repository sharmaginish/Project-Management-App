import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  FaTasks,
  FaTrash
} from "react-icons/fa";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  const role = sessionStorage.getItem("role");

  const user = JSON.parse(
    sessionStorage.getItem("user")
  );

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/tasks",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setTasks(res.data);

      setLoading(false);

    } catch(err){

      console.log(err);

      setLoading(false);

    }

  };

  const createTask = async () => {

    if(role !== "Admin"){

      return alert(
        "Only admin can create tasks"
      );

    }

    try {

      await axios.post(
        "https://project-management-app-jtoh.onrender.com/api/tasks",
        {
          title,
          description,
          status:"Pending"
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setTitle("");

      setDescription("");

      fetchTasks();

    } catch(err){

      console.log(err);

    }

  };

  const updateTask = async (
    id,
    currentStatus
  ) => {

    let newStatus = "Pending";

    if(currentStatus === "Pending"){

      newStatus = "In Progress";

    } else if(
      currentStatus === "In Progress"
    ){

      newStatus = "Completed";

    }

    try {

      await axios.put(
        `https://project-management-app-jtoh.onrender.com/api/tasks/${id}`,
        {
          status:newStatus
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch(err){

      console.log(err);

    }

  };

  const deleteTask = async (id) => {

    if(role !== "Admin"){

      return alert(
        "Only admin can delete tasks"
      );

    }

    try {

      await axios.delete(
        `https://project-management-app-jtoh.onrender.com/api/tasks/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch(err){

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="md:ml-72 p-4 md:p-10">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-10">

          <div>

            <h1 className="text-3xl md:text-5xlxl font-bold">

              Tasks

            </h1>

            <p className="text-gray-400 mt-3 text-lg">

              Manage workspace tasks efficiently

            </p>

          </div>

          <div className="bg-[#111827] px-6 py-4 rounded-2xl border border-white/10">

            <p className="text-gray-400">

              Total Tasks

            </p>

            <h2 className="text-4xl font-bold mt-2">

              {tasks.length}

            </h2>

          </div>

        </div>

        {
          role === "Admin" && (

            <motion.div

              initial={{
                opacity:0,
                y:20
              }}

              animate={{
                opacity:1,
                y:0
              }}

              className="bg-[#111827] p-6 rounded-3xl mb-10 border border-white/10"

            >

              <h2 className="text-3xl font-bold mb-6">

                Create Task

              </h2>

              <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e)=>
                  setTitle(e.target.value)
                }
                className="w-full bg-[#1f2937] p-4 rounded-2xl mb-4 outline-none"
              />

              <textarea
                placeholder="Task description"
                value={description}
                onChange={(e)=>
                  setDescription(e.target.value)
                }
                className="w-full bg-[#1f2937] p-4 rounded-2xl mb-4 outline-none"
              />

              <button
                onClick={createTask}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-2xl font-bold"
              >

                Create Task

              </button>

            </motion.div>

          )
        }

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {
            loading ? (

              <div className="text-2xl text-gray-400">

                Loading tasks...

              </div>

            ) : tasks.length === 0 ? (

              <div className="text-2xl text-gray-400">

                No Tasks Found

              </div>

            ) : (

              tasks.map((task,index)=>(

                <motion.div

                  initial={{
                    opacity:0,
                    y:30
                  }}

                  animate={{
                    opacity:1,
                    y:0
                  }}

                  transition={{
                    delay:index * 0.1
                  }}

                  key={task._id}

                  className="bg-[#111827] p-6 rounded-3xl border border-white/10"

                >

                  <div className="flex justify-between items-start">

                    <div>

                      <div className="flex items-center gap-3">

                        <FaTasks className="text-indigo-400 text-2xl" />

                        <h2 className="text-2xl font-bold">

                          {task.title}

                        </h2>

                      </div>

                      <p className="text-gray-400 mt-4">

                        {task.description}

                      </p>

                    </div>

                    {
                      role === "Admin" && (

                        <button
                          onClick={() =>
                            deleteTask(task._id)
                          }
                          className="bg-red-500 hover:bg-red-600 transition p-3 rounded-xl"
                        >

                          <FaTrash />

                        </button>

                      )
                    }

                  </div>

                  <div className="mt-6 flex flex-col md:flex-row justify-between md:items-center gap-4">

                    <div className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full">

                      {task.status}

                    </div>

                    <button
                      onClick={() =>
                        updateTask(
                          task._id,
                          task.status
                        )
                      }
                      className="bg-indigo-500 hover:bg-indigo-600 transition px-5 py-2 rounded-2xl"
                    >

                      Update Status

                    </button>

                  </div>

                  <div className="mt-5 text-gray-500 text-sm">

                    Created by
                    {" "}
                    {user?.name}

                  </div>

                </motion.div>

              ))

            )
          }

        </div>

      </div>

    </div>

  );

}