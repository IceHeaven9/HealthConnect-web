import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { PiSignInLight } from "react-icons/pi";

export const HomeButtons = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center w-full justify-center">
      {!localStorage.getItem("TOKEN") && (
        <>
          {/* Botón de Registro */}
          <Link
            className="flex items-center justify-center gap-2 text-sm bg-lightBlue rounded-lg text-white p-3 w-full max-w-xs md:max-w-sm md:w-full"
            to="/register"
          >
            <FaUserPlus size={24} /> Regístrate
          </Link>

          {/* Botón de inicio de sesión */}
          <Link
            className="flex items-center justify-center gap-2 text-sm bg-lightBlue rounded-lg text-white p-3 w-full max-w-xs md:max-w-sm md:w-full"
            to="/login"
          >
            <PiSignInLight size={24} /> Iniciar sesión
          </Link>
        </>
      )}
    </div>
  );
};
