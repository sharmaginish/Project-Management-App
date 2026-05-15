import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  FaTasks,
  FaTrash,
  FaSearch
} from "react-icons/fa";

export default function Tasks() {

  const [tasks, setTasks] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState("");

  // FIXED USER + TOKEN

  const user = JSON.parse(
    localStorage.getItem("user")
  ) || {};

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  useEffect(() => {

    fetchTasks();

  }, []);

  // FETCH TASKS

  const fetchTasks =
    async () => {

      try {

        setLoading(true);

        const res =
          await axios.get(
            "https://project-management-app-jtoh.onrender.com/api/tasks",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setTasks(res.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

  // CREATE TASK

  const createTask =
    async () => {

      if (
        role !== "Admin"
      ) {

        return alert(
          "Only admin can create tasks"
        );

      }

      if (
        !title ||
        !description
      ) {

        return alert(
          "Please fill all fields"
        );

      }

      try {

        await axios.post(
          "https://project-management-app-jtoh.onrender.com/api/tasks",
          {
            title,
            description,
            status:
              "Pending"
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setTitle("");

        setDescription("");

        fetchTasks();

        alert(
          "Task Created"
        );

      } catch (err) {

        console.log(err);

      }

    };

  // UPDATE TASK

  const updateTask =
    async (
      id,
      currentStatus
    ) => {

      let newStatus =
        "Pending";

      if (
        currentStatus ===
        "Pending"
      ) {

        newStatus =
          "In Progress";

      } else if (
        currentStatus ===
        "In Progress"
      ) {

        newStatus =
          "Completed";

      }

      try {

        await axios.put(
          `https://project-management-app-jtoh.onrender.com/api/tasks/${id}`,
          {
            status:
              newStatus
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchTasks();

      } catch (err) {

        console.log(err);

      }

    };

  // DELETE TASK

  const deleteTask =
    async (id) => {

      if (
        role !== "Admin"
      ) {

        return alert(
          "Only admin can delete tasks"
        );

      }

      const confirmDelete =
        window.confirm(
          "Delete this task?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(
          `https://project-management-app-jtoh.onrender.com/api/tasks/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchTasks();

      } catch (err) {

        console.log(err);

      }

    };

  // SEARCH FILTER

  const filteredTasks =
    tasks.filter((task) =>
      task.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="md:ml-72 p-4 md:p-10">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-10">

          <div>

            <h1 className="text-3xl md:text-5xl font-bold">

              Tasks

            </h1>

            <p className="text-gray-400 mt-3 text-base md:text-lg">

              Manage workspace tasks efficiently

            </p>

          </div>

          <div className="
            bg-[#111827]
            px-6
            py-4
            rounded-2xl
            border
            border-white/10
            w-fit
          ">

            <p className="text-gray-400">

              Total Tasks

            </p>

            <h2 className="text-4xl font-bold mt-2">

              {tasks.length}

            </h2>

          </div>

        </div>

        {/* SEARCH */}

        <div className="
          bg-[#111827]
          rounded-2xl
          px-4
          flex
          items-center
          mb-8
          border
          border-white/10
        ">

          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search Tasks"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              bg-transparent
              w-full
              p-4
              outline-none
              text-white
            "
          />

        </div>

        {/* CREATE TASK */}

        {
          role === "Admin" && (

            <motion.div

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              className="
                bg-[#111827]
                p-6
                rounded-3xl
                mb-10
                border
                border-white/10
              "

            >

              <h2 className="text-2xl md:text-3xl font-bold mb-6">

                Create Task

              </h2>

              <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-[#1f2937]
                  p-4
                  rounded-2xl
                  mb-4
                  outline-none
                "
              />

              <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-[#1f2937]
                  p-4
                  rounded-2xl
                  mb-4
                  outline-none
                  min-h-[120px]
                "
              />

              <button
                onClick={
                  createTask
                }
                className="
                  bg-gradient-to-r
                  from-indigo-500
                  to-purple-600
                  px-6
                  py-3
                  rounded-2xl
                  font-bold
                "
              >

                Create Task

              </button>

            </motion.div>

          )
        }

        {/* TASK LIST */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {
            loading ? (

              <div className="text-xl text-gray-400">

                Loading tasks...

              </div>

            ) : filteredTasks.length === 0 ? (

              <div className="text-xl text-gray-400">

                No Tasks Found

              </div>

            ) : (

              filteredTasks.map(
                (
                  task,
                  index
                ) => (

                  <motion.div

                    initial={{
                      opacity: 0,
                      y: 30
                    }}

                    animate={{
                      opacity: 1,
                      y: 0
                    }}

                    transition={{
                      delay:
                        index * 0.05
                    }}

                    key={task._id}

                    className="
                      bg-[#111827]
                      p-6
                      rounded-3xl
                      border
                      border-white/10
                    "

                  >

                    {/* TOP */}

                    <div className="flex justify-between items-start gap-4">

                      <div className="min-w-0">

                        <div className="flex items-center gap-3">

                          <FaTasks className="text-indigo-400 text-2xl flex-shrink-0" />

                          <h2 className="text-xl md:text-2xl font-bold break-words">

                            {task.title}

                          </h2>

                        </div>

                        <p className="text-gray-400 mt-4 break-words">

                          {task.description}

                        </p>

                      </div>

                      {
                        role ===
                          "Admin" && (

                          <button
                            onClick={() =>
                              deleteTask(
                                task._id
                              )
                            }
                            className="
                              bg-red-500
                              hover:bg-red-600
                              transition
                              p-3
                              rounded-xl
                              flex-shrink-0
                            "
                          >

                            <FaTrash />

                          </button>

                        )
                      }

                    </div>

                    {/* FOOTER */}

                    <div className="
                      mt-6
                      flex
                      flex-col
                      sm:flex-row
                      sm:justify-between
                      sm:items-center
                      gap-4
                    ">

                      <div className="
                        bg-indigo-500/20
                        text-indigo-400
                        px-4
                        py-2
                        rounded-full
                        w-fit
                      ">

                        {task.status}

                      </div>

                      <button
                        onClick={() =>
                          updateTask(
                            task._id,
                            task.status
                          )
                        }
                        className="
                          bg-indigo-500
                          hover:bg-indigo-600
                          transition
                          px-5
                          py-2
                          rounded-2xl
                          text-sm
                          md:text-base
                        "
                      >

                        Update Status

                      </button>

                    </div>

                    {/* USER */}

                    <div className="mt-5 text-gray-500 text-sm break-words">

                      Created by{" "}
                      {user?.name}

                    </div>

                  </motion.div>

                )
              )

            )
          }

        </div>

      </div>

    </div>

  );

}