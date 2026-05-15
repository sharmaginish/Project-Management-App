import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import Profile from "./pages/Profile";

import Projects from "./components/ProjectSection";

import Tasks from "./pages/Tasks";

import Analytics from "./pages/Analytics";

import Settings from "./pages/Settings";

import Members from "./pages/Members";

import ProjectDetails from "./components/ProjectDetails";

import TaskSection from "./components/TaskSection";

// PROTECTED ROUTE
function ProtectedRoute({ children }) {

  const token =
    sessionStorage.getItem("token");

  if (!token) {

    return <Navigate to="/login" replace />;

  }

  return children;

}

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* SIGNUP */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* ROOT REDIRECT */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>

              <Profile />

            </ProtectedRoute>
          }
        />

        {/* TASKS */}

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>

              <Tasks />

            </ProtectedRoute>
          }
        />

        {/* PROJECTS */}

        <Route
          path="/projects"
          element={
            <ProtectedRoute>

              <Projects />

            </ProtectedRoute>
          }
        />

        {/* ANALYTICS */}

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>

              <Analytics />

            </ProtectedRoute>
          }
        />

        {/* SETTINGS */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>

              <Settings />

            </ProtectedRoute>
          }
        />

        {/* MEMBERS */}

        <Route
          path="/members"
          element={
            <ProtectedRoute>

              <Members />

            </ProtectedRoute>
          }
        />

        {/* PROJECT DETAILS */}

        <Route
          path="/project/:id"
          element={
            <ProtectedRoute>

              <ProjectDetails />

            </ProtectedRoute>
          }
        />

        {/* PROJECT TASKS */}

        <Route
          path="/project/:id/tasks"
          element={
            <ProtectedRoute>

              <TaskSection />

            </ProtectedRoute>
          }
        />

        {/* UNKNOWN ROUTE */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}