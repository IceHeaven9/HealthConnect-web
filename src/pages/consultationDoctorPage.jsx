import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Accordion } from "@szhsin/react-accordion";
import { useAuthGuard } from "../hooks/authGuard";
import { AuthContext } from "../contexts/authContext";
import { DoctorUserCard } from "../components/myDoctorConsultations/DoctorUserCard";
import { LinkBtn } from "../components/LinkBtn";
import { HistoryButton } from "../components/myDoctorConsultations/HistoryButton";
import { UnansweredSection } from "../components/myDoctorConsultations/UnansweredSection";
import { NextConsultationsSection } from "../components/myDoctorConsultations/NextConsultationsSection";
import { fetchDoctorData } from "../components/myDoctorConsultations/fetch/doctorDataFetch";
import { fetchConsultations } from "../components/myDoctorConsultations/fetch/doctorConsultationsFetch";
import { ToastContainer } from "react-toastify";
import { Header } from "../components/Header";

export const ConsultationDoctorPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [historyConsultations, setHistoryConsultations] = useState([]);
  const [limit] = useState(5);
  const token = currentUser?.coded;
  const navigate = useNavigate();
  const urlDate = new Date(Date.now()).toISOString().slice(0, 10);
  const [startOrEndDate, setStartOrEndDate] = useState("");

  useAuthGuard("/my-doctor-consultations");

  useEffect(() => {
    if (currentUser?.decoded?.userType === "patient") {
      navigate("/*");
    }
  }, [currentUser, navigate]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch para los datos del doctor

  useEffect(() => {
    fetchDoctorData(currentUser, setData);
  }, []);

  // Fetch para las consultas del doctor
  useEffect(() => {
    fetchConsultations(
      currentPage,
      limit,
      token,
      currentUser,
      startOrEndDate,
      urlDate,
      setData,
    );
  }, [startOrEndDate, currentPage]);

  // COMPONENTES DE LA PAGINA
  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      <div className="absolute top-0 z-10 w-full">
        <Header title="Mis consultas" showBackButton={true} />
      </div>
      <div className="flex items-center justify-center m-auto mx-4 mt-32 w-full">
        <div className="bg-lightCakeBlue rounded-2xl shadow-xl m-4 p-6 w-full sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
          <main className="bg-smokeWhite rounded-lg p-4">
            <DoctorUserCard currentUser={currentUser} data={data} />
            {/* BOTON DE ASIGNAR CONSULTA */}
            <div className="flex  mx-4  mb-4 gap-2">
              <LinkBtn
                to="/my-doctor-unassigned-consultations"
                className="bg-lightBlue text-smokeWhite w-full font-bold text-base text-center p-2 rounded-lg active:scale-95 transition-transform transform"
              >
                Asignar consulta
              </LinkBtn>

              {/* BOTON DE HISTORIAL */}
              <HistoryButton
                openModal={openModal}
                closeModal={closeModal}
                isModalOpen={isModalOpen}
                token={token}
                navigate={navigate}
                currentUser={currentUser}
                historyConsultations={historyConsultations}
                setHistoryConsultations={setHistoryConsultations}
              />
            </div>
            {/* PRÓXIMAS CONSULTAS */}
            <section className="w-full px-4">
              <Accordion>
                <UnansweredSection
                  setStartOrEndDate={setStartOrEndDate}
                  data={data}
                  currentPage={currentPage}
                  navigate={navigate}
                  setCurrentPage={setCurrentPage}
                  limit={5}
                />
                <NextConsultationsSection
                  setStartOrEndDate={setStartOrEndDate}
                  data={data}
                  currentPage={currentPage}
                  navigate={navigate}
                  setCurrentPage={setCurrentPage}
                  limit={5}
                />
              </Accordion>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
