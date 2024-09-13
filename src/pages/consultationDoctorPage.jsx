import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../contexts/authContext";
import { Link } from "react-router-dom";
import { customStyles } from "../constants";
import { fetchHistoryConsultations } from "../components/myConsultations/fetch/historyFetch";
import { useState, useContext } from "react";
import Modal from "react-modal"; // Ensure Modal is imported

export const ConsultationDoctorPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [historyConsultations, setHistoryConsultations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = currentUser?.coded;
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

      {/* BUSCADOR */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Buscar consulta..."
          className="bg-lightCakeBlue rounded-xl p-2 w-1/2"
        />
      </div>

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
          onAfterOpen={() =>
            fetchHistoryConsultationsºº(token, setHistoryConsultations)
          }
          onRequestClose={closeModal}
          style={customStyles}
        ></Modal>
      </div>

      {/* ACCORDION */}
      {/* PRÓXIMAS CONSULTAS */}
      <Accordion>
        <AccordionItem
          header={
            <div className="flex gap-1">
              <div>PRÓXIMAS CONSULTAS</div>
              <IoIosArrowDown />
            </div>
          }
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AccordionItem>

        {/* CONSULTAS PENDIENTES */}
        <AccordionItem
          header={
            <div className="flex gap-1">
              <div>CONSULTAS PENDIENTES</div>
              <IoIosArrowDown />
            </div>
          }
        >
          Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla vel
          erat quis sodales. Nam ex enim, eleifend venenatis lectus vitae,
          accumsan auctor mi.
        </AccordionItem>
      </Accordion>
    </main>
  );
};
