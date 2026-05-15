import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  FaUserShield,
  FaTrash,
  FaUsers,
  FaSearch
} from "react-icons/fa";

export default function Members() {

  const [members, setMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // FIXED USER + TOKEN

  const user = JSON.parse(
    sessionStorage.getItem("user")
  ) || {};

  const token =
    sessionStorage.getItem("token");

  const role =
    sessionStorage.getItem("role");

  useEffect(() => {

    fetchMembers();

  }, []);

  // FETCH MEMBERS

  const fetchMembers =
    async () => {

      try {

        setLoading(true);

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

        setMembers(res.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

  // REMOVE MEMBER

  const removeMember =
    async (id) => {

      if (
        role !== "Admin"
      ) {

        return alert(
          "Only admin can remove members"
        );

      }

      const confirmDelete =
        window.confirm(
          "Remove this member?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(
          `https://project-management-app-jtoh.onrender.com/api/auth/users/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchMembers();

      } catch (err) {

        console.log(err);

      }

    };

  // ACCESS CONTROL

  if (
    role !== "Admin"
  ) {

    return (

      <div className="
        min-h-screen
        bg-[#0f172a]
        text-white
        flex
        justify-center
        items-center
        p-6
      ">

        <div className="
          bg-[#111827]
          p-10
          rounded-3xl
          border
          border-white/10
          text-center
        ">

          <h1 className="text-3xl font-bold">

            Access Denied

          </h1>

          <p className="text-gray-400 mt-3">

            Only admins can manage members

          </p>

        </div>

      </div>

    );

  }

  // SEARCH FILTER

  const filteredMembers =
    members.filter((member) =>
      member.name
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

              Team Members

            </h1>

            <p className="text-gray-400 mt-3 text-base md:text-lg">

              Manage your workspace members

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

              Total Members

            </p>

            <h2 className="text-4xl font-bold mt-2">

              {members.length}

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
            placeholder="Search Members"
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

        {/* MEMBERS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            loading ? (

              <div className="text-xl text-gray-400">

                Loading members...

              </div>

            ) : filteredMembers.length === 0 ? (

              <div className="text-xl text-gray-400">

                No Members Found

              </div>

            ) : (

              filteredMembers.map(
                (
                  member,
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

                    key={member._id}

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

                        {/* AVATAR */}

                        <div className="
                          w-20
                          h-20
                          rounded-full
                          bg-gradient-to-r
                          from-indigo-500
                          to-purple-600
                          flex
                          items-center
                          justify-center
                          text-3xl
                          font-bold
                        ">

                          {
                            member.name
                              ?.charAt(0)
                              ?.toUpperCase()
                          }

                        </div>

                        {/* NAME */}

                        <h2 className="text-xl md:text-2xl font-bold mt-5 break-words">

                          {member.name}

                        </h2>

                        {/* EMAIL */}

                        <p className="text-gray-400 mt-2 break-all">

                          {member.email}

                        </p>

                      </div>

                      {/* DELETE */}

                      <button
                        onClick={() =>
                          removeMember(
                            member._id
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
                        flex
                        items-center
                        gap-2
                        w-fit
                      ">

                        <FaUserShield />

                        {member.role}

                      </div>

                      <div className="text-gray-500 text-sm">

                        Workspace User

                      </div>

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