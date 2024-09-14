import { HamburgerMenu } from "../components/HamburgerMenu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { API_HOST, customStyles } from "../constants";
import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { useAuthGuard } from "../hooks/authGuard";
import { AuthContext } from "../contexts/authContext";

export const ConsultationDoctorPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});
  const token = currentUser?.coded;

  useAuthGuard("/consultation/:id/details");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch para los datos del doctor
  const fetchDoctorData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${API_HOST}/doctors/${currentUser.decoded.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const specialities = data.specialities
          ? Object.values(data.specialities).join("")
          : "No specialities found";
        setData({ specialities });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDoctorData();
    fetchConsultations();
  }, []);

  // Fetch para las consultas del doctor
  const fetchConsultations = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${API_HOST}/my-consultations`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const myConsultations = result.map((consultation) => {
          return {
            id: consultation.id,
            title: consultation.title,
            date: consultation.date,
            status: consultation.status,
            patientAvatar: consultation.patientAvatar,
            specialityName: consultation.specialityName,
            severity: consultation.severity,
          };
        });
        setData((prevState) => ({
          ...prevState,
          consultations: myConsultations,
        }));
      })
      .catch((error) => console.error(error));
  };

  // COMPONENTES DE LA PAGINA
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
      <section className=" flex flex-col gap-3 items-center p-3 justify-between w-[50%] mx-auto mb-8">
        <img
          className="shadow-xl w-20 h-20 rounded-full border-lightBlue border-solid border-[0.1rem]"
          src={currentUser.decoded.avatar}
          alt="User Avatar"
        />
        <p className="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] font-ubuntu font-bold text-xl">
          {currentUser.decoded.userName}
        </p>
        <p className="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-center font-ubuntu text-lg italic">
          {data.specialities}
        </p>
      </section>

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
      <section className="flex flex-col justify-center rounded-xl shadow-xl items-center mx-4 border">
        <div className="bg-smokeWhite w-full  h-max text-center rounded-t-xl text-lightBlue font-bold font-roboto text-lg border-solid border-lightBlue border-b-[0.1rem]">
          <p className="py-4">PRÓXIMAS CONSULTAS</p>
        </div>
        <div className="bg-lightCakeBlue w-full h-full text-center text-lightBlue font-bold font-roboto text-lg border-solid border-lightBlue border-b-[0.1rem]">
          <ul>
            {data.consultations &&
              data.consultations.map((consultation) => (
                <li
                  key={consultation.id}
                  className="p-4 border-b border-lightBlue"
                >
                  <div className="flex flex-col items-center gap-4 bg-smokeWhite p-8 rounded-xl ">
                    <div className="flex items-center justify-between w-full">
                      <p className="text-carbon">
                        {new Date(consultation.date).toLocaleString()}
                      </p>
                      <p>{consultation.specialityName}</p>
                    </div>
                    <p className="font-bold text-xl font-inter text-carbon">
                      {consultation.title}
                    </p>
                    <button className="bg-lightBlue text-smokeWhite p-2 rounded-lg w-full font-bold text-base active:scale-95 transition-transform transform">
                      Ver Ficha
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </main>
  );
};
