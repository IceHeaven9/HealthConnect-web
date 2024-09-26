import { Accordion } from "@szhsin/react-accordion";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { NewConsultationAndHistoryButton } from "../components/myConsultations/NewConsultation&HistoryButton";
import { SillNoAnswer } from "../components/myConsultations/SillNoAnswer";
import { NextConsultations } from "../components/myConsultations/NextConsultations";
import { EndedConsultation } from "../components/myConsultations/EndedConsultation";
import { fetchConsultations } from "../components/myConsultations/fetch/consultationsFetch";
import { useAuthGuard } from "../hooks/authGuard";
import { UserCard } from "../components/myConsultations/UserCard";
import { Header } from "../components/Header";

export const ConsultationPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [consultations, setConsultations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historyConsultations, setHistoryConsultations] = useState([]);
  const [status, setStatus] = useState("");
  const [startOrEndDate, setstartOrEndDate] = useState("");
  const navigate = useNavigate();
  const token = currentUser?.coded;
  const date = new Date(Date.now())
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  useAuthGuard("/consultation/:id/details");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchConsultations(startOrEndDate, date, status, token, setConsultations);
  }, [startOrEndDate, status]);

  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      <div className="absolute top-0 z-10 w-full">
        <Header title="Mis consultas" showBackButton={true} />
      </div>
      <div className="flex items-center justify-center m-auto mx-4 mt-32 w-full">
        <div className="bg-lightCakeBlue rounded-2xl shadow-xl m-4 p-6 w-full sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
          <main className="bg-smokeWhite rounded-lg p-4">
            <UserCard />
            <NewConsultationAndHistoryButton
              navigate={navigate}
              openModal={openModal}
              isModalOpen={isModalOpen}
              token={token}
              setHistoryConsultations={setHistoryConsultations}
              historyConsultations={historyConsultations}
              closeModal={closeModal}
            />

            <div className="border rounded-xl bg-smokeWhites mx-auto bg-lightCakeBlue w-full shadow-xl">
              <Accordion>
                <SillNoAnswer
                  setstartOrEndDate={setstartOrEndDate}
                  setStatus={setStatus}
                  consultations={consultations}
                  navigate={navigate}
                />
                <div className="border-t-[0.1rem] border-lightBlue border-solid"></div>
                <NextConsultations
                  setstartOrEndDate={setstartOrEndDate}
                  setStatus={setStatus}
                  consultations={consultations}
                  navigate={navigate}
                />
                <div className="border-t-[0.1rem] border-lightBlue border-solid"></div>
                <EndedConsultation
                  setstartOrEndDate={setstartOrEndDate}
                  setStatus={setStatus}
                  consultations={consultations}
                  navigate={navigate}
                />
              </Accordion>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
