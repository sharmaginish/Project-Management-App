import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  FaTrash,
  FaFolderOpen
} from "react-icons/fa";

export default function Projects() {

  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  const role = sessionStorage.getItem("role");

  const user = JSON.parse(
    sessionStorage.getItem("user")
  );

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const res = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/projects",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setProjects(res.data);

      setLoading(false);

    } catch(err){

      console.log(err);

      setLoading(false);

    }

  };

  const createProject = async () => {

    if(role !== "Admin"){

      return alert(
        "Only admin can create projects"
      );

    }

    try {

      await axios.post(
        "https://project-management-app-jtoh.onrender.com/api/projects",
        {
          title,
          description,
          progress:0,
          status:"Active"
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

    } catch(err){

      console.log(err);

    }

  };

  const deleteProject = async (id) => {

    if(role !== "Admin"){

      return alert(
        "Only admin can delete projects"
      );

    }

    try {

      await axios.delete(
        `https://project-management-app-jtoh.onrender.com/api/projects/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchProjects();

    } catch(err){

      console.log(err);

    }

  };

  const updateProgress = async (
    id,
    currentProgress
  ) => {

    try {

      let newProgress =
        currentProgress + 10;

      if(newProgress > 100){

        newProgress = 100;

      }

      await axios.put(
        `https://project-management-app-jtoh.onrender.com/api/projects/${id}`,
        {
          progress:newProgress
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchProjects();

    } catch(err){

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="ml-72 p-10">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold">

              Projects

            </h1>

            <p className="text-gray-400 mt-3 text-lg">

              Workspace Project Management

            </p>

          </div>

          <div className="bg-[#111827] px-6 py-4 rounded-2xl border border-white/10">

            <p className="text-gray-400">

              Total Projects

            </p>

            <h2 className="text-4xl font-bold mt-2">

              {projects.length}

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
                className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-2xl font-bold"
              >

                Create Project

              </button>

            </motion.div>

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

              projects.map((project,index)=>(

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

                  key={project._id}

                  className="bg-[#111827] p-6 rounded-3xl border border-white/10"

                >

                  <div className="flex justify-between items-start">

                    <div>

                      <div className="flex items-center gap-3">

                        <FaFolderOpen className="text-indigo-400 text-2xl" />

                        <h2 className="text-2xl font-bold">

                          {project.title}

                        </h2>

                      </div>

                      <p className="text-gray-400 mt-4">

                        {project.description}

                      </p>

                    </div>

                    {
                      role === "Admin" && (

                        <button
                          onClick={() =>
                            deleteProject(project._id)
                          }
                          className="bg-red-500 hover:bg-red-600 transition p-3 rounded-xl"
                        >

                          <FaTrash />

                        </button>

                      )
                    }

                  </div>

                  <div className="mt-6">

                    <div className="flex justify-between mb-2">

                      <span>

                        Progress

                      </span>

                      <span>

                        {project.progress || 0}%

                      </span>

                    </div>

                    <div className="w-full bg-[#1f2937] rounded-full h-4">

                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full"
                        style={{
                          width:`${project.progress || 0}%`
                        }}
                      ></div>

                    </div>

                    <button
                      onClick={() =>
                        updateProgress(
                          project._id,
                          project.progress || 0
                        )
                      }
                      className="mt-5 bg-indigo-500 hover:bg-indigo-600 transition px-5 py-2 rounded-2xl"
                    >

                      Update Progress

                    </button>

                  </div>

                  <div className="mt-6 flex justify-between items-center">

                    <div className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full">

                      {project.status || "Active"}

                    </div>

                    <div className="text-gray-500 text-sm">

                      Created by
                      {" "}
                      {user?.name}

                    </div>

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