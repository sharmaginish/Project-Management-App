import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  FaUserShield,
  FaTrash,
  FaUsers
} from "react-icons/fa";

export default function Members() {

  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);

  const token = user?.token;

  const role = localStorage.getItem("role");

  useEffect(() => {

    fetchMembers();

  }, []);

  const fetchMembers = async () => {

    try {

      const res = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/auth/users",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setMembers(res.data);

      setLoading(false);

    } catch(err){

      console.log(err);

      setLoading(false);

    }

  };

  const removeMember = async (id) => {

    if(role !== "Admin"){

      return alert(
        "Only admin can remove members"
      );

    }

    try {

      await axios.delete(
        `https://project-management-app-jtoh.onrender.com/api/auth/users/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchMembers();

    } catch(err){

      console.log(err);

    }

  };

  if(role !== "Admin"){

    return (

      <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center text-3xl">

        Access Denied

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="md:ml-72 p-4 md:p-10">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-3xl md:text-5xlxl font-bold">

              Team Members

            </h1>

            <p className="text-gray-400 mt-3 text-lg">

              Manage your workspace members

            </p>

          </div>

          <div className="bg-[#111827] px-6 py-4 rounded-2xl border border-white/10">

            <p className="text-gray-400">

              Total Members

            </p>

            <h2 className="text-4xl font-bold mt-2">

              {members.length}

            </h2>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {
            loading ? (

              <div className="text-2xl text-gray-400">

                Loading members...

              </div>

            ) : members.length === 0 ? (

              <div className="text-2xl text-gray-400">

                No Members Found

              </div>

            ) : (

              members.map((member,index)=>(

                <motion.div

                  initial={{
                    opacity:0,
                    y:30
                  }}

                  animate={{
                    opacity:1,
                    y:0
                  }}

                  transition={{
                    delay:index * 0.1
                  }}

                  key={member._id}

                  className="bg-[#111827] p-6 rounded-3xl border border-white/10"

                >

                  <div className="flex justify-between items-start">

                    <div>

                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold">

                        {member.name[0]}

                      </div>

                      <h2 className="text-2xl font-bold mt-5">

                        {member.name}

                      </h2>

                      <p className="text-gray-400 mt-2">

                        {member.email}

                      </p>

                    </div>

                    <button
                      onClick={() =>
                        removeMember(member._id)
                      }
                      className="bg-red-500 hover:bg-red-600 transition p-3 rounded-xl"
                    >

                      <FaTrash />

                    </button>

                  </div>

                  <div className="mt-6 flex justify-between items-center">

                    <div className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full flex items-center gap-2">

                      <FaUserShield />

                      {member.role}

                    </div>

                    <div className="text-gray-500 text-sm">

                      Workspace User

                    </div>

                  </div>

                </motion.div>

              ))

            )
          }

        </div>

      </div>

    </div>

  );

}