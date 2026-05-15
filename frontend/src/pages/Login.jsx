import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login({
  setShowSignup
}) {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

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
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-3 rounded mb-4"
        >
          Login
        </button>

        <button
          onClick={() =>
  navigate("/signup")
}
          className="text-blue-500 w-full"
        >
          Don't have an account? Signup
        </button>

      </div>

    </div>

  );

}