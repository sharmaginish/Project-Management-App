import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  FaUsers,
  FaCheck
} from "react-icons/fa";

export default function ProjectDetails() {

  const { id } = useParams();

  const [users, setUsers] =
    useState([]);

  const [project, setProject] =
    useState(null);

  const [selectedMembers,
    setSelectedMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // FIXED TOKEN
  const token =
    localStorage.getItem("token");

  const userInfo =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const currentUserId =
    userInfo?._id ||
    userInfo?.id ||
    "";

  useEffect(() => {

    fetchUsers();

    fetchProject();

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

        setSelectedMembers(
          res.data.members?.map(
            (member) =>
              member._id
          ) || []
        );

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
            "https://project-management-app-jtoh.onrender.com/api/projects/users",
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

        alert(
          "Failed to load users"
        );

      }

    };

  // SELECT MEMBERS

  const handleSelect =
    (userId) => {

      // ONLY ADMIN CAN SELECT

      if (
        String(project?.admin?._id) !==
        String(currentUserId)
      ) {

        return;

      }

      if (
        selectedMembers.includes(
          userId
        )
      ) {

        setSelectedMembers(
          selectedMembers.filter(
            (memberId) =>
              memberId !== userId
          )
        );

      } else {

        setSelectedMembers([
          ...selectedMembers,
          userId,
        ]);

      }

    };

  // SAVE MEMBERS

  const saveMembers =
    async () => {

      try {

        setLoading(true);

        await axios.put(
          `https://project-management-app-jtoh.onrender.com/api/projects/${id}/members`,
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
          "Members Saved Successfully"
        );

        fetchProject();

      } catch (err) {

        console.log(err);

        alert(
          err.response?.data
            ?.message ||
          "Error saving members"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl md:text-5xl font-bold break-words">

            Project Members

          </h1>

          <p className="text-gray-400 mt-3 text-sm md:text-base">

            Manage your project team professionally

          </p>

        </div>

        {/* MAIN CARD */}

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
            bg-[#1e293b]
            rounded-3xl
            shadow-2xl
            border
            border-gray-700
            p-5
            md:p-8
          "

        >

          {/* TOP */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div>

              <h2 className="text-2xl md:text-3xl font-semibold break-words">

                Team Members

              </h2>

              <p className="text-gray-400 mt-2">

                Select users for this project

              </p>

            </div>

            <div className="
              bg-blue-600
              px-4
              py-2
              rounded-xl
              text-sm
              font-medium
              w-fit
            ">

              {selectedMembers.length} Selected

            </div>

          </div>

          {/* USERS */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {
              users.map((user) => (

                <motion.div

                  whileHover={{
                    scale: 1.01
                  }}

                  key={user._id}

                  onClick={() =>
                    handleSelect(
                      user._id
                    )
                  }

                  className={`
                    rounded-2xl
                    p-5
                    border
                    transition-all
                    duration-300
                    ${
                      String(
                        project?.admin?._id
                      ) ===
                      String(
                        currentUserId
                      )
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-80"
                    }
                    ${
                      selectedMembers.includes(
                        user._id
                      )
                        ? "bg-blue-600 border-blue-400"
                        : "bg-[#0f172a] border-gray-700 hover:border-blue-500"
                    }
                  `}

                >

                  <div className="flex items-center gap-4">

                    {/* AVATAR */}

                    <div className="
                      w-14
                      h-14
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-400
                      to-blue-600
                      flex
                      items-center
                      justify-center
                      text-xl
                      font-bold
                      flex-shrink-0
                    ">

                      {
                        user.name
                          ?.charAt(0)
                          .toUpperCase()
                      }

                    </div>

                    {/* USER INFO */}

                    <div className="flex-1 min-w-0">

                      <h3 className="text-lg font-semibold break-words">

                        {user.name}

                      </h3>

                      <p className="text-gray-300 text-sm break-all">

                        {user.email}

                      </p>

                    </div>

                    {/* CHECK */}

                    <div className={`
                      w-7
                      h-7
                      rounded-full
                      flex
                      items-center
                      justify-center
                      border
                      flex-shrink-0
                      ${
                        selectedMembers.includes(
                          user._id
                        )
                          ? "bg-white text-blue-600 border-white"
                          : "border-gray-500"
                      }
                    `}>

                      {
                        selectedMembers.includes(
                          user._id
                        ) && <FaCheck />
                      }

                    </div>

                  </div>

                </motion.div>

              ))
            }

          </div>

          {/* EMPTY */}

          {
            users.length === 0 && (

              <div className="text-center py-20 text-gray-400">

                No users found

              </div>

            )
          }

          {/* SAVE BUTTON */}

          {
            String(
              project?.admin?._id
            ) ===
            String(
              currentUserId
            ) && (

              <div className="mt-10 flex justify-end">

                <button
                  onClick={
                    saveMembers
                  }
                  disabled={loading}
                  className={`
                    px-8
                    py-3
                    rounded-2xl
                    font-semibold
                    shadow-2xl
                    transition-all
                    duration-300
                    ${
                      loading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105"
                    }
                  `}
                >

                  {
                    loading
                      ? "Saving..."
                      : "Save Members"
                  }

                </button>

              </div>

            )
          }

        </motion.div>

      </div>

    </div>

  );

}