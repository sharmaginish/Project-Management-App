import { useNavigate } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserShield
} from "react-icons/fa";

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("Member");

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {

    if (!name || !email || !password) {

      return alert("Please fill all fields");

    }

    try {

      setLoading(true);

      await axios.post(
        "https://project-management-app-jtoh.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role
        }
      );

      alert("Signup Successful");

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Signup Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 sm:p-6">

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
          duration: 0.5
        }}

        className="
          bg-[#111827]
          w-full
          max-w-md
          rounded-[30px]
          p-6
          sm:p-10
          border
          border-white/10
          shadow-2xl
        "

      >

        {/* HEADER */}

        <div className="text-center mb-8">

          <h1 className="text-3xl sm:text-5xl font-bold text-white">

            AstraDesk

          </h1>

          <p className="text-gray-400 mt-3 text-sm sm:text-base">

            Create Your Workspace

          </p>

        </div>

        {/* FORM */}

        <div className="space-y-5">

          {/* NAME */}

          <div className="bg-[#1f2937] rounded-2xl flex items-center px-4">

            <FaUser className="text-gray-400" />

            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
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

          {/* EMAIL */}

          <div className="bg-[#1f2937] rounded-2xl flex items-center px-4">

            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
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

          {/* PASSWORD */}

          <div className="bg-[#1f2937] rounded-2xl flex items-center px-4">

            <FaLock className="text-gray-400" />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
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

          {/* ROLE */}

          <div className="bg-[#1f2937] rounded-2xl flex items-center px-4">

            <FaUserShield className="text-gray-400" />

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="
                bg-transparent
                w-full
                p-4
                outline-none
                text-white
              "
            >

              <option
                value="Member"
                className="text-black"
              >
                Member
              </option>

              <option
                value="Admin"
                className="text-black"
              >
                Admin
              </option>

            </select>

          </div>

          {/* SIGNUP BUTTON */}

          <motion.button

            whileHover={{
              scale: 1.02
            }}

            whileTap={{
              scale: 0.98
            }}

            onClick={handleSignup}

            disabled={loading}

            className="
              w-full
              bg-gradient-to-r
              from-indigo-500
              to-purple-600
              p-4
              rounded-2xl
              text-white
              font-bold
              text-lg
              shadow-xl
              disabled:opacity-50
            "

          >

            {loading ? "Creating Account..." : "Signup"}

          </motion.button>

          {/* LOGIN */}

          <button
            onClick={() =>
              navigate("/login")
            }
            className="
              text-indigo-400
              w-full
              mt-2
              text-sm
              sm:text-base
            "
          >

            Already have an account? Login

          </button>

        </div>

      </motion.div>

    </div>

  );

}