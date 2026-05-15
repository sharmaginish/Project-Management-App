import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Members from "./pages/Members";

export default function App(){

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/members"
          element={<Members />}
        />

      </Routes>

    </BrowserRouter>

  );
}