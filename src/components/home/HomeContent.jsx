import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from "../../contexts/authContext";
import { FaUserPlus } from "react-icons/fa6";
import { PiSignInLight } from "react-icons/pi";
import { HomeButtons } from "./homeButtons";  

export const HomeContent = () => {
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

            {/* Contenedor para el texto */}
            <p className="text-blue-700 text-center max-w-2xl text-sm mb-4">
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
