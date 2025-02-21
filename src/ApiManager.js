import { useState, useEffect } from "react";

const API_URL = "https://randomuser.me/api/?results=5&nat=es"; 

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
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Gestor de Usuarios</h1>
      <button 
        onClick={fetchData} 
        disabled={loading} 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
      >
        {loading ? "Cargando..." : "🔄 Recargar"}
      </button>

      <div className="flex gap-4 mt-4 overflow-x-auto p-2 whitespace-nowrap">
        {data.map((user, index) => (
          <div key={index} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow min-w-[200px]">
            <img className="w-20 h-20 rounded-full" src={user.picture.thumbnail} alt={user.name.first} />
            <p className="font-semibold mt-2">{user.name.first} {user.name.last}</p>  
            <p className="text-sm text-gray-600">📧 {user.email}</p>
            <p className="text-sm text-gray-600">📞 {user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
