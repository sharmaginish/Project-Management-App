import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

export default function Projects() {

  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const res = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/projects",
        {
          headers: {
            Authorization:`Bearer ${token}`
          }
        }
      );

      setProjects(res.data);

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }

  };

  const createProject = async () => {

    try {

      await axios.post(
        "https://project-management-app-jtoh.onrender.com/api/projects",
        {
          title,
          description
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setTitle("");

      setDescription("");

      fetchProjects();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="ml-72 p-10">

        <h1 className="text-5xl font-bold mb-10">

          Projects

        </h1>

        {
          role === "Admin" && (

            <div className="bg-[#111827] p-6 rounded-3xl mb-10 border border-white/10">

              <h2 className="text-2xl font-bold mb-5">

                Create Project

              </h2>

              <input
                type="text"
                placeholder="Project title"
                value={title}
                onChange={(e)=>
                  setTitle(e.target.value)
                }
                className="w-full bg-[#1f2937] p-4 rounded-2xl mb-4 outline-none"
              />

              <textarea
                placeholder="Project description"
                value={description}
                onChange={(e)=>
                  setDescription(e.target.value)
                }
                className="w-full bg-[#1f2937] p-4 rounded-2xl mb-4 outline-none"
              />

              <button
                onClick={createProject}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-2xl"
              >

                Create Project

              </button>

            </div>

          )
        }

        <div className="grid grid-cols-2 gap-6">

          {
            loading ? (

              <div className="text-2xl text-gray-400">

                Loading projects...

              </div>

            ) : projects.length === 0 ? (

              <div className="text-2xl text-gray-400">

                No Projects Found

              </div>

            ) : (

              projects.map((project)=>(

                <div
                  key={project._id}
                  className="bg-[#111827] p-6 rounded-3xl border border-white/10 hover:border-indigo-500 transition"
                >

                  <h2 className="text-2xl font-bold">

                    {project.title}

                  </h2>

                  <p className="text-gray-400 mt-3">

                    {project.description}

                  </p>

                </div>

              ))

            )
          }

        </div>

      </div>

    </div>

  );

}