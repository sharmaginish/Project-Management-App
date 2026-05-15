import { useEffect,useState } from "react";
import axios from "axios";

export default function Profile(){

  const [user,setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {

    fetchProfile();

  },[]);

  const fetchProfile = async () => {

    try{

      const res = await axios.get(
        "https://project-management-app-jtoh.onrender.com/api/auth/profile",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setUser(res.data);

    }catch(err){

      console.log(err);

    }
  };

  if(!user){

    return (

      <div className="text-white p-10">
        Loading...
      </div>

    );
  }

  return (

    <div className="min-h-screen flex justify-center items-center text-white">

      <div className="glass p-10 rounded-3xl w-[400px]">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-white text-black flex items-center justify-center text-5xl font-bold">

            {user.name[0]}

          </div>

          <h1 className="text-4xl font-bold mt-5">
            {user.name}
          </h1>

          <p className="text-gray-400 mt-2">
            {user.email}
          </p>

          <div className="mt-5 bg-white text-black px-5 py-2 rounded-full">

            {user.role}

          </div>

        </div>

      </div>

    </div>
  );
}