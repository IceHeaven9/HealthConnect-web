import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa6";
import { PiSignInLight } from "react-icons/pi";

export const HomeButtons = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center w-full justify-center">
            {/* Botón Cierre de sesión */}
            {localStorage.getItem("TOKEN") ? (
                <button
                    className="flex items-center justify-center gap-2 text-sm bg-red-500 rounded-lg text-white p-3 w-full max-w-xs md:max-w-sm md:w-full"
                    onClick={() => {
                        localStorage.removeItem("TOKEN");
                        window.location.href = "/login";
                    }}
                >
                    <CiLogout size={24} /> Cerrar sesión
                </button>
            ) : (
                <>
                    {/* Botón de Registro */}
                    <Link
                        className="flex items-center justify-center gap-2 text-sm bg-blue-700 rounded-lg text-white p-3 w-full max-w-xs md:max-w-sm md:w-full"
                        to="/register"
                    >
                        <FaUserPlus size={24} />
                        Regístrate
                    </Link>

                    {/* Botón de inicio de sesión */}
                    <Link
                        className="flex items-center justify-center gap-2 text-sm bg-blue-700 rounded-lg text-white p-3 w-full max-w-xs md:max-w-sm md:w-full"
                        to="/login"
                    >
                        <PiSignInLight size={24} /> Iniciar sesión
                    </Link>
                </>
            )}
        </div>
    );
};
