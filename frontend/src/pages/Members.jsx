import Sidebar from "../components/Sidebar";

import { useState } from "react";

export default function Members(){

  const [members,setMembers] = useState([
    "Rahul",
    "Priya",
    "Ankit"
  ]);

  const [name,setName] = useState("");

  const addMember = () => {

    if(!name) return;

    setMembers([...members,name]);

    setName("");
  };

  const removeMember = (index) => {

    const updated = members.filter(
      (_,i) => i !== index
    );

    setMembers(updated);
  };

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="ml-72 p-10">

        <h1 className="text-5xl font-bold mb-10">
          Team Members
        </h1>

        <div className="bg-[#111827] p-8 rounded-3xl">

          <div className="flex gap-4 mb-8">

            <input
              type="text"
              value={name}
              onChange={(e)=>
                setName(e.target.value)
              }
              placeholder="Member name"
              className="bg-[#1f2937] p-4 rounded-2xl w-full"
            />

            <button
              onClick={addMember}
              className="bg-indigo-500 px-6 rounded-2xl"
            >
              Add
            </button>

          </div>

          <div className="space-y-4">

            {
              members.map((member,index)=>(

                <div
                  key={index}
                  className="bg-[#1f2937] p-4 rounded-2xl flex justify-between items-center"
                >

                  <span>{member}</span>

                  <button
                    onClick={() =>
                      removeMember(index)
                    }
                    className="bg-red-500 px-4 py-2 rounded-xl"
                  >
                    Remove
                  </button>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}