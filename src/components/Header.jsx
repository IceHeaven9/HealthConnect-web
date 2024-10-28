import { HamburgerMenu } from "../components/HamburgerMenu";
import { Link, useNavigate } from "react-router-dom";
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
  const token = currentUser?.coded;

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header className="relative flex items-center justify-between bg-lightCakeBlue text-white h-20 px-4 ">
      {/* Lado izquierdo: Botón de retroceso o Logo */}
      <div className="flex items-center">
        {showBackButton ? (
          <div className="flex items-center justify-center">
            <button onClick={() => navigate(-1)} className="text-center pr-4">
              <IoMdArrowRoundBack size={40} />
            </button>
            <Link
              to="/"
              className="font-medium text-3xl md:text-4xl text-center text-[#628eff]"
            >
              HealthConnect
            </Link>
          </div>
        ) : (
          <div
            className="flex items-center space-x-4"
            onClick={() => navigate("/")}
          >
            <div className="w-20 h-20">
              <img
                src="/images/Perfil_healthConnect-Photoroom.png"
                alt="Logo Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <Link
                to="/"
                className="font-medium text-3xl md:text-4xl text-center text-[#628eff]"
              >
                HealthConnect
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Centro: Título dinámico */}
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
      <div className="flex items-center space-x-4 ">
        {token ? (
          <section className="flex items-center justify-center gap-2 hidden lg:flex">
            {/* Botones para usuarios autenticados */}
            <button
              className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 "
              onClick={() => navigate("/profile")}
            >
              <FaUserCircle size={20} />
              <span className="font-bold">Perfil</span>
            </button>

            {currentUser?.decoded?.userType === "patient" && (
              <button
                className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 "
                onClick={() => navigate("/my-consultations")}
              >
                <PiCalendarDotsLight size={30} />
                <span className="font-bold">Mis consultas</span>
              </button>
            )}

            {currentUser?.decoded?.userType === "doctor" && (
              <button
                className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 "
                onClick={() => navigate("/my-doctor-consultations")}
              >
                <PiCalendarDotsLight size={30} />
                <span className="font-bold">Mis consultas</span>
              </button>
            )}

            {/* Botón de Especialidades - Modificado para ser visible en pantallas medianas */}
            <button
              className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12"
              onClick={() => navigate("/specialities")}
            >
              <LiaClipboardListSolid size={30} />
              <span className="font-bold">Especialidades</span>
            </button>

            <button
              className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 "
              onClick={() => navigate("/doctors")}
            >
              <FaUserDoctor size={25} />
              <span className="font-bold">Doctores</span>
            </button>

            <button
              className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 "
              onClick={handleLogout}
            >
              <RxExit size={20} color="cancelColor" />
              <span className="text-cancelColor font-bold">Salir</span>
            </button>
          </section>
        ) : (
          <>
            {/* Botones para usuarios no autenticados */}
            <button
              className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 "
              onClick={() => navigate("/specialities")}
            >
              <LiaClipboardListSolid size={30} />
              <span className="font-bold">Especialidades</span>
            </button>

            <button
              className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 "
              onClick={() => navigate("/doctors")}
            >
              <FaUserDoctor size={25} />
              <span className="font-bold">Doctores</span>
            </button>

            <Link
              className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 "
              to="/register"
            >
              <FaUserPlus size={20} />
              <span className="font-bold">Regístrate</span>
            </Link>

            <Link
              className="flex items-center justify-center gap-1 text-md rounded-lg bg-white text-lightBlue p-2 h-12 "
              to="/login"
            >
              <PiSignInLight size={20} />
              <span className="font-bold">Entrar</span>
            </Link>
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
