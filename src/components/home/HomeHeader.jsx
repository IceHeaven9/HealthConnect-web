import { HamburgerMenu } from "../HamburgerMenu";
import { Link } from "react-router-dom";
import { PiSignInLight } from "react-icons/pi";

export const HomeHeader = () => {
  return (
    <header className="flex items-center justify-between p-2 bg-smokeWhite text-white h-20">
      {/* Logo y Nombre */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20">
          <img
            src="/images/Perfil_healthConnect-Photoroom.png"
            alt="Logo Preview"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start">
          <div className="font-medium text-3xl text-[#628eff]">
            Health Connect
          </div>
        </div>
      </div>

      {/* Menú Hamburguesa o Palabras Clave */}

      <div className="flex justify-center items-center h-12 w-12 md:hidden">
        <HamburgerMenu />
      </div>
      <div className="hidden md:flex space-x-4">
        {/* Botón de inicio de sesión */}

        <Link
          className="flex items-center justify-center gap-2 text-sm bg-lightBlue rounded-lg text-white p-3 w-full max-w-xs md:max-w-sm md:w-full"
          to="/login"
        >
          <PiSignInLight size={24} /> Iniciar sesión
        </Link>
        <Link to="/about" className="text-[#628eff]">
          Sobre Nosotros
        </Link>
      </div>
    </header>
  );
};
