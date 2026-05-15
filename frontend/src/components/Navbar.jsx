export default function Navbar() {

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.reload();

  };

  return (

    <div className="bg-blue-600 text-white p-4 flex flex-col md:flex-row justify-between md:items-center gap-4">

      <h1 className="text-2xl font-bold">
        Project Manager
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>

  );

}