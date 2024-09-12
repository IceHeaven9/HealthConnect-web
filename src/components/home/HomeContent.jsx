import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci"; // Importa el ícono necesario
import { AuthContext } from "../../contexts/authContext";
import { HomeButtons } from "./homeButtons";
import { FaUserPlus } from "react-icons/fa6"; // Importa el ícono necesario
import { PiSignInLight } from "react-icons/pi"; // Importa el ícono necesario

export const HomeContent = () => {
    // Estados para los datos de especialidades y doctores
    const [specialties, setSpecialties] = useState([]);
    const [doctors, setDoctors] = useState([]);

    // Obtener especialidades
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

    // Obtener doctores
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

    // Llamar a las funciones de fetch al montar el componente
    useEffect(() => {
        fetchSpecialties();
        fetchDoctors();
    }, []);

    {/*AuthContext y hook de navegación */}
    const { onLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("TOKEN");

    {/*Función de cierre de sesión */}
    const handleLogout = () => {
        localStorage.removeItem("TOKEN");
        onLogout();
        navigate("/login");
    };

    return (
        <main className="flex flex-col items-center justify-start bg-white p-4 gap-4 min-h-screen">
            {/* Contenedor para los botones, ahora usando HomeButtons */}
            <HomeButtons />

            {/* Sección de Especialidades */}
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

            {/* Sección de Doctores */}
            <div>
                <h2 className="text-xl font-bold">Doctores</h2>
                {doctors.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {doctors.map(doctor => (
                            <li key={doctor.id} className="mb-2 flex items-center">
                                <img src={doctor.avatar} alt="doctor" className="w-12 h-12 rounded-full mr-2" />
                                {doctor.firstName} {doctor.lastName}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay doctores disponibles.</p>
                )}
            </div>

            {/* Campo para los botones de autenticación */}
            <div className="flex flex-col gap-4 items-center w-full">
                {token ? (
                    <button
                        className="flex items-center gap-2 text-sm bg-red-500 rounded-lg text-white p-3 w-full max-w-xs"
                        onClick={handleLogout}
                    >
                        <CiLogout size={24} /> Cerrar sesión
                    </button>
                ) : (
                    <>
                        <Link
                            className="flex items-center gap-2 text-sm bg-blue-700 rounded-lg text-white p-3 w-full max-w-xs"
                            to="/register"
                        >
                            <FaUserPlus size={24} />
                            Regístrate
                        </Link>
                        <Link
                            className="flex items-center gap-2 text-sm bg-blue-700 rounded-lg text-white p-3 w-full max-w-xs"
                            to="/login"
                        >
                            <PiSignInLight size={24} /> Iniciar sesión
                        </Link>
                    </>
                )}
            </div>
        </main>
    );
};

