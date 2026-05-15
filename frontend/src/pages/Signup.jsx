import { useState } from "react";
import axios from "axios";

export default function Signup({ setShowSignup }) {

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
      setShowSignup(false);
      window.location.href = "/login";

    } catch (err) {

      alert(err.response.data.message);

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Enter name"
          className="border w-full p-3 mb-4 rounded"
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Enter email"
          className="border w-full p-3 mb-4 rounded"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter password"
          className="border w-full p-3 mb-4 rounded"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={signupUser}
          className="bg-green-500 text-white w-full p-3 rounded"
        >
          Signup
        </button>

      </div>

    </div>

  );

}