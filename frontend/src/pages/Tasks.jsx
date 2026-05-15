import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  FaTasks,
  FaTrash,
  FaSearch,
  FaUsers
} from "react-icons/fa";

export default function Tasks() {

  const [tasks, setTasks] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [selectedTask,
    setSelectedTask] =
    useState(null);

  const [selectedMembers,
    setSelectedMembers] =
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

  const user = JSON.parse(
    sessionStorage.getItem("user")
  ) || {};

  const token =
    sessionStorage.getItem("token");

  const role =
    sessionStorage.getItem("role");

  useEffect(() => {

    fetchTasks();

    fetchUsers();

  }, []);

  // FETCH USERS

  const fetchUsers =
    async () => {

      try {

        const res =
          await axios.get(
            "https://project-management-app-jtoh.onrender.com/api/auth/users",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setUsers(res.data);

      } catch (err) {

        console.log(err);

      }

    };

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

  // MEMBERS

  const openMembers =
    (task) => {

      setSelectedTask(task);

      setSelectedMembers(
        task.members?.map(
          (member) =>
            member._id
        ) || []
      );

    };

  const handleSelect =
    (userId) => {

      if (
        selectedMembers.includes(
          userId
        )
      ) {

        setSelectedMembers(
          selectedMembers.filter(
            (id) =>
              id !== userId
          )
        );

      } else {

        setSelectedMembers([
          ...selectedMembers,
          userId
        ]);

      }

    };

  const saveTaskMembers =
    async () => {

      try {

        await axios.put(
          `https://project-management-app-jtoh.onrender.com/api/tasks/${selectedTask._id}/members`,
          {
            members:
              selectedMembers
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        alert(
          "Members updated"
        );

        setSelectedTask(null);

        fetchTasks();

      } catch (err) {

        console.log(err);

      }

    };

  // SEARCH

  const filteredTasks =
    tasks.filter((task) =>
      task.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // STATS

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const progress =
    tasks.length
      ? Math.round(
          (
            completedTasks /
            tasks.length
          ) * 100
        )
      : 0;

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

              Task Progress

            </p>

            <h2 className="text-4xl font-bold mt-2">

              {progress}%

            </h2>

            <p className="text-sm text-gray-500 mt-2">

              {completedTasks} of {tasks.length} completed

            </p>

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

    <div className="
      bg-[#111827]
      p-6
      rounded-3xl
      border
      border-white/10
      mb-8
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">

        Create Task

      </h2>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      ">

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="
            bg-[#1f2937]
            p-4
            rounded-2xl
            outline-none
          "
        />

        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="
            bg-[#1f2937]
            p-4
            rounded-2xl
            outline-none
          "
        />

      </div>

      <button
        onClick={createTask}
        className="
          mt-5
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

    </div>

  )
}

        {/* TASK LIST */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {
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

                  <div className="flex justify-between items-start gap-4">

                    <div className="min-w-0">

                      <div className="flex items-center gap-3">

                        <FaTasks className="text-indigo-400 text-2xl" />

                        <h2 className="text-xl md:text-2xl font-bold break-words">

                          {task.title}

                        </h2>

                      </div>

                      <p className="text-gray-400 mt-4 break-words">

                        {task.description}

                      </p>

                      {/* MEMBERS */}

                      {
                        task.members?.length > 0 && (

                          <div className="
                            flex
                            flex-wrap
                            gap-2
                            mt-4
                          ">

                            {
                              task.members.map(
                                (member) => (

                                  <div
                                    key={member._id}
                                    className="
                                      bg-[#1f2937]
                                      px-3
                                      py-1
                                      rounded-full
                                      text-sm
                                    "
                                  >

                                    {member.name}

                                  </div>

                                )
                              )
                            }

                          </div>

                        )
                      }

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
                          "
                        >

                          <FaTrash />

                        </button>

                      )
                    }

                  </div>

                  <div className="
                    mt-6
                    flex
                    flex-wrap
                    gap-3
                    items-center
                  ">

                    <div className="
                      bg-indigo-500/20
                      text-indigo-400
                      px-4
                      py-2
                      rounded-full
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
                      "
                    >

                      Update Status

                    </button>

                    <button
                      onClick={() =>
                        openMembers(task)
                      }
                      className="
                        bg-cyan-500
                        hover:bg-cyan-600
                        transition
                        px-5
                        py-2
                        rounded-2xl
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <FaUsers />

                      Members

                    </button>

                  </div>

                </motion.div>

              )
            )
          }

        </div>

      </div>

      {/* MEMBER MODAL */}

      {
        selectedTask && (

          <div className="
            fixed
            inset-0
            bg-black/60
            flex
            items-center
            justify-center
            z-50
            p-4
          ">

            <div className="
              bg-[#111827]
              p-6
              rounded-3xl
              w-full
              max-w-3xl
              max-h-[90vh]
              overflow-y-auto
            ">

              <div className="
                flex
                justify-between
                items-center
                mb-6
              ">

                <h2 className="text-2xl font-bold">

                  Manage Members

                </h2>

                <button
                  onClick={() =>
                    setSelectedTask(null)
                  }
                  className="text-red-400"
                >

                  Close

                </button>

              </div>

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              ">

                {
                  users.map((user) => (

                    <div
                      key={user._id}
                      onClick={() =>
                        handleSelect(
                          user._id
                        )
                      }
                      className={`
                        p-4
                        rounded-2xl
                        border
                        cursor-pointer
                        transition-all
                        ${
                          selectedMembers.includes(
                            user._id
                          )
                            ? "bg-blue-600 border-blue-400"
                            : "bg-[#1f2937] border-gray-700"
                        }
                      `}
                    >

                      <h3 className="font-bold">

                        {user.name}

                      </h3>

                      <p className="text-sm text-gray-300">

                        {user.email}

                      </p>

                    </div>

                  ))
                }

              </div>

              <button
                onClick={
                  saveTaskMembers
                }
                className="
                  mt-6
                  w-full
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  py-3
                  rounded-2xl
                  font-bold
                "
              >

                Save Members

              </button>

            </div>

          </div>

        )
      }

    </div>

  );

}