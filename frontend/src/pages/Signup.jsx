import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const signupUser = async () => {

    try {

      await axios.post(
        "https://project-management-app-jtoh.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role: "Admin",
        }
      );

      alert("Signup Successful");

      navigate("/login");

    } catch (err) {

      alert(err.response.data.message);

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Enter name"
          className="border w-full p-3 mb-4 rounded-lg text-sm sm:text-base"
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Enter email"
          className="border w-full p-3 mb-4 rounded-lg text-sm sm:text-base"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter password"
          className="border w-full p-3 mb-4 rounded-lg text-sm sm:text-base"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={signupUser}
          className="bg-green-500 hover:bg-green-600 transition text-white w-full p-3 rounded-lg"
        >
          Signup
        </button>

        <button
          onClick={() =>
            navigate("/login")
          }
          className="text-blue-500 w-full mt-4 text-sm sm:text-base"
        >
          Already have an account? Login
        </button>

      </div>

    </div>

  );

}