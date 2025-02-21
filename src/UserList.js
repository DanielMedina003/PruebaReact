import { useState, useEffect } from "react";

const API_URL = "https://randomuser.me/api/?results=6&nat=es";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const { results } = await res.json();
      setUsers(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">👤 Lista de Usuarios</h1>
      <button
        onClick={fetchUsers}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? "Cargando..." : "🔄 Obtener Nuevos Usuarios"}
      </button>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.login.uuid} className="bg-white p-4 rounded shadow">
            <img
              src={user.picture.medium}
              alt={user.name.first}
              className="rounded-full mx-auto"
            />
            <h2 className="text-lg font-bold text-center mt-2">
              {user.name.first} {user.name.last}
            </h2>
            <p className="text-sm text-gray-600 text-center">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
