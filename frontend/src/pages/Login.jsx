

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  FaEnvelope,
  FaLock,
  FaUserShield,
} from "react-icons/fa";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Member");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {

      setLoading(true);

      const res = await axios.post(
        "https://project-management-app-jtoh.onrender.com/api/auth/login",
        {
          email,
          password,
          role,
        }
      );

      // SAVE TOKEN
      sessionStorage.setItem(
        "token",
        res.data.token
      );

      // SAVE USER ONLY
      sessionStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // SAVE ROLE
      sessionStorage.setItem(
        "role",
        res.data.user.role
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Login Failed"
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
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.5,
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

        <div className="text-center mb-8">

          <h1 className="text-3xl sm:text-5xl font-bold text-white">

            AstraDesk

          </h1>

          <p className="text-gray-400 mt-3 text-sm sm:text-base">

            Smart Project Management Platform

          </p>

        </div>

        <div className="space-y-5">

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

          {/* LOGIN BUTTON */}

          <motion.button

            whileHover={{
              scale: 1.02,
            }}

            whileTap={{
              scale: 0.98,
            }}

            onClick={handleLogin}

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

            {loading ? "Logging in..." : "Login"}

          </motion.button>

          {/* SIGNUP */}

          

          <button
            onClick={() =>
              navigate("/signup")
            }
            className="
              text-indigo-400
              w-full
              mt-2
              text-sm
              sm:text-base
            "
          >

            Don't have an account? Signup

          </button>

        </div>

      </motion.div>

    </div>

  );

}