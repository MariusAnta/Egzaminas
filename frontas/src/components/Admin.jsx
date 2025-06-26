import React from "react";
import AdminRegistrationModal from "./AdminRegistrationModal";
import { useState, useEffect } from "react";
import UsersInfoForAdmin from "./UsersInfoForAdmin";
import { useForm } from "react-hook-form";

function Admin() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [mechanic, setMechanic] = useState([]);
  const [autoServices, setAutoServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      surname: "",
      specialization: "",
      city: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/mechanics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("data", data);
        fetchMechanic();
        reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Klaida registruojant.");
      }
    } catch (err) {
      console.error("Klaida registruojant:", err);
      setError("Įvyko klaida registruojant.");
    }
  };

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

  const fetchAutoServices = async () => {
    try {
      const response = await fetch("/api/services");
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
    fetchMechanic();
    fetchAutoServices();
  }, []);

  if (loading) return <p className="text-center p-4">Kraunama...</p>;
  if (error) return <p className="text-center text-red-500 p-4">{error}</p>;

  const handleDeleteMechanic = async (id) => {
    if (!window.confirm("Ar tikrai norite ištrinti?")) return;
    try {
      const res = await fetch(`/api/mechanics/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        fetchMechanic();
      } else {
        alert("Nepavyko ištrinti.");
      }
    } catch (error) {
      console.error("Klaida trinant:", error);
    }
  };

  const handleDeleteAutoService = async (id) => {
    if (!window.confirm("Ar tikrai norite ištrinti?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        fetchMechanic();
      } else {
        alert("Nepavyko ištrinti.");
      }
    } catch (error) {
      console.error("Klaida trinant:", error);
    }
  };

  return (
    <div className="bg-orange-200 h-full">
      <div className="flex items-center justify-center pt-10 ">
        <button
          onClick={() => setIsRegisterOpen(true)}
          className=" bg-blue-400 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 rounded"
        >
          Naujo administratoriaus registracija
        </button>
      </div>

      <AdminRegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto mb-10 bg-white rounded-xl p-6 shadow-md"
      >
        <h3 className="text-xl font-bold mb-4">Naujas mechanikas</h3>

        <input
          {...register("name", { required: "Privalomas laukas" })}
          placeholder="Vardas"
          className="block w-full border p-2 mb-3"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mb-2">{errors.vardas.message}</p>
        )}

        <input
          {...register("surname", { required: "Privalomas laukas" })}
          placeholder="Pavarde"
          className="block w-full border p-2 mb-3"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mb-2">{errors.pavarde.message}</p>
        )}

        <input
          {...register("specialization", { required: "Privalomas laukas" })}
          placeholder="Specializacija"
          className="block w-full border p-2 mb-3"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mb-2">
            {errors.specializacija.message}
          </p>
        )}
        <input
          {...register("city", { required: "Privalomas laukas" })}
          placeholder="Miestas"
          className="block w-full border p-2 mb-3"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mb-2">{errors.miestas.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Pridėti
        </button>
      </form>
      <UsersInfoForAdmin />
      <div className="p-4">
        \{/* Mechanikas */}
        <h1 className="text-2xl font-bold text-center mb-6">Mechanikai</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mechanic.map((mechanic) => (
            <div
              key={mechanic.id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-1">
                Vardas: {mechanic.name}
              </h2>
              <p className="text-gray-600">Pavarde: {mechanic.surname}</p>
              <p className="text-gray-600">
                Specializacija: {mechanic.specialization}
              </p>
              <p className="text-gray-600 ">Miestas: {mechanic.city}</p>
              <button
                onClick={() => handleDeleteMechanic(mechanic.id, "group")}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Ištrinti
              </button>
            </div>
          ))}
        </div>
        {/* Auto salonai */}
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Servisai</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {autoServices.map((autoservice) => (
              <div
                key={autoservice.id}
                className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-1">
                  Pavadinimas: {autoservice.name}
                </h2>
                <p className="text-gray-600">Adresas: {autoservice.adress}</p>
                <p className="text-gray-600">
                  Vadybininkas: {autoservice.managerName}
                </p>
                <button
                  onClick={() =>
                    handleDeleteAutoService(autoservice.id, "group")
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Ištrinti
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
