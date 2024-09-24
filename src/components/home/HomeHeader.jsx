import { HamburgerMenu } from "../HamburgerMenu";
import { Link } from "react-router-dom";
import { PiSignInLight } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";

export const HomeHeader = () => {
  const token = localStorage.getItem("TOKEN");
  return (
    <header className="flex items-center justify-between p-2 bg-lightCakeBlue text-white h-20">
      {/* Logo y Nombre */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20">
          <img
            src="/images/Perfil_healthConnect-Photoroom.png"
            alt="Logo Preview"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start hidden md:flex">
          <div className="font-medium text-3xl text-[#628eff]">
            Health Connect
          </div>
        </div>
      </div>

      {/* Menú Hamburguesa o Palabras Clave */}

      <div className="flex space-x-4">
        {!token && (
          <>
            {/* Botón de Registro */}
            <Link
              className="flex items-center justify-center gap-3 p-2 text-sm bg-lightBlue rounded-lg text-white w-max "
              to="/register"
            >
              <FaUserPlus size={24} />
              <span className="hidden sm:inline">Regístrate</span>
            </Link>
            {/* Botón de inicio de sesión */}
            <Link
              className="flex items-center justify-center gap-3 p-2 text-sm bg-lightBlue rounded-lg text-white w-max"
              to="/login"
            >
              <PiSignInLight size={24} />
              <span className="hidden sm:inline">Iniciar sesión</span>
            </Link>
          </>
        )}
        <div className="flex justify-center items-center h-12 w-12">
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};
