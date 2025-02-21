import { useState, useEffect } from "react";
import "./App.css"; // Usamos el mismo CSS para mantener estilos

const API_URL = "https://randomuser.me/api/?results=6&nat=es";

function UserList() {
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
    <div className="container">
      <h1>👤 Lista de Usuarios</h1>
      <button onClick={fetchUsers} disabled={loading} className="btn">
        {loading ? "Cargando..." : "🔄 Obtener Nuevos Usuarios"}
      </button>

      <div className="grid">
        {users.map((user) => (
          <div key={user.login.uuid} className="card">
            <img src={user.picture.medium} alt={user.name.first} />
            <h2>{user.name.first} {user.name.last}</h2>
            <p>📧 {user.email}</p>
            <p>📞 {user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
