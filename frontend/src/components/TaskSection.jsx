import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

export default function TaskSection() {

  const { id } = useParams();

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

  const [project, setProject] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [priority,
    setPriority] =
    useState("Medium");

  const [loading,
    setLoading] =
    useState(false);

  const token =
    localStorage.getItem("token");

  const userInfo = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const currentUserId =
    userInfo?._id || "";


  useEffect(() => {

    fetchProject();

    fetchTasks();

    fetchUsers();

  }, []);


  // FETCH PROJECT
  const fetchProject =
    async () => {

    try {

      const res =
        await axios.get(
          `https://project-management-app-jtoh.onrender.com/api/projects/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setProject(res.data);

    } catch (err) {

      console.log(err);
    }
  };


  // FETCH TASKS
  const fetchTasks =
    async () => {

    try {

      const res =
        await axios.get(
          `https://project-management-app-jtoh.onrender.com/api/tasks/project/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setTasks(res.data);

    } catch (err) {

      console.log(err);
    }
  };


  // FETCH USERS
  const fetchUsers =
    async () => {

    try {

      const res =
        await axios.get(
          `https://project-management-app-jtoh.onrender.com/api/projects/users`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setUsers(res.data);

    } catch (err) {

      console.log(err);
    }
  };


  // CREATE TASK
  const createTask =
    async () => {

    try {

      setLoading(true);

      await axios.post(
        `https://project-management-app-jtoh.onrender.com/api/tasks`,
        {
          title,
          description,
          priority,
          projectId: id,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert("Task Created");

      setTitle("");

      setDescription("");

      fetchTasks();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data
          ?.message ||
        "Error creating task"
      );

    } finally {

      setLoading(false);
    }
  };


  // OPEN MEMBERS
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


  // SELECT MEMBER
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
        userId,
      ]);
    }
  };


  // SAVE TASK MEMBERS
  const saveTaskMembers =
    async () => {

    try {

      await axios.put(
        `https://project-management-app-jtoh.onrender.com/api/tasks/${selectedTask._id}/members`,
        {
          members:
            selectedMembers,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Task members updated"
      );

      setSelectedTask(null);

      fetchTasks();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data
          ?.message ||
        "Error"
      );
    }
  };


  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Project Tasks
          </h1>

          <p className="text-gray-400 mt-2">
            Only admin can create tasks
          </p>

        </div>


        {/* CREATE TASK */}
        {project?.admin?._id ===
          currentUserId && (

          <div className="bg-[#1e293b] p-6 rounded-3xl border border-gray-700 mb-8">

            <h2 className="text-2xl font-semibold mb-5">
              Create Task
            </h2>

            <div className="grid gap-4">

              <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="bg-[#0f172a] border border-gray-700 rounded-xl p-4 outline-none"
              />

              <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="bg-[#0f172a] border border-gray-700 rounded-xl p-4 outline-none h-32"
              />

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(
                    e.target.value
                  )
                }
                className="bg-[#0f172a] border border-gray-700 rounded-xl p-4 outline-none"
              >

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

              </select>

              <button
                onClick={createTask}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-2xl font-semibold"
              >

                {loading
                  ? "Creating..."
                  : "Create Task"}

              </button>

            </div>

          </div>

        )}


        {/* TASK LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="bg-[#1e293b] border border-gray-700 rounded-3xl p-6"
            >

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-xl font-semibold">
                  {task.title}
                </h2>

                <span className="bg-blue-600 px-3 py-1 rounded-lg text-sm">
                  {task.priority}
                </span>

              </div>

              <p className="text-gray-400 mb-5">
                {task.description}
              </p>

              <div className="flex items-center justify-between">

                <span className="text-sm bg-green-600 px-3 py-1 rounded-lg">
                  {task.status}
                </span>

              </div>

              {/* ADMIN ONLY */}
              {task.admin?._id ===
                currentUserId && (

                <button
                  onClick={() =>
                    openMembers(task)
                  }
                  className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm"
                >
                  Manage Members
                </button>

              )}

            </div>

          ))}

        </div>

      </div>


      {/* MEMBER MODAL */}
      {selectedTask && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-[#1e293b] p-8 rounded-3xl w-full max-w-3xl">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold">
                Task Members
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {users.map((user) => (

                <div
                  key={user._id}
                  onClick={() =>
                    handleSelect(
                      user._id
                    )
                  }
                  className={`p-4 rounded-2xl border cursor-pointer ${
                    selectedMembers.includes(
                      user._id
                    )
                      ? "bg-blue-600 border-blue-400"
                      : "bg-[#0f172a] border-gray-700"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center font-bold">

                      {user.name
                        ?.charAt(0)
                        .toUpperCase()}

                    </div>

                    <div>

                      <h3 className="font-semibold">
                        {user.name}
                      </h3>

                      <p className="text-sm text-gray-300">
                        {user.email}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <div className="mt-8 flex justify-end">

              <button
                onClick={
                  saveTaskMembers
                }
                className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 rounded-2xl font-semibold"
              >
                Save Members
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}