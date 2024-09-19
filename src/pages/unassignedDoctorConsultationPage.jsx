import { useState, useEffect, useContext } from "react";
import { API_HOST, microCustomStyles } from "../constants";
import { AuthContext } from "../contexts/authContext";
import { DinamicTitle } from "../components/SingleTitle";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/notify";
import { ToastContainer } from "react-toastify";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Modal from "react-modal";

export const UnassignedDoctorConsultationPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [unassignedConsultations, setUnassignedConsultations] = useState([]);
  const [data, setData] = useState({});
  const token = currentUser?.coded;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch para los datos del doctor
  const fetchDoctorData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${API_HOST}/doctors/${currentUser.decoded.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const specialityIds = data.specialityIds
          ? data.specialityIds.split(",").map(Number)
          : [];
        const specialities = data.specialities;
        setData({ specialities, specialityIds });
      })
      .catch((error) => console.error(error));
  };

  // Fetch para obtener las consultas no asignadas
  const fetchUnassignedConsultations = (limit, offset) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      specialityIds: data.specialityIds || [],
      limit: limit,
      offset: offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${API_HOST}/unassigned-consultations?offset=${offset}&limit=${limit}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setUnassignedConsultations(data);
      })
      .catch((error) => console.error(error));
  };

  // Fetch para asignarse a una consulta
  const assignConsultation = (consultationId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      consultationId: consultationId,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_HOST}/assign-consultation`, requestOptions)
      .then((response) => response.json())
      .then((result) => notify(result.message))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  useEffect(() => {
    if (data.specialityIds) {
      fetchUnassignedConsultations(10, currentPage);
    }
  }, [data.specialityIds, currentPage]);
  return (
    <div className="max-w-full bg-smokeWhite sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] mx-auto px-4">
      <DinamicTitle text="Consultas No Asignadas" />
      <ToastContainer />
      <main>
        <section className="flex flex-col justify-center rounded-xl shadow-xl items-center border">
          <div className="bg-smokeWhite w-full h-max text-center rounded-t-xl text-lightBlue font-bold font-roboto text-lg border-solid border-lightBlue ">
            <p className="pt-4"> CONSULTAS PARA:</p>
            <p className="py-4">{data.specialities}</p>
          </div>
          <div className="bg-lightCakeBlue w-full h-full text-center text-lightBlue font-bold font-roboto text-lg border-solid border-lightBlue ">
            <ul>
              {unassignedConsultations &&
                unassignedConsultations.map((consultation) => (
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
                      <div className="flex gap-4 w-full">
                        <button
                          onClick={() =>
                            navigate(`/consultation/${consultation.id}/details`)
                          }
                          className="bg-lightBlue text-smokeWhite p-2 rounded-lg w-full font-bold text-base active:scale-95 transition-transform transform"
                        >
                          Ver Ficha
                        </button>
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="bg-lightBlue text-smokeWhite p-2 rounded-lg w-full font-bold text-base active:scale-95 transition-transform transform"
                        >
                          Asignarse
                        </button>
                        <Modal
                          isOpen={isModalOpen}
                          onRequestClose={() => setIsModalOpen(false)}
                          contentLabel="Confirm Assign"
                          style={microCustomStyles}
                        >
                          <h3 className="font-roboto font-bold text-lg p-2 text-center">
                            ¿Estás seguro de que deseas asignarte a esta
                            consulta?
                          </h3>
                          <div className="flex items-center justify-center gap-6 p-4">
                            <button
                              className="border p-4 bg-lightBlue w-full text-smokeWhite rounded-lg font-inter font-bold"
                              onClick={() => {
                                assignConsultation(consultation.id);
                                setIsModalOpen(false);
                              }}
                            >
                              Sí, asignar
                            </button>
                            <button
                              className="border p-4 bg-lightBlue w-full text-smokeWhite rounded-lg font-inter font-bold"
                              onClick={() => setIsModalOpen(false)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </section>
        <div className="flex justify-between w-full px-4 m-2 p-2">
          <button
            className={`p-4 w-max rounded-lg font-bold text-base active:scale-95 transition-transform transform ${
              currentPage === 0
                ? "bg-light text-smokeWhite"
                : "bg-lightBlue text-smokeWhite"
            }`}
            onClick={() => {
              const newPage = Math.max(currentPage - 10, 0);
              setCurrentPage(newPage);
              fetchUnassignedConsultations(10, newPage * 10);
            }}
            disabled={currentPage === 0}
          >
            <FaArrowLeft />
          </button>
          <button
            className={`p-4 w-max rounded-lg font-bold text-base active:scale-95 transition-transform transform ${
              unassignedConsultations.length < 10
                ? "bg-light text-smokeWhite"
                : "bg-lightBlue text-smokeWhite"
            }`}
            onClick={() => {
              const newPage = currentPage + 10;
              setCurrentPage(newPage);
              fetchUnassignedConsultations(10, newPage * 10);
              window.scrollTo(0, 0); // Scroll to top when navigating to the next page
            }}
            disabled={unassignedConsultations.length < 10}
          >
            <FaArrowRight />
          </button>
        </div>
      </main>
    </div>
  );
};
