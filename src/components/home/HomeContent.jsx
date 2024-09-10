import { PiCalendarDotsLight } from "react-icons/pi";
import { MenuSpecialtiesModal } from "../menu/MenuSpecialtiesModal";
import { MenuDoctorsModal } from "../menu/MenuDoctorsModal";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from "../../contexts/authContext";
import { FaUserPlus } from "react-icons/fa6";
import { PiSignInLight } from "react-icons/pi";

export const HomeContent = () => {
    {/*Estados para los modales de especialidades y doctores*/}
    const [specialtyModalIsOpen, specialtyModaSetIsOpen] = useState(false);
    const [doctorsModalIsOpen, doctorsModaSetIsOpen] = useState(false);    

    {/*AuthContext y hook de navegación*/}
    const { onLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("TOKEN");

    {/*Función de cierre de sesión*/}
    const handleLogout = () => {
        localStorage.removeItem("TOKEN");
        onLogout();
        navigate("/login");
    };

    return (
        <main className="flex flex-1 items-center justify-center flex-col bg-white p-4 gap-4">
            {/* Contenedor para los botones */}
            <div className="flex gap-4 mb-4">
                <button
                    className="flex items-center justify-center gap-2 bg-blue-700 text-white py-3 px-6 rounded-lg"
                    onClick={() => specialtyModaSetIsOpen(true)}
                >
                    Especialidades
                </button>
                <MenuSpecialtiesModal
                    specialtyModalIsOpen={specialtyModalIsOpen}
                    specialtyModaSetIsOpen={specialtyModaSetIsOpen}
                />

                <button
                    className="flex items-center justify-center gap-2 bg-blue-700 text-white py-3 px-6 rounded-lg"
                    onClick={() => doctorsModaSetIsOpen(true)}
                >
                    Doctores
                </button>
                <MenuDoctorsModal
                    doctorsModalIsOpen={doctorsModalIsOpen}
                    doctorsModaSetIsOpen={doctorsModaSetIsOpen}
                />

                <Link to="/create-consultation" className="flex items-center justify-center gap-2 bg-blue-700 text-white py-3 px-6 rounded-lg">
                    <PiCalendarDotsLight size={24} />
                    Crear Consulta
                </Link>
            </div>
            {/*Contenedor para el texto*/}
            <p className="text-blue-700 text-center max-w-2xl text-sm">
                Tu salud, simplificada. Facilitamos la programación de citas con los mejores profesionales de la salud, y estamos aquí para ayudarte.
                <br /><br />
                <strong className="text-blue-800">¿Por qué elegirnos?</strong>
                <br />
                <ul className="list-disc list-inside pl-4 mt-2 text-xs">
                    <li>Cuidado Experto: Conéctate con médicos calificados en varias especialidades.</li>
                    <li>Reserva Fácil: Programa tus citas en línea con solo unos clics.</li>
                    <li>Sin Esperas: Elige el horario que mejor te convenga.</li>
                    <li>Seguro y Privado: Tu información médica está protegida con nosotros.</li>
                </ul>
                <br />
                ¡Únete hoy y toma el control de tu salud con facilidad!
            </p>

            {/* Campo para los botones de autenticación.*/}
            <div className="flex flex-col gap-4 items-center">
                {token ? ( 
                    <button
                        className="flex items-center gap-2 text-sm bg-red-500 rounded-lg mt-2 text-white p-3 w-full max-w-xs"
                        onClick={handleLogout}
                    >
                        <CiLogout size={24} /> Cerrar sesión
                    </button>
                ) : (
                    <>
                        <Link
                            className="flex items-center gap-2 text-sm bg-blue-700 rounded-lg mt-2 text-white p-3 w-full max-w-xs"
                            to="/register"
                        >
                            <FaUserPlus size={24} />
                            Regístrate
                        </Link>
                        <Link
                            className="flex items-center gap-2 text-sm bg-blue-700 rounded-lg mt-2 text-white p-3 w-full max-w-xs"
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
