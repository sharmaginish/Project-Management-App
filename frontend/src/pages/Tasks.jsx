import Sidebar from "../components/Sidebar";

export default function Tasks(){

  const tasks = JSON.parse(
    localStorage.getItem("tasks")
  ) || [];

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <Sidebar />

      <div className="ml-72 p-10">

        <h1 className="text-5xl font-bold mb-10">
          Tasks
        </h1>

        <div className="grid grid-cols-2 gap-6">

          {
            tasks.map((task,index) => (

              <div
                key={index}
                className="bg-[#111827] p-6 rounded-3xl"
              >

                <h2 className="text-2xl font-bold">
                  {task.title}
                </h2>

                <p className="text-gray-400 mt-3">
                  {task.description}
                </p>

                <div className="mt-5 inline-block bg-indigo-500 px-4 py-2 rounded-full">

                  {task.status}

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}