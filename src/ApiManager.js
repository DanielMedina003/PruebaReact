import { useState, useEffect } from "react";

const API_URL = "https://randomuser.me/api/?results=5&nat=es"; // API en español

export default function ApiManager() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setData(json.results);
    } catch (error) {
      console.error("Error al obtener datos", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Gestor de Usuarios</h1>
      <button onClick={fetchData} disabled={loading} className="p-2 bg-blue-500 text-white rounded">
        {loading ? "Cargando..." : "Recargar"}
      </button>
      <ul className="mt-4">
        {data.map((user, index) => (
          <li key={index} className="border p-2 mt-2 rounded">
            <strong>{user.name.first} {user.name.last}</strong>  
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
