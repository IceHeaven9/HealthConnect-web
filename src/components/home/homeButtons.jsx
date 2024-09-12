import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci"; // Asegúrate de tener esta importación
import { FaUserPlus } from "react-icons/fa6"; // Importa el ícono necesario
import { PiSignInLight } from "react-icons/pi"; // Importa el ícono necesario

export const HomeButtons = () => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {/* Botón Crear Consulta */}
      <Link
        to="/create-consultation"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Crear Consulta
      </Link>

      {/* Botones de autenticación */}
      <div className="flex flex-col gap-4 items-center w-full">
        {localStorage.getItem("TOKEN") ? (
          <button
            className="flex items-center gap-2 text-sm bg-red-500 rounded-lg text-white p-3 w-full max-w-xs"
            onClick={() => {
              localStorage.removeItem("TOKEN");
              window.location.href = "/login";
            }}
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
    </div>
  );
};
