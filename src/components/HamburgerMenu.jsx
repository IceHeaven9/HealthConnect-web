import { CiMenuFries } from "react-icons/ci";
import { RiHomeHeartFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { PiCalendarDotsLight } from "react-icons/pi";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { FaUserDoctor, FaUserPlus } from "react-icons/fa6";
import { PiSignInLight } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../contexts/authContext";
import { MenuSpecialtiesModal } from "./menu/MenuSpecialtiesModal";
import { LiaClipboardListSolid } from "react-icons/lia";

export const HamburgerMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [specialtyModalIsOpen, specialtyModaSetIsOpen] = useState(false);
  const [doctorsModalIsOpen, doctorsModaSetIsOpen] = useState(false);
  const [showLogOptions, setShowLogOptions] = useState(false);
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
    <>
      <section className="flex justify-end items-center w-max relative ">
        {showMenu && (
          <article className="animate-fade-left animate-once animate-duration-500 animate-ease-in animate-normal">
            <ul className="flex gap-8 items-center justify-center p-2 rounded-xl bg-lightBlue absolute right-0 -bottom-7">
              <li className="pl-6">
                <Link to="/">
                  <RiHomeHeartFill size={30} color="#ffffff" />
                </Link>
              </li>
              <li>
                <Link to="/specialities">
                  <LiaClipboardListSolid size={30} color="#ffffff" />
                </Link>
              </li>
              <li>
                <Link to="/doctors">
                  <FaUserDoctor size={30} color="#ffffff" />
                </Link>
              </li>
              <li className="">
                <button
                  className="mt-2"
                  onClick={() => setShowLogOptions(!showLogOptions)}
                >
                  <CgProfile size={30} color="#ffffff" />
                </button>
                {showLogOptions && (
                  <ul className=" bg-white shadow-md rounded-md mt-2">
                    {token ? (
                      <>
                        <ul className="bg-lightBlue">
                          <li>
                            <button
                              className="flex items-center absolute -bottom-12 right-8 gap-2 text-md w-44 bg-lightBlue rounded-lg mt-1 text-white p-2"
                              onClick={handleProfile}
                            >
                              <CgProfile size={30} color="#ffffff" />
                              Perfil
                            </button>
                          </li>
                          <li>
                            <button
                              className="flex items-center w-44 absolute -bottom-[6.7rem] right-8 gap-2 text-md bg-lightBlue rounded-lg mt-1 text-white p-2"
                              onClick={handleLogout}
                            >
                              <CiLogout size={40} /> Cerrar sesión
                            </button>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            className="flex items-center gap-2 text-md bg-lightBlue rounded-lg mt-1 text-white p-2"
                            to="/register"
                          >
                            <FaUserPlus size={40} />
                            Registrate
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="flex items-center gap-2 text-md bg-lightBlue rounded-lg mt-1 text-white p-2"
                            to="/login"
                          >
                            <PiSignInLight size={40} /> Iniciar Sesión
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </li>
              <li className="pr-6">
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
            </ul>
          </article>
        )}
        <div className="w-max p-1 rounded-md">
          <button
            className="text-lightBlue"
            onClick={() => {
              setShowMenu(!showMenu), setShowLogOptions(false);
            }}
          >
            {showMenu ? <IoMdClose size={30} /> : <CiMenuFries size={30} />}
          </button>
        </div>
      </section>
    </>
  );
};
