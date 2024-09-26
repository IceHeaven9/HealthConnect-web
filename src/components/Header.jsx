import { HamburgerMenu } from "../components/HamburgerMenu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PiSignInLight } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { RxExit } from "react-icons/rx";
import { PiCalendarDotsLight } from "react-icons/pi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";

export const Header = ({ title, showBackButton }) => {
  const { currentUser, onLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Importamos useLocation para obtener la ruta actual
  const token = currentUser?.coded;

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleMyConsultations = () => {
    navigate("/my-consultations");
  };

  const handleMyDoctorConsultations = () => {
    navigate("/my-doctor-consultations");
  };

  const handleDoctors = () => {
    navigate("/doctors");
  };

  const handleSpecialities = () => {
    navigate("/specialities");
  };

  const handleHome = () => {
    navigate("/");
  };

  // Función para comprobar si la ruta actual es igual a la ruta del botón
  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="relative flex items-center justify-between bg-lightCakeBlue text-white h-20 px-4">
      {/* Lado izquierdo: Botón de retroceso o Logo */}
      <div className="flex items-center">
        {showBackButton ? (
          <div className="flex items-center justify-center">
            <button onClick={() => navigate(-1)} className="text-center pr-4">
              <IoMdArrowRoundBack size={40} />
            </button>
            <div className="font-medium text-3xl md:text-4xl text-center text-[#628eff]">
              HealthConnect
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4" onClick={handleHome}>
            <div className="w-20 h-20">
              <img
                src="/images/Perfil_healthConnect-Photoroom.png"
                alt="Logo Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="font-medium text-3xl md:text-4xl text-center text-[#628eff]">
                HealthConnect
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Centro: Título dinámico (si se proporciona) */}
      {title && (
        <p
          className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold font-roboto text-lightBlue mt-1 text-center"
          style={{
            maxWidth: "70%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            top: "110%",
          }}
        >
          {title}
        </p>
      )}

      {/* Botones y Menú */}
      <div className="flex items-center space-x-4">
        {/* Botón de Inicio (Home) */}
        {!isCurrentPath("/") && (
          <button
            className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 hidden sm:flex"
            onClick={handleHome}
          >
            <AiOutlineHome size={20} />
            <span className="font-bold">Inicio</span>
          </button>
        )}
        {token ? (
          <>
            {/* Botón de Perfil */}
            {!isCurrentPath("/profile") && (
              <button
                className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 hidden sm:flex"
                onClick={handleProfile}
              >
                <FaUserCircle size={20} />
                <span className="font-bold">Perfil</span>
              </button>
            )}

            {/* Botón de Mis Consultas */}
            {currentUser?.decoded?.userType === "patient" &&
              !isCurrentPath("/my-consultations") && (
                <button
                  className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 hidden md:flex"
                  onClick={handleMyConsultations}
                >
                  <PiCalendarDotsLight size={30} />
                  <span className="font-bold">Mis consultas</span>
                </button>
              )}

            {currentUser?.decoded?.userType === "doctor" &&
              !isCurrentPath("/my-doctor-consultations") && (
                <button
                  className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 hidden md:flex"
                  onClick={handleMyDoctorConsultations}
                >
                  <PiCalendarDotsLight size={30} />
                  <span className="font-bold">Mis consultas</span>
                </button>
              )}

            {/* Botón de Especialidades */}
            {!isCurrentPath("/specialities") && (
              <button
                className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 hidden lg:flex"
                onClick={handleSpecialities}
              >
                <LiaClipboardListSolid size={30} />
                <span className="font-bold">Especialidades</span>
              </button>
            )}

            {/* Botón de Doctores */}
            {!isCurrentPath("/doctors") && (
              <button
                className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 hidden lg:flex"
                onClick={handleDoctors}
              >
                <FaUserDoctor size={25} />
                <span className="font-bold">Doctores</span>
              </button>
            )}

            {/* Botón de Cerrar sesión */}
            <button
              className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 hidden md:flex"
              onClick={handleLogout}
            >
              <RxExit size={20} color="cancelColor" />
              <span className="text-cancelColor font-bold ">Salir</span>
            </button>
          </>
        ) : (
          <>
            {/* Botón de Especialidades */}
            {!isCurrentPath("/specialities") && (
              <button
                className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 hidden lg:flex"
                onClick={handleSpecialities}
              >
                <LiaClipboardListSolid size={30} />
                <span className="font-bold">Especialidades</span>
              </button>
            )}

            {/* Botón de Doctores */}
            {!isCurrentPath("/doctors") && (
              <button
                className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 hidden lg:flex"
                onClick={handleDoctors}
              >
                <FaUserDoctor size={25} />
                <span className="font-bold">Doctores</span>
              </button>
            )}

            {/* Botón de Registro */}
            {!isCurrentPath("/register") && (
              <Link
                className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 hidden sm:flex"
                to="/register"
              >
                <FaUserPlus size={20} />
                <span className="font-bold">Regístrate</span>
              </Link>
            )}

            {/* Botón de Iniciar Sesión */}
            {!isCurrentPath("/login") && (
              <Link
                className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 hidden sm:flex"
                to="/login"
              >
                <PiSignInLight size={20} />
                <span className="font-bold">Entrar</span>
              </Link>
            )}
          </>
        )}
        {/* Menú Hamburguesa */}
        <div className="flex items-center h-12 lg:hidden">
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};
