import {
  FaHome,
  FaTasks,
  FaUserCircle,
  FaSignOutAlt,
  FaChartPie,
  FaCog,
  FaUsers,
  FaFolderOpen,
  FaBars,
  FaTimes
} from "react-icons/fa";

import {
  Link,
  useLocation
} from "react-router-dom";

import {
  useState,
  useEffect
} from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

export default function Sidebar() {

  const [open, setOpen] =
    useState(false);

  const location =
    useLocation();

  const user = JSON.parse(
    sessionStorage.getItem("user")
  ) || {};

  const role =
    sessionStorage.getItem("role");

  // AUTO CLOSE ON DESKTOP

  useEffect(() => {

    const handleResize =
      () => {

        if (
          window.innerWidth >= 768
        ) {

          setOpen(false);

        }

      };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  // LOGOUT

  const logout = () => {

    sessionStorage.clear();

    window.location.href =
      "/login";

  };

  // NAVIGATION

  const navItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />
    },

    {
      name: "Projects",
      path: "/projects",
      icon: <FaFolderOpen />
    },

    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks />
    },

    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartPie />
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle />
    },

    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />
    }

  ];

  // ADMIN MENU

  if (
    role === "Admin"
  ) {

    navItems.splice(
      3,
      0,
      {
        name: "Members",
        path: "/members",
        icon: <FaUsers />
      }
    );

  }

  return (

    <>

      {/* MOBILE BUTTON */}

      <button
        onClick={() =>
          setOpen(true)
        }
        className="
          md:hidden
          fixed
          top-5
          right-5
          z-50
          bg-[#111827]
          text-white
          p-4
          rounded-2xl
          shadow-2xl
          border
          border-white/10
        "
      >

        <FaBars className="text-2xl" />

      </button>

      {/* BACKDROP */}

      <AnimatePresence>

        {
          open && (

            <motion.div

              initial={{
                opacity: 0
              }}

              animate={{
                opacity: 1
              }}

              exit={{
                opacity: 0
              }}

              className="
                fixed
                inset-0
                bg-black/60
                z-40
                md:hidden
              "

              onClick={() =>
                setOpen(false)
              }

            />

          )
        }

      </AnimatePresence>

      {/* SIDEBAR */}

      <motion.div

        initial={{
          x:
            window.innerWidth < 768
              ? 300
              : -300
        }}

        animate={{
          x:
            open ||
            window.innerWidth >= 768
              ? 0
              : 300
        }}

        transition={{
          duration: 0.3
        }}

        className="
          fixed
          top-0
          right-0
          md:left-0
          md:right-auto
          h-screen
          w-72
          bg-[#111827]/95
          backdrop-blur-xl
          text-white
          p-6
          flex
          flex-col
          justify-between
          overflow-y-auto
          border-l
          md:border-r
          md:border-l-0
          border-white/10
          z-50
          shadow-2xl
        "

      >

        {/* TOP */}

        <div>

          {/* HEADER */}

          <div className="
            flex
            justify-between
            items-center
            mb-10
          ">

            <div>

              <h1 className="
                text-4xl
                font-black
                bg-gradient-to-r
                from-indigo-400
                to-purple-500
                bg-clip-text
                text-transparent
              ">

                AstraDesk

              </h1>

              <p className="text-gray-400 text-sm mt-2">

                Workspace Manager

              </p>

            </div>

            {/* CLOSE */}

            <button
              onClick={() =>
                setOpen(false)
              }
              className="
                md:hidden
                bg-[#1f2937]
                p-3
                rounded-xl
              "
            >

              <FaTimes />

            </button>

          </div>

          {/* NAV ITEMS */}

          <div className="space-y-3">

            {
              navItems.map(
                (
                  item,
                  index
                ) => (

                  <Link
                    to={item.path}
                    key={index}
                    onClick={() =>
                      setOpen(false)
                    }
                  >

                    <motion.div

                      whileHover={{
                        scale: 1.02,
                        x:
                          window.innerWidth < 768
                            ? -3
                            : 3
                      }}

                      whileTap={{
                        scale: 0.98
                      }}

                      className={`
                        flex
                        items-center
                        gap-4
                        p-4
                        rounded-2xl
                        transition-all
                        duration-300
                        group
                        ${
                          location.pathname ===
                          item.path
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg"
                            : "hover:bg-[#1f2937]"
                        }
                      `}

                    >

                      {/* ICON */}

                      <div className="
                        text-xl
                        group-hover:scale-110
                        transition-transform
                      ">

                        {item.icon}

                      </div>

                      {/* NAME */}

                      <span className="
                        text-lg
                        font-semibold
                      ">

                        {item.name}

                      </span>

                    </motion.div>

                  </Link>

                )
              )
            }

          </div>

        </div>

        {/* BOTTOM */}

        <div className="pt-8">

          {/* USER CARD */}

          <motion.div

            whileHover={{
              scale: 1.01
            }}

            className="
              bg-gradient-to-r
              from-[#1f2937]
              to-[#111827]
              p-5
              rounded-3xl
              border
              border-white/10
              shadow-xl
            "

          >

            <p className="text-gray-400 text-sm">

              Logged in as

            </p>

            <h2 className="
              text-xl
              font-bold
              mt-2
              break-words
            ">

              {user?.name || "User"}

            </h2>

            <div className="
              mt-3
              inline-block
              bg-indigo-500/20
              text-indigo-400
              px-4
              py-2
              rounded-full
              text-sm
              font-bold
            ">

              {role}

            </div>

          </motion.div>

          {/* LOGOUT */}

          <motion.button

            whileHover={{
              scale: 1.02
            }}

            whileTap={{
              scale: 0.98
            }}

            onClick={logout}

            className="
              mt-4
              w-full
              bg-gradient-to-r
              from-red-500
              to-red-600
              hover:from-red-600
              hover:to-red-700
              transition-all
              duration-300
              p-4
              rounded-2xl
              flex
              items-center
              justify-center
              gap-3
              font-bold
              shadow-xl
            "

          >

            <FaSignOutAlt />

            Logout

          </motion.button>

        </div>

      </motion.div>

    </>

  );

}