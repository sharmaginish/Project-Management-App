import Sidebar from "../components/Sidebar";

import { motion } from "framer-motion";

import {
  FaEnvelope,
  FaUserShield
} from "react-icons/fa";

export default function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="ml-72 flex justify-center items-center min-h-screen p-6">

        <motion.div

          initial={{
            opacity:0,
            scale:0.8
          }}

          animate={{
            opacity:1,
            scale:1
          }}

          transition={{
            duration:0.5
          }}

          className="bg-[#111827] w-full max-w-md rounded-[35px] p-10 shadow-2xl border border-white/10"

        >

          <div className="flex flex-col items-center">

            <motion.div

              whileHover={{
                scale:1.08,
                rotate:5
              }}

              className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-6xl font-bold shadow-xl"

            >

              {user?.name?.[0]}

            </motion.div>

            <h1 className="text-4xl font-bold mt-6">

              {user?.name}

            </h1>

            <p className="text-gray-400 mt-2 flex items-center gap-2">

              <FaEnvelope />

              {user?.email}

            </p>

            <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">

              <FaUserShield />

              {user?.role}

            </div>

            <button className="mt-6 bg-indigo-500 hover:bg-indigo-600 transition px-6 py-3 rounded-2xl">

              Edit Profile

            </button>

          </div>

          <div className="mt-10 space-y-4">

            <div className="bg-[#1f2937] p-4 rounded-2xl flex justify-between">

              <span className="text-gray-400">
                Tasks Completed
              </span>

              <span className="font-bold">
                0
              </span>

            </div>

            <div className="bg-[#1f2937] p-4 rounded-2xl flex justify-between">

              <span className="text-gray-400">
                Productivity
              </span>

              <span className="font-bold">
                0%
              </span>

            </div>

            <div className="bg-[#1f2937] p-4 rounded-2xl flex justify-between">

              <span className="text-gray-400">
                Active Projects
              </span>

              <span className="font-bold">
                0
              </span>

            </div>

          </div>

        </motion.div>

      </div>

    </div>

  );

}