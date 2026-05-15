// frontend/src/pages/ProjectTasks.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProjectTasks() {

  const { id } = useParams();

  const [tasks, setTasks] = useState([]);

  const [project, setProject] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [loading, setLoading] =
    useState(false);

  const token =
    localStorage.getItem("token");

  const userInfo = JSON.parse(
    localStorage.getItem("user")
  );

  const currentUserId = userInfo?._id;

  useEffect(() => {

    fetchProject();

    fetchTasks();

  }, []);

  const fetchProject = async () => {
    try {

      const res = await axios.get(
        `https://project-management-app-jtoh.onrender.com/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProject(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchTasks = async () => {
    try {

      const res = await axios.get(
        `https://project-management-app-jtoh.onrender.com/api/tasks/project/${id}`,
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

  const createTask = async () => {

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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");

      fetchTasks();

      alert("Task Created");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
          "Error creating task"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white">

      <div className="max-w-6xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Project Tasks
          </h1>

          <p className="text-gray-400 mt-2">
            Admin controlled task system
          </p>

        </div>


        {/* ONLY ADMIN */}
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
                  setTitle(e.target.value)
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
                  setPriority(e.target.value)
                }
                className="bg-[#0f172a] border border-gray-700 rounded-xl p-4 outline-none"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
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


        {/* TASKS */}
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

                <span className="text-sm text-gray-400">
                  {task.assignedTo?.name ||
                    "Unassigned"}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}