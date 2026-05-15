import Sidebar from "../components/Sidebar";

import { motion } from "framer-motion";

import {
  FaEnvelope,
  FaUserShield,
  FaUser,
  FaTasks,
  FaFolderOpen,
  FaChartLine
} from "react-icons/fa";

export default function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = localStorage.getItem("role");

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="md:ml-72 min-h-screen p-4 md:p-8 flex items-center justify-center">

        <motion.div

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.4
          }}

          className="
            bg-[#111827]
            w-full
            max-w-5xl
            rounded-[35px]
            p-5
            md:p-10
            shadow-2xl
            border
            border-white/10
          "

        >

          {/* TOP SECTION */}

          <div className="flex flex-col lg:flex-row gap-8 lg:items-center">

            {/* PROFILE IMAGE */}

            <div className="flex justify-center">

              <motion.div

                whileHover={{
                  scale: 1.05
                }}

                className="
                  w-28
                  h-28
                  md:w-36
                  md:h-36
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-500
                  to-purple-600
                  flex
                  items-center
                  justify-center
                  text-5xl
                  md:text-6xl
                  font-bold
                  shadow-xl
                "

              >

                {
                  user?.name
                    ?.charAt(0)
                    ?.toUpperCase() || "U"
                }

              </motion.div>

            </div>

            {/* USER INFO */}

            <div className="flex-1 text-center lg:text-left">

              <h1 className="text-3xl md:text-5xl font-bold break-words">

                {user?.name || "Unknown User"}

              </h1>

              <div className="mt-4 flex flex-col gap-3">

                {/* EMAIL */}

                <div className="flex items-center justify-center lg:justify-start gap-3 text-gray-300 break-all">

                  <FaEnvelope className="text-indigo-400 flex-shrink-0" />

                  <span>

                    {user?.email}

                  </span>

                </div>

                {/* ROLE */}

                <div className="flex items-center justify-center lg:justify-start gap-3">

                  <div className="
                    bg-gradient-to-r
                    from-indigo-500
                    to-purple-600
                    px-5
                    py-2
                    rounded-full
                    flex
                    items-center
                    gap-2
                    shadow-lg
                    w-fit
                  ">

                    <FaUserShield />

                    {role}

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">

            {/* CARD */}

            <div className="
              bg-[#1f2937]
              p-5
              rounded-2xl
              border
              border-white/5
            ">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">

                    Role

                  </p>

                  <h2 className="text-2xl font-bold mt-2 break-words">

                    {role}

                  </h2>

                </div>

                <FaUser className="text-3xl text-indigo-400" />

              </div>

            </div>

            {/* CARD */}

            <div className="
              bg-[#1f2937]
              p-5
              rounded-2xl
              border
              border-white/5
            ">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">

                    Tasks Completed

                  </p>

                  <h2 className="text-2xl font-bold mt-2">

                    0

                  </h2>

                </div>

                <FaTasks className="text-3xl text-green-400" />

              </div>

            </div>

            {/* CARD */}

            <div className="
              bg-[#1f2937]
              p-5
              rounded-2xl
              border
              border-white/5
            ">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">

                    Active Projects

                  </p>

                  <h2 className="text-2xl font-bold mt-2">

                    0

                  </h2>

                </div>

                <FaFolderOpen className="text-3xl text-cyan-400" />

              </div>

            </div>

            {/* CARD */}

            <div className="
              bg-[#1f2937]
              p-5
              rounded-2xl
              border
              border-white/5
            ">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">

                    Productivity

                  </p>

                  <h2 className="text-2xl font-bold mt-2">

                    0%

                  </h2>

                </div>

                <FaChartLine className="text-3xl text-purple-400" />

              </div>

            </div>

          </div>

          {/* ACCOUNT DETAILS */}

          <div className="
            mt-10
            bg-[#1f2937]
            p-6
            rounded-3xl
            border
            border-white/5
          ">

            <h2 className="text-2xl font-bold mb-6">

              Account Details

            </h2>

            <div className="space-y-5">

              {/* NAME */}

              <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-2
                bg-[#111827]
                p-4
                rounded-2xl
              ">

                <span className="text-gray-400">

                  Full Name

                </span>

                <span className="font-semibold break-words">

                  {user?.name}

                </span>

              </div>

              {/* EMAIL */}

              <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-2
                bg-[#111827]
                p-4
                rounded-2xl
              ">

                <span className="text-gray-400">

                  Email

                </span>

                <span className="font-semibold break-all">

                  {user?.email}

                </span>

              </div>

              {/* ROLE */}

              <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-2
                bg-[#111827]
                p-4
                rounded-2xl
              ">

                <span className="text-gray-400">

                  Account Role

                </span>

                <span className="font-semibold">

                  {role}

                </span>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>

  );

}