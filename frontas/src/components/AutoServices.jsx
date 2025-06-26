import React, { useState, useEffect } from "react";

function AutoServices() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoServices, setAutoServices] = useState([]);

  const fetchAutoServices = async () => {
    try {
      const response = await fetch("/api/autoServices");
      const data = await response.json();
      setAutoServices(data);
    } catch (err) {
      console.error("Klaida gaunant automobilių paslaugas:", err);
      setError("Įvyko klaida gaunant duomenis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutoServices();
  }, []);

  if (loading) {
    return <p className="text-center p-4">Kraunama...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500 p-4">{error}</p>;
  }
  return <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Solo Ekskursijos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {autoServices.map((autoservice) => (
          <div
            key={autoservice.id}
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-1">{autoservice.name}</h2>
            <p className="text-gray-600">{autoservice.adress}</p>
            <p className="text-gray-600">{autoservice.managerName}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
}


export default AutoServices;
