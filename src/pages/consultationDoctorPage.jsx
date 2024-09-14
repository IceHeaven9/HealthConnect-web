import { HamburgerMenu } from "../components/HamburgerMenu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { customStyles } from "../constants";
import { useState, useContext } from "react";
import Modal from "react-modal";
import { useAuthGuard } from "../hooks/authGuard";
import { AuthContext } from "../contexts/authContext";
import { UserCard } from "../components/myConsultations/UserCard";

export const ConsultationDoctorPage = () => {
  const { currentUser } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useAuthGuard("/consultation/:id/details");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main>
      {/* MENU */}
      <HamburgerMenu />
      <div className="h-min w-max pl-4 pr-4 pt-1 text-lightBlue"></div>
      <div className="flex items-center justify-start text-center text-lightBlue h-min p-4 mb-4">
        <ToastContainer />

        {/* BOTON DE ATRAS */}
        <button className="text-center pr-12">
          <IoMdArrowRoundBack size={30} />
        </button>
        <p className="text-4xl font-bold font-roboto mt-1"> Mis consultas</p>
      </div>

      {/* DATOS DEL DOCTOR */}
      <UserCard />
      {/* <div className="flex flex-col gap-3 p-3 items-center mx-auto mb-8">
        <img
          src={currentUser?.decoded.avatar}
          alt="Doctor Avatar"
          className="w-20 h-20 rounded-full border-[0.1rem] border-solid border-lightBlue"
        />
        <p className="text-2xl font-bold">{currentUser?.decoded.userName}</p>
      </div> */}

      {/* BOTON DE ASIGNAR CONSULTA */}
      <div className="flex  mx-4 md:mb-[27rem] mb-12 gap-2">
        <Link
          to="/unassigned-consultations"
          className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base text-center p-2 rounded-lg active:scale-95 transition-transform transform"
        >
          Asignarse a una consulta
        </Link>

        {/* BOTON DE HISTORIAL */}
        <button
          className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform"
          onClick={() => openModal()}
        >
          Historial de consultas
        </button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
        ></Modal>
      </div>

      {/* PRÓXIMAS CONSULTAS */}

      {/* CONSULTAS PENDIENTES */}
    </main>
  );
};
