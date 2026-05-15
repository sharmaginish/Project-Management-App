import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  const token = localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            token ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;