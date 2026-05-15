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

export default function Settings() {

  const [theme,setTheme] =
  useState(
    localStorage.getItem("theme")
    || "dark"
  );

  const [emailNotifications,
    setEmailNotifications] =
  useState(
    JSON.parse(
      localStorage.getItem(
        "emailNotifications"
      )
    ) ?? true
  );

  const [taskAlerts,
    setTaskAlerts] =
  useState(
    JSON.parse(
      localStorage.getItem(
        "taskAlerts"
      )
    ) ?? true
  );

  const [projectAlerts,
    setProjectAlerts] =
  useState(
    JSON.parse(
      localStorage.getItem(
        "projectAlerts"
      )
    ) ?? true
  );

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(()=>{

    localStorage.setItem(
      "theme",
      theme
    );

    document.body.className =
      theme === "light"
      ? "bg-white"
      : "bg-[#0f172a]";

  },[theme]);

  useEffect(()=>{

    localStorage.setItem(
      "emailNotifications",
      JSON.stringify(
        emailNotifications
      )
    );

  },[emailNotifications]);

  useEffect(()=>{

    localStorage.setItem(
      "taskAlerts",
      JSON.stringify(
        taskAlerts
      )
    );

  },[taskAlerts]);

  useEffect(()=>{

    localStorage.setItem(
      "projectAlerts",
      JSON.stringify(
        projectAlerts
      )
    );

  },[projectAlerts]);

  const logout = () => {

    localStorage.clear();

    window.location.href="/login";

  };

  return (

    <div className={`min-h-screen ${
      theme === "light"
      ? "bg-gray-100 text-black"
      : "bg-[#0f172a] text-white"
    }`}>

      <Sidebar />

      <div className="md:ml-72 p-4 md:p-10">

        <div className="mb-10">

          <h1 className="text-3xl md:text-5xlxl font-bold">

            Settings

          </h1>

          <p className={`mt-3 text-lg ${
            theme === "light"
            ? "text-gray-600"
            : "text-gray-400"
          }`}>

            Manage your account,
            workspace and preferences

          </p>

        </div>

        <div className="space-y-8">

          <div className={`p-8 rounded-3xl border ${
            theme === "light"
            ? "bg-white border-gray-200"
            : "bg-[#111827] border-white/10"
          }`}>

            <div className="flex items-center gap-4 mb-8">

              <FaUserShield className="text-3xl text-indigo-400" />

              <div>

                <h2 className="text-3xl font-bold">

                  Account Settings

                </h2>

                <p className={`mt-1 ${
                  theme === "light"
                  ? "text-gray-600"
                  : "text-gray-400"
                }`}>

                  Manage personal information

                </p>

              </div>

            </div>

            <div className="space-y-6">

              <div>

                <p className={`mb-2 ${
                  theme === "light"
                  ? "text-gray-600"
                  : "text-gray-400"
                }`}>

                  Full Name

                </p>

                <div className={`flex items-center gap-4 p-4 rounded-2xl ${
                  theme === "light"
                  ? "bg-gray-100"
                  : "bg-[#1f2937]"
                }`}>

                  <FaUser />

                  <input
                    type="text"
                    value={user?.name}
                    className="bg-transparent outline-none w-full"
                    readOnly
                  />

                </div>

              </div>

              <div>

                <p className={`mb-2 ${
                  theme === "light"
                  ? "text-gray-600"
                  : "text-gray-400"
                }`}>

                  Email Address

                </p>

                <div className={`flex items-center gap-4 p-4 rounded-2xl ${
                  theme === "light"
                  ? "bg-gray-100"
                  : "bg-[#1f2937]"
                }`}>

                  <FaEnvelope />

                  <input
                    type="text"
                    value={user?.email}
                    className="bg-transparent outline-none w-full"
                    readOnly
                  />

                </div>

              </div>

              <div>

                <p className={`mb-2 ${
                  theme === "light"
                  ? "text-gray-600"
                  : "text-gray-400"
                }`}>

                  Role

                </p>

                <div className={`p-4 rounded-2xl font-bold ${
                  theme === "light"
                  ? "bg-gray-100"
                  : "bg-[#1f2937]"
                }`}>

                  {user?.role}

                </div>

              </div>

            </div>

          </div>

          <div className={`p-8 rounded-3xl border ${
            theme === "light"
            ? "bg-white border-gray-200"
            : "bg-[#111827] border-white/10"
          }`}>

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

                <h2 className="text-3xl font-bold">

                  Appearance

                </h2>

                <p className={`mt-1 ${
                  theme === "light"
                  ? "text-gray-600"
                  : "text-gray-400"
                }`}>

                  Customize your experience

                </p>

              </div>

            </div>

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-2xl font-bold">

                  Theme Mode

                </h3>

                <p className={`mt-2 ${
                  theme === "light"
                  ? "text-gray-600"
                  : "text-gray-400"
                }`}>

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
                className={`px-6 py-3 rounded-2xl font-bold ${
                  theme === "dark"
                  ? "bg-indigo-500"
                  : "bg-yellow-500"
                }`}
              >

                {
                  theme === "dark"
                  ? "Dark"
                  : "Light"
                }

              </button>

            </div>

          </div>

          <div className={`p-8 rounded-3xl border ${
            theme === "light"
            ? "bg-white border-gray-200"
            : "bg-[#111827] border-white/10"
          }`}>

            <div className="flex items-center gap-4 mb-8">

              <FaBell className="text-3xl text-purple-400" />

              <div>

                <h2 className="text-3xl font-bold">

                  Notifications

                </h2>

                <p className={`mt-1 ${
                  theme === "light"
                  ? "text-gray-600"
                  : "text-gray-400"
                }`}>

                  Manage all notifications

                </p>

              </div>

            </div>

            <div className="space-y-6">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl font-bold">

                    Email Notifications

                  </h3>

                  <p className={`mt-2 ${
                    theme === "light"
                    ? "text-gray-600"
                    : "text-gray-400"
                  }`}>

                    Receive updates via email

                  </p>

                </div>

                <button
                  onClick={() =>
                    setEmailNotifications(
                      !emailNotifications
                    )
                  }
                  className={`px-5 py-2 rounded-2xl ${
                    emailNotifications
                    ? "bg-green-500"
                    : "bg-gray-500"
                  }`}
                >

                  {
                    emailNotifications
                    ? "ON"
                    : "OFF"
                  }

                </button>

              </div>

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl font-bold">

                    Task Alerts

                  </h3>

                  <p className={`mt-2 ${
                    theme === "light"
                    ? "text-gray-600"
                    : "text-gray-400"
                  }`}>

                    Get task status alerts

                  </p>

                </div>

                <button
                  onClick={() =>
                    setTaskAlerts(
                      !taskAlerts
                    )
                  }
                  className={`px-5 py-2 rounded-2xl ${
                    taskAlerts
                    ? "bg-green-500"
                    : "bg-gray-500"
                  }`}
                >

                  {
                    taskAlerts
                    ? "ON"
                    : "OFF"
                  }

                </button>

              </div>

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl font-bold">

                    Project Alerts

                  </h3>

                  <p className={`mt-2 ${
                    theme === "light"
                    ? "text-gray-600"
                    : "text-gray-400"
                  }`}>

                    Project progress notifications

                  </p>

                </div>

                <button
                  onClick={() =>
                    setProjectAlerts(
                      !projectAlerts
                    )
                  }
                  className={`px-5 py-2 rounded-2xl ${
                    projectAlerts
                    ? "bg-green-500"
                    : "bg-gray-500"
                  }`}
                >

                  {
                    projectAlerts
                    ? "ON"
                    : "OFF"
                  }

                </button>

              </div>

            </div>

          </div>

          <div className={`p-8 rounded-3xl border ${
            theme === "light"
            ? "bg-white border-gray-200"
            : "bg-[#111827] border-white/10"
          }`}>

            <div className="flex items-center gap-4 mb-8">

              <FaLock className="text-3xl text-red-400" />

              <div>

                <h2 className="text-3xl font-bold">

                  Security

                </h2>

                <p className={`mt-1 ${
                  theme === "light"
                  ? "text-gray-600"
                  : "text-gray-400"
                }`}>

                  Session & authentication settings

                </p>

              </div>

            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-2xl flex items-center gap-3 font-bold"
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}