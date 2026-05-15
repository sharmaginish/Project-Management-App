import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProjectDetails() {

  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(null);

  const [selectedMembers, setSelectedMembers] = useState([]);

  const [loading, setLoading] = useState(false);

  const token = user?.token;

  const userInfo =
    JSON.parse(localStorage.getItem("user"));

  const currentUserId = userInfo?._id ||
  userInfo?.id ||
  "";

  useEffect(() => {

    fetchUsers();

    fetchProject();

  }, []);

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/projects/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);

    } catch (err) {

      console.log(err);

      alert("Failed to load users");
    }
  };

  const fetchProjects = async () => {

  try {

    setLoading(true);

    const res =
      await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/projects",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setProjects(res.data);

  } catch (err) {

    console.log(err);

  } finally {

    setLoading(false);
  }
};

  const handleSelect = (userId) => {

    // ONLY ADMIN CAN SELECT
    if (
      String(project?.admin?._id) !== String(currentUserId)
    ) {
      return;
    }

    if (selectedMembers.includes(userId)) {

      setSelectedMembers(
        selectedMembers.filter(
          (memberId) =>
            memberId !== userId
        )
      );

    } else {

      setSelectedMembers([
        ...selectedMembers,
        userId,
      ]);
    }
  };

  const saveMembers = async () => {

    try {

      setLoading(true);

      const res = await axios.put(
        `https://project-management-app-jtoh.onrender.com/api/projects/${id}/members`,
        {
          members: selectedMembers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      alert("Members Saved Successfully");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Error saving members"
      );

    } finally {

      setLoading(false);
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
            Manage your team professionally
          </p>

        </div>

        {/* Main Card */}
        <div className="bg-[#1e293b] rounded-3xl shadow-2xl border border-gray-700 p-8">

          {/* Top */}
          <div className="flex items-center justify-between mb-8">

            <h2 className="text-2xl font-semibold">
              Team Members
            </h2>

            <div className="bg-blue-600 px-4 py-2 rounded-xl text-sm font-medium">
              {selectedMembers.length} Selected
            </div>

          </div>

          {/* USERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {users.map((user) => (

              <div
                key={user._id}
                onClick={() =>
                  handleSelect(user._id)
                }
                className={`rounded-2xl p-5 border transition-all duration-300 ${
                  project?.admin?._id ===
                  currentUserId
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-80"
                } ${
                  selectedMembers.includes(
                    user._id
                  )
                    ? "bg-blue-600 border-blue-400 scale-[1.02]"
                    : "bg-[#0f172a] border-gray-700 hover:border-blue-500"
                }`}
              >

                <div className="flex items-center gap-4">

                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center text-xl font-bold">

                    {user.name
                      ?.charAt(0)
                      .toUpperCase()}

                  </div>

                  {/* USER INFO */}
                  <div className="flex-1">

                    <h3 className="text-lg font-semibold">
                      {user.name}
                    </h3>

                    <p className="text-gray-300 text-sm">
                      {user.email}
                    </p>

                  </div>

                  {/* CHECKBOX */}
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(
                      user._id
                    )}
                    readOnly
                    className="w-5 h-5 accent-blue-500"
                  />

                </div>

              </div>

            ))}

          </div>

          {/* EMPTY */}
          {users.length === 0 && (

            <div className="text-center py-20 text-gray-400">
              No users found
            </div>

          )}

          {/* ONLY ADMIN CAN SEE BUTTON */}
            {String(project?.admin?._id) ===
            String(currentUserId) && (

            <div className="mt-10 flex justify-end">

             
              <button
                onClick={saveMembers}
                disabled={loading}
                className={`px-8 py-3 rounded-2xl font-semibold shadow-2xl transition-all duration-300 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105"
                }`}
              >

                {loading
                  ? "Saving..."
                  : "Save Members"}

              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}