import Sidebar from "../components/Sidebar";

export default function Settings(){

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="ml-72 p-10">

        <h1 className="text-5xl font-bold mb-10">
          Settings
        </h1>

        <div className="bg-[#111827] p-8 rounded-3xl space-y-6">

          <div>

            <p className="text-gray-400 mb-2">
              Notification Settings
            </p>

            <button className="bg-indigo-500 px-6 py-3 rounded-2xl">

              Enable Notifications

            </button>

          </div>

          <div>

            <p className="text-gray-400 mb-2">
              Theme
            </p>

            <button className="bg-purple-500 px-6 py-3 rounded-2xl">

              Dark Mode

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}