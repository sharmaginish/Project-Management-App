import {
  FaHome,
  FaTasks,
  FaProjectDiagram,
  FaChartPie,
  FaCog,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

export default function Sidebar(){

  const role = localStorage.getItem("role");

  const logout = () => {

    localStorage.clear();

    window.location.href="/login";
  };

  return (

    <motion.div
      initial={{x:-100,opacity:0}}
      animate={{x:0,opacity:1}}
      className="fixed left-0 top-0 h-screen w-72 bg-[#111827] border-r border-white/10 p-6 flex flex-col justify-between"
    >

      <div>

        <h1 className="text-4xl font-bold text-white mb-10">
          TaskFlow
        </h1>

        <div className="space-y-4">

          <Link to="/">
            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#1f2937] transition">

              <FaHome />

              Dashboard

            </div>
          </Link>

          <Link to="/">
            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#1f2937] transition">

              <FaTasks />

              Tasks

            </div>
          </Link>

          {
            role === "Admin" && (

              <Link to="/">
                <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#1f2937] transition">

                  <FaProjectDiagram />

                  Projects

                </div>
              </Link>

            )
          }

          <Link to="/">
            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#1f2937] transition">

              <FaChartPie />

              Analytics

            </div>
          </Link>

          <Link to="/profile">
            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#1f2937] transition">

              <FaUserCircle />

              Profile

            </div>
          </Link>

          <Link to="/">
            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#1f2937] transition">

              <FaCog />

              Settings

            </div>
          </Link>

        </div>

      </div>

      <div>

        <div className="bg-[#1f2937] p-4 rounded-2xl">

          <p className="text-gray-400 text-sm">
            Logged in as
          </p>

          <h2 className="text-xl font-bold mt-1">
            {role}
          </h2>

        </div>

        <button
          onClick={logout}
          className="mt-5 w-full bg-red-500 hover:bg-red-600 transition p-4 rounded-2xl flex items-center justify-center gap-3"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </motion.div>
  );
}