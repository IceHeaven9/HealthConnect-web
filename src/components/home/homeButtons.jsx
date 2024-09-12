import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const HomeButtons = () => {
    {/* Estados para especialidades y doctores*/}
    const [specialties, setSpecialties] = useState([]);
    const [doctors, setDoctors] = useState([]);

    {/*Obtenemos las especialidades */}
    const fetchSpecialties = async () => {
        try {
            const response = await fetch("http://localhost:3000/specialities");
            const result = await response.json();
            console.log("Especialidades obtenidas:", result);
            setSpecialties(result);
        } catch (error) {
            console.error("Error al obtener las especialidades:", error);
        }
    };

    {/*Obtenemos los doctores */}
    const fetchDoctors = async () => {
        try {
            const response = await fetch("http://localhost:3000/doctors");
            const result = await response.json();
            console.log("Doctores obtenidos:", result);
            setDoctors(result);
        } catch (error) {
            console.error("Error al obtener los doctores:", error);
        }
    };

    useEffect(() => {
        fetchSpecialties();
        fetchDoctors();
    }, []);

    return (
        <div className="space-y-4">
            {/* Campo Especialidades */}
            <div>
                <h2 className="text-xl font-bold">Especialidades</h2>
                {specialties.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {specialties.map(specialty => (
                            <li key={specialty.id} className="mb-2">{specialty.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay especialidades disponibles.</p>
                )}
            </div>

            {/* Campo Doctores */}
            <div>
                <h2 className="text-xl font-bold">Doctores</h2>
                {doctors.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {doctors.map(doctor => (
                            <li key={doctor.id} className="mb-2">
                                {doctor.firstName ? doctor.firstName : "Nombre no disponible"} {doctor.lastName ? doctor.lastName : "Apellido no disponible"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay doctores disponibles.</p>
                )}
            </div>

            {/* Botón Crear Consulta */}
            <Link to="/create-consultation" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                Crear Consulta
            </Link>
        </div>
    );
};


