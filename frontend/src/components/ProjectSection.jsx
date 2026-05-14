import { useEffect, useState } from "react";
import axios from "axios";

export default function ProjectSection() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [projects, setProjects] = useState([]);

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/projects",

        {
          title,
          description,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Created");

      setTitle("");
      setDescription("");

      fetchProjects();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="mt-10">

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Create Project
        </h2>

        <input
          type="text"
          placeholder="Project Title"
          className="border p-3 w-full mb-3 rounded"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Project Description"
          className="border p-3 w-full mb-3 rounded"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          onClick={createProject}
          className="bg-blue-500 text-white px-5 py-3 rounded"
        >
          Create Project
        </button>

      </div>

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Projects
        </h2>

        <div className="grid grid-cols-2 gap-5">

          {projects.map((project) => (

            <div
              key={project._id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h3 className="text-xl font-bold">
                {project.title}
              </h3>

              <p className="mt-2 text-gray-600">
                {project.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}