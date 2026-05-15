import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "https://project-management-app-jtoh.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      window.location.reload();

    } catch (err) {

      alert(err.response.data.message);

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Login
        </h1>

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
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 transition text-white w-full p-3 rounded-lg mb-4"
        >
          Login
        </button>

        <button
          onClick={() =>
            navigate("/signup")
          }
          className="text-blue-500 w-full text-sm sm:text-base"
        >
          Don't have an account? Signup
        </button>

      </div>

    </div>

  );

}