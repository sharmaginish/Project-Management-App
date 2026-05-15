import { useEffect, useState } from "react";
import axios from "axios";

export default function ProjectDetails({ projectId }) {
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/projects/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = (userId) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(
        selectedMembers.filter((id) => id !== userId)
      );
    } else {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  const saveMembers = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/projects/${projectId}/members`,
        { members: selectedMembers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Members Added Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Project Members
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your team members professionally
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#1e293b] rounded-3xl shadow-2xl p-8 border border-gray-700">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Team Members
            </h2>

            <span className="bg-blue-600 px-4 py-2 rounded-xl text-sm">
              {selectedMembers.length} Selected
            </span>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => handleSelect(user._id)}
                className={`cursor-pointer transition-all duration-300 rounded-2xl p-5 border ${
                  selectedMembers.includes(user._id)
                    ? "bg-blue-600 border-blue-400"
                    : "bg-[#0f172a] border-gray-700 hover:border-blue-500"
                }`}
              >
                <div className="flex items-center gap-4">

                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-xl font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {user.name}
                    </h3>

                    <p className="text-gray-300 text-sm">
                      {user.email}
                    </p>
                  </div>

                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(user._id)}
                    onChange={() => {}}
                    className="w-5 h-5 accent-blue-500"
                  />
                </div>
              </div>
            ))}

          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No members found
            </div>
          )}

          {/* Button */}
          <div className="mt-10 flex justify-end">
            <button
              onClick={saveMembers}
              className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-3 rounded-2xl font-semibold shadow-lg"
            >
              Save Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}