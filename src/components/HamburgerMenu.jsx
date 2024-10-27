import { RxHamburgerMenu } from "react-icons/rx";
import { RiHomeHeartFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { PiCalendarDotsLight } from "react-icons/pi";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../contexts/authContext";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FaUserDoctor } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { PiSignInLight } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
import { BiArrowBack } from "react-icons/bi";

export const HamburgerMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const { onLogout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = currentUser?.coded;

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    
      <section className="flex justify-end items-center w-max">
        {showMenu && (
          <article className="animate-fade-left relative animate-once animate-duration-500 animate-ease-in animate-normal">
            <ul className="flex gap-7 w-[300px] h-[60px] p-3 items-center justify-center rounded-xl bg-lightBlue absolute right-0 -bottom-7">
              {!showProfileOptions ? (
                // Mostrar iconos del menú
                <>
                  <li className="flex items-center justify-center">
                    <Link to="/">
                      <RiHomeHeartFill size={30} color="#ffffff" />
                    </Link>
                  </li>
                  <li className="flex items-center justify-center">
                    <Link to="/specialities">
                      <LiaClipboardListSolid size={30} color="#ffffff" />
                    </Link>
                  </li>
                  <li className="flex items-center justify-center">
                    <Link to="/doctors">
                      <FaUserDoctor size={30} color="#ffffff" />
                    </Link>
                  </li>
                  <li className="flex items-center justify-center">
                    <button
                      onClick={() => {
                        setShowProfileOptions(true);
                      }}
                    >
                      <FaUserCircle size={30} color="#ffffff" />
                    </button>
                  </li>
                  <li className="flex items-center justify-center">
                    <Link
                      to={
                        token
                          ? currentUser.decoded.userType === "doctor"
                            ? "/my-doctor-consultations"
                            : "/my-consultations"
                          : "/login"
                      }
                    >
                      <PiCalendarDotsLight size={30} color="#ffffff" />
                    </Link>
                  </li>
                </>
              ) : (
                // Mostrar opciones de perfil dentro del menú
                <>
                  {token ? (
                    <>
                      <li className=" w-min">
                        <button
                          className="flex items-center justify-center text-lg font-bold rounded-lg bg-smokeWhite text-lightBlue p-1 w-min"
                          onClick={() => {
                            setShowProfileOptions(false);
                          }}
                        >
                          <BiArrowBack size={20} /> 
                        </button>
                      </li>
                      <li className="flex-1">
                        <button
                          className="flex items-center justify-center gap-2 text-lg font-bold rounded-lg bg-smokeWhite text-lightBlue p-1 w-full"
                          onClick={handleProfile}
                        >
                          <FaUserCircle size={20} /> Perfil
                        </button>
                      </li>
                      <li className="flex-1">
                        <button
                          className="flex items-center justify-center gap-2 text-lg font-bold rounded-lg bg-smokeWhite text-lightBlue p-1 w-full"
                          onClick={handleLogout}
                        >
                          <RxExit size={20} color="cancelColor" />
                          <span className="text-cancelColor">Salir</span>
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex-1">
                        <Link
                          className="flex items-center justify-center gap-2 text-md rounded-lg bg-smokeWhite text-lightBlue p-1 w-full"
                          to="/register"
                        >
                          <FaUserPlus size={20} />
                          <span className="text-lightBlue font-bold text-lg">
                            Regístrarse
                          </span>
                        </Link>
                      </li>
                      <li className="flex-1">
                        <Link
                          className="flex items-center justify-center gap-2 text-md rounded-lg bg-smokeWhite text-lightBlue p-1 w-full"
                          to="/login"
                        >
                          <PiSignInLight size={20} color="green-500" />
                          <span className="text-green-500 font-bold text-lg">
                            Entrar
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </article>
        )}
        <div className="w-max p-1 rounded-md">
          <button
            className="text-lightBlue"
            onClick={() => {
              setShowMenu(!showMenu);
              setShowProfileOptions(false);
            }}
          >
            {showMenu ? <IoMdClose size={40} /> : <RxHamburgerMenu size={40} />}
          </button>
        </div>
      </section>
    
  );
};
