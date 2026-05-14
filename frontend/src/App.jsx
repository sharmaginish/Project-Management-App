import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  const token = localStorage.getItem("token");

  const [showSignup, setShowSignup] = useState(false);

  if (token) {
    return <Dashboard />;
  }

  return (

    <div>

      {showSignup ? (

        <div>

          <Signup />

          <div className="text-center -mt-10">

            <button
              onClick={() =>
                setShowSignup(false)
              }
              className="text-blue-500"
            >
              Already have an account? Login
            </button>

          </div>

        </div>

      ) : (

        <div>

          <Login
            setShowSignup={setShowSignup}
          />

        </div>

      )}

    </div>

  );

}

export default App;