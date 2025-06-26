import React, { useState, useEffect } from "react";

function Mechanic() {
  const [mechanic, setMechanic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchMechanic = async () => {
    try {
      const response = await fetch("/api/mechanics");
      const data = await response.json();
      setMechanic(data);
    } catch (err) {
      console.error("Klaida gaunant mechanikus:", err);
      setError("Įvyko klaida gaunant duomenis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMechanic();
  }, []);

  if (loading) return <p className="text-center p-4">Kraunama...</p>;
  if (error) return <p className="text-center text-red-500 p-4">{error}</p>;

  //   const updateMechanic = async (mechanic) => {
  //     await fetch(`/api/mechanics/${mechanic.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(mechanic),
  //     });
  //     setMechanic(mechanic);

  //   };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Solo Ekskursijos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mechanic.map((mechanic) => (
          <div
            key={mechanic.id}
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-1">{mechanic.name}</h2>
            <p className="text-gray-600">{mechanic.surname}</p>
            <p className="text-gray-600">{mechanic.specialization}</p>
            <p className="text-gray-600 ">{mechanic.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mechanic;
