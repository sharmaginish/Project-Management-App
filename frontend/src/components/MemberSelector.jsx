import { useEffect, useState } from "react";
import axios from "axios";

export default function MemberSelector({
  projectId,
}) {

  const [users, setUsers] = useState([]);

  const [selectedMembers,
    setSelectedMembers] = useState([]);

  const token =
    user?.token;



  useEffect(() => {

    fetchUsers();

    fetchProject();

  }, []);




  // GET ALL USERS
  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/projects/users",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);

    } catch (err) {

      console.log(err);

    }

  };




  // GET CURRENT PROJECT
  const fetchProject = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/projects/${projectId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setSelectedMembers(

        res.data.members.map(
          (member) => member._id
        )

      );

    } catch (err) {

      console.log(err);

    }

  };




  // SELECT UNSELECT MEMBER
  const toggleMember = (userId) => {

    if (
      selectedMembers.includes(userId)
    ) {

      setSelectedMembers(

        selectedMembers.filter(
          (id) => id !== userId
        )

      );

    } else {

      setSelectedMembers([
        ...selectedMembers,
        userId,
      ]);

    }

  };




  // SAVE MEMBERS
  const saveMembers = async () => {

    try {

      await axios.put(

        `http://localhost:5000/api/projects/${projectId}/members`,

        {
          members: selectedMembers,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

      alert("Members Updated");

    } catch (err) {

      console.log(err);

    }

  };




  return (

    <div className="bg-white p-5 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-5">
        Project Members
      </h2>



      <div className="space-y-3">

        {users.map((user) => (

          <div
            key={user._id}
            className="flex items-center gap-3"
          >

            <input
              type="checkbox"

              checked={
                selectedMembers.includes(
                  user._id
                )
              }

              onChange={() =>
                toggleMember(user._id)
              }
            />

            <span>
              {user.name}
            </span>

          </div>

        ))}

      </div>



      <button

        onClick={saveMembers}

        className="
          mt-5
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2
          rounded-lg
        "
      >
        Save Members
      </button>

    </div>

  );

}