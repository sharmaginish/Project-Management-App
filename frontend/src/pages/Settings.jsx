import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import {
  FaMoon,
  FaSun,
  FaBell,
  FaLock,
  FaSignOutAlt,
  FaUserShield,
  FaEnvelope,
  FaUser
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function Settings() {

  // THEME

  const [theme, setTheme] =
    useState(
      sessionStorage.getItem("theme")
      || "dark"
    );

  // NOTIFICATIONS

  const [emailNotifications,
    setEmailNotifications] =
    useState(
      JSON.parse(
        sessionStorage.getItem(
          "emailNotifications"
        )
      ) ?? true
    );

  const [taskAlerts,
    setTaskAlerts] =
    useState(
      JSON.parse(
        sessionStorage.getItem(
          "taskAlerts"
        )
      ) ?? true
    );

  const [projectAlerts,
    setProjectAlerts] =
    useState(
      JSON.parse(
        sessionStorage.getItem(
          "projectAlerts"
        )
      ) ?? true
    );

  // USER

  const user = JSON.parse(
    sessionStorage.getItem("user")
  ) || {};

  // THEME EFFECT

  useEffect(() => {

    sessionStorage.setItem(
      "theme",
      theme
    );

    document.body.className =
      theme === "light"
        ? "bg-gray-100"
        : "bg-[#0f172a]";

  }, [theme]);

  // SAVE SETTINGS

  useEffect(() => {

    sessionStorage.setItem(
      "emailNotifications",
      JSON.stringify(
        emailNotifications
      )
    );

  }, [emailNotifications]);

  useEffect(() => {

    sessionStorage.setItem(
      "taskAlerts",
      JSON.stringify(
        taskAlerts
      )
    );

  }, [taskAlerts]);

  useEffect(() => {

    sessionStorage.setItem(
      "projectAlerts",
      JSON.stringify(
        projectAlerts
      )
    );

  }, [projectAlerts]);

  // LOGOUT

  const logout = () => {

    sessionStorage.clear();

    window.location.href =
      "/login";

  };

  // THEME STYLES

  const isLight =
    theme === "light";

  const cardClass = isLight
    ? "bg-white border-gray-200"
    : "bg-[#111827] border-white/10";

  const inputClass = isLight
    ? "bg-gray-100"
    : "bg-[#1f2937]";

  const textMuted = isLight
    ? "text-gray-600"
    : "text-gray-400";

  return (

    <div className={`
      min-h-screen
      ${
        isLight
          ? "bg-gray-100 text-black"
          : "bg-[#0f172a] text-white"
      }
    `}>

      <Sidebar />

      <div className="md:ml-72 p-4 md:p-10">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-3xl md:text-5xl font-bold">

            Settings

          </h1>

          <p className={`mt-3 text-base md:text-lg ${textMuted}`}>

            Manage your account,
            workspace and preferences

          </p>

        </div>

        <div className="space-y-8">

          {/* ACCOUNT */}

          <motion.div

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            className={`
              p-5
              md:p-8
              rounded-3xl
              border
              ${cardClass}
            `}

          >

            <div className="flex items-center gap-4 mb-8">

              <FaUserShield className="text-3xl text-indigo-400" />

              <div>

                <h2 className="text-2xl md:text-3xl font-bold">

                  Account Settings

                </h2>

                <p className={`mt-1 ${textMuted}`}>

                  Manage personal information

                </p>

              </div>

            </div>

            <div className="space-y-6">

              {/* NAME */}

              <div>

                <p className={`mb-2 ${textMuted}`}>

                  Full Name

                </p>

                <div className={`
                  flex
                  items-center
                  gap-4
                  p-4
                  rounded-2xl
                  ${inputClass}
                `}>

                  <FaUser />

                  <input
                    type="text"
                    value={user?.name || ""}
                    className="
                      bg-transparent
                      outline-none
                      w-full
                    "
                    readOnly
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div>

                <p className={`mb-2 ${textMuted}`}>

                  Email Address

                </p>

                <div className={`
                  flex
                  items-center
                  gap-4
                  p-4
                  rounded-2xl
                  ${inputClass}
                `}>

                  <FaEnvelope />

                  <input
                    type="text"
                    value={user?.email || ""}
                    className="
                      bg-transparent
                      outline-none
                      w-full
                    "
                    readOnly
                  />

                </div>

              </div>

              {/* ROLE */}

              <div>

                <p className={`mb-2 ${textMuted}`}>

                  Role

                </p>

                <div className={`
                  p-4
                  rounded-2xl
                  font-bold
                  ${inputClass}
                `}>

                  {user?.role}

                </div>

              </div>

            </div>

          </motion.div>

          {/* APPEARANCE */}

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
              delay: 0.05
            }}

            className={`
              p-5
              md:p-8
              rounded-3xl
              border
              ${cardClass}
            `}

          >

            <div className="flex items-center gap-4 mb-8">

              {
                theme === "dark"
                  ? (
                    <FaMoon className="text-3xl text-indigo-400" />
                  )
                  : (
                    <FaSun className="text-3xl text-yellow-500" />
                  )
              }

              <div>

                <h2 className="text-2xl md:text-3xl font-bold">

                  Appearance

                </h2>

                <p className={`mt-1 ${textMuted}`}>

                  Customize your experience

                </p>

              </div>

            </div>

            <div className="
              flex
              flex-col
              md:flex-row
              md:justify-between
              md:items-center
              gap-5
            ">

              <div>

                <h3 className="text-xl md:text-2xl font-bold">

                  Theme Mode

                </h3>

                <p className={`mt-2 ${textMuted}`}>

                  Switch between dark and light mode

                </p>

              </div>

              <button
                onClick={() =>
                  setTheme(
                    theme === "dark"
                      ? "light"
                      : "dark"
                  )
                }
                className={`
                  px-6
                  py-3
                  rounded-2xl
                  font-bold
                  w-fit
                  ${
                    theme === "dark"
                      ? "bg-indigo-500"
                      : "bg-yellow-500"
                  }
                `}
              >

                {
                  theme === "dark"
                    ? "Dark"
                    : "Light"
                }

              </button>

            </div>

          </motion.div>

          {/* NOTIFICATIONS */}

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
              delay: 0.1
            }}

            className={`
              p-5
              md:p-8
              rounded-3xl
              border
              ${cardClass}
            `}

          >

            <div className="flex items-center gap-4 mb-8">

              <FaBell className="text-3xl text-purple-400" />

              <div>

                <h2 className="text-2xl md:text-3xl font-bold">

                  Notifications

                </h2>

                <p className={`mt-1 ${textMuted}`}>

                  Manage all notifications

                </p>

              </div>

            </div>

            <div className="space-y-6">

              {/* EMAIL */}

              <div className="
                flex
                flex-col
                md:flex-row
                md:justify-between
                md:items-center
                gap-5
              ">

                <div>

                  <h3 className="text-xl font-bold">

                    Email Notifications

                  </h3>

                  <p className={`mt-2 ${textMuted}`}>

                    Receive updates via email

                  </p>

                </div>

                <button
                  onClick={() =>
                    setEmailNotifications(
                      !emailNotifications
                    )
                  }
                  className={`
                    px-5
                    py-2
                    rounded-2xl
                    font-bold
                    w-fit
                    ${
                      emailNotifications
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }
                  `}
                >

                  {
                    emailNotifications
                      ? "ON"
                      : "OFF"
                  }

                </button>

              </div>

              {/* TASK */}

              <div className="
                flex
                flex-col
                md:flex-row
                md:justify-between
                md:items-center
                gap-5
              ">

                <div>

                  <h3 className="text-xl font-bold">

                    Task Alerts

                  </h3>

                  <p className={`mt-2 ${textMuted}`}>

                    Get task status alerts

                  </p>

                </div>

                <button
                  onClick={() =>
                    setTaskAlerts(
                      !taskAlerts
                    )
                  }
                  className={`
                    px-5
                    py-2
                    rounded-2xl
                    font-bold
                    w-fit
                    ${
                      taskAlerts
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }
                  `}
                >

                  {
                    taskAlerts
                      ? "ON"
                      : "OFF"
                  }

                </button>

              </div>

              {/* PROJECT */}

              <div className="
                flex
                flex-col
                md:flex-row
                md:justify-between
                md:items-center
                gap-5
              ">

                <div>

                  <h3 className="text-xl font-bold">

                    Project Alerts

                  </h3>

                  <p className={`mt-2 ${textMuted}`}>

                    Project progress notifications

                  </p>

                </div>

                <button
                  onClick={() =>
                    setProjectAlerts(
                      !projectAlerts
                    )
                  }
                  className={`
                    px-5
                    py-2
                    rounded-2xl
                    font-bold
                    w-fit
                    ${
                      projectAlerts
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }
                  `}
                >

                  {
                    projectAlerts
                      ? "ON"
                      : "OFF"
                  }

                </button>

              </div>

            </div>

          </motion.div>

          {/* SECURITY */}

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
              delay: 0.15
            }}

            className={`
              p-5
              md:p-8
              rounded-3xl
              border
              ${cardClass}
            `}

          >

            <div className="flex items-center gap-4 mb-8">

              <FaLock className="text-3xl text-red-400" />

              <div>

                <h2 className="text-2xl md:text-3xl font-bold">

                  Security

                </h2>

                <p className={`mt-1 ${textMuted}`}>

                  Session & authentication settings

                </p>

              </div>

            </div>

            <button
              onClick={logout}
              className="
                bg-red-500
                hover:bg-red-600
                transition
                px-6
                py-3
                rounded-2xl
                flex
                items-center
                gap-3
                font-bold
              "
            >

              <FaSignOutAlt />

              Logout

            </button>

          </motion.div>

        </div>

      </div>

    </div>

  );

}