import { useEffect, useState } from "react";
import axios from "axios";

export default function TaskSection() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/tasks",
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

  }, []);

  const createTask = async () => {

    try {

      await axios.post(
        "https://project-management-app-jtoh.onrender.com/api/tasks",

        {
          title,
          description,
          status: "Pending",
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Created");

      setTitle("");
      setDescription("");

      fetchTasks();

    } catch (err) {

      console.log(err);

    }

  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(
        `https://project-management-app-jtoh.onrender.com/api/tasks/${id}`,

        {
          status,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="mt-10">

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Create Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          className="border p-3 w-full mb-3 rounded"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Task Description"
          className="border p-3 w-full mb-3 rounded"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          onClick={createTask}
          className="bg-green-500 text-white px-5 py-3 rounded"
        >
          Create Task
        </button>

      </div>

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Tasks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h3 className="text-xl font-bold">
                {task.title}
              </h3>

              <p className="mt-2 text-gray-600">
                {task.description}
              </p>

              <p className="mt-3 font-semibold">
                Status:
                <span className="ml-2">
                  {task.status}
                </span>
              </p>

              <div className="flex gap-3 mt-4">

                <button
                  onClick={() =>
                    updateStatus(
                      task._id,
                      "In Progress"
                    )
                  }
                  className="bg-yellow-500 text-white px-3 py-2 rounded"
                >
                  In Progress
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      task._id,
                      "Completed"
                    )
                  }
                  className="bg-blue-500 text-white px-3 py-2 rounded"
                >
                  Completed
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}