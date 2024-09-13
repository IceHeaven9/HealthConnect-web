import Modal from "react-modal";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown, IoMdArrowRoundBack } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import { HamburgerMenu } from "./../components/HamburgerMenu";
import { AuthContext } from "../contexts/authContext";
import { API_HOST, customStyles } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

export const ConsultationPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [consultations, setConsultations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historyConsultations, setHistoryConsultations] = useState([]);
  const [status, setStatus] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [startOrEndDate, setstartOrEndDate] = useState("");
  const navigate = useNavigate();
  const token = currentUser?.coded;
  const date = new Date(Date.now())
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const handleFetch = () => {
    if (!startOrEndDate) return;

    const url = `${API_HOST}/my-consultations?${startOrEndDate}=${date}&status=${status}`;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const translatedResult = result.map((consultation) => {
          let translatedStatus;
          switch (consultation.status) {
            case "pending":
              translatedStatus = "pendiente";
              break;
            case "completed":
              translatedStatus = "completada";
              break;
            case "cancelled":
              translatedStatus = "cancelada";
              break;
            default:
              translatedStatus = consultation.status;
          }
          return { ...consultation, status: translatedStatus };
        });
        setConsultations(translatedResult);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    handleFetch();
  }, [startOrEndDate, status]);

  return (
    <main className="w-full mb-20">
      <HamburgerMenu />
      <div className="h-min w-max pl-4 pr-4 pt-1 text-lightBlue"></div>
      <div className="flex items-center justify-start text-center text-lightBlue h-min p-4 mb-4">
        <ToastContainer />
        <button className="text-center pr-12">
          <IoMdArrowRoundBack size={30} />
        </button>
        <p className="text-4xl font-bold font-roboto mt-1"> Mis consultas</p>
      </div>
      <div className="flex justify-center relative">
        <input
          type="text"
          placeholder="Buscar consulta..."
          className="bg-lightCakeBlue rounded-xl p-2 w-full mb-10 mx-4 outline-none pl-10 shadow-xl"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-7 top-5 transform -translate-y-1/2 text-gray-400"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      <div className="border rounded-xl bg-smokeWhites mx-4 bg-light shadow-xl mb-8">
        <Accordion>
          <AccordionItem
            header={
              <div className="flex rounded-t-lg justify-between font-inter font-bold text-lightBlue bg-smokeWhite w-full p-3">
                <div className="w-full text-center h-max text-lg ">
                  AÚN SIN RESPUESTA
                </div>
                <IoIosArrowDown size={25} />
              </div>
            }
            onClick={() => {
              setstartOrEndDate("endDate"), setStatus("pending");
            }}
          >
            <section className="w-full">
              {consultations.length === 0 ? (
                <article>
                  <div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
                    <div className="flex flex-col p-8">
                      <div className="text-md font-inter font-bold text-center text-[#374151]">
                        No hay consultas disponibles
                      </div>
                      <div className="flex justify-end pt-6"></div>
                    </div>
                  </div>
                </article>
              ) : (
                consultations.map((consultation) => (
                  <article key={consultation.id}>
                    <div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
                      <div className="flex flex-col p-8">
                        <div className="text-lg flex justify-between items-center font-bold text-[#374151] pb-6">
                          {new Date(consultation.date).toLocaleDateString(
                            "es-ES"
                          )}
                          <div className="text-sm text-warning">
                            {consultation.status.toUpperCase()}
                          </div>
                        </div>
                        <div className="text-md text-start font-inter font-bold text-[#374151]">
                          {consultation.title.toUpperCase()}
                        </div>
                        <div className="flex justify-end pt-6">
                          <button
                            className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform"
                            onClick={() =>
                              navigate(
                                `/consultation/${consultation.id}/details`
                              )
                            }
                          >
                            Ver Ficha
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </section>
          </AccordionItem>
          <div className=" border-t-[0.1rem] border-lightBlue border-solid"></div>
          <AccordionItem
            header={
              <div className="flex rounded-t-lg justify-between font-inter font-bold text-lightBlue bg-smokeWhite w-full p-3">
                <div className="w-full text-center h-max text-lg ">
                  PRÓXIMAS CONSULTAS
                </div>
                <IoIosArrowDown size={25} />
              </div>
            }
            onClick={() => {
              setstartOrEndDate("startDate"), setStatus("pending");
            }}
          >
            <section className="w-full">
              {consultations.length === 0 ? (
                <article>
                  <div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
                    <div className="flex flex-col p-8">
                      <div className="text-md font-inter font-bold text-center text-[#374151]">
                        No hay consultas disponibles
                      </div>
                      <div className="flex justify-end pt-6"></div>
                    </div>
                  </div>
                </article>
              ) : (
                consultations.map((consultation) => (
                  <article key={consultation.id}>
                    <div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
                      <div className="flex flex-col p-8">
                        <div className="text-lg flex justify-between items-center font-bold text-[#374151] pb-6">
                          {new Date(consultation.date).toLocaleDateString(
                            "es-ES"
                          )}
                          <div className="text-sm text-warning">
                            {consultation.status.toUpperCase()}
                          </div>
                        </div>
                        <div className="text-md text-start font-inter font-bold text-[#374151]">
                          {consultation.title.toUpperCase()}
                        </div>
                        <div className="flex justify-end pt-6">
                          <button
                            className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform"
                            onClick={() =>
                              navigate(
                                `/consultation/${consultation.id}/details`
                              )
                            }
                          >
                            Ver Ficha
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </section>
          </AccordionItem>
          <div className=" border-t-[0.1rem] border-lightBlue border-solid"></div>
          <AccordionItem
            header={
              <div className="flex rounded-t-lg justify-between font-inter font-bold text-lightBlue bg-smokeWhite w-full p-3">
                <div className="w-full text-center h-max text-lg ">
                  CONSULTAS FINALIZADAS
                </div>
                <IoIosArrowDown size={25} />
              </div>
            }
            onClick={() => {
              setstartOrEndDate("endDate");

              setStatus("completed");
            }}
          >
            <section className="w-full">
              {consultations.length === 0 ? (
                <article>
                  <div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
                    <div className="flex flex-col p-8">
                      <div className="text-md font-inter font-bold text-center text-[#374151]">
                        No hay consultas disponibles
                      </div>
                      <div className="flex justify-end pt-6"></div>
                    </div>
                  </div>
                </article>
              ) : (
                consultations.map((consultation) => (
                  <article key={consultation.id}>
                    <div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
                      <div className="flex flex-col p-8">
                        <div className="text-lg flex justify-between items-center font-bold text-[#374151] pb-6">
                          {new Date(consultation.date).toLocaleDateString(
                            "es-ES"
                          )}
                          <div
                            className={`text-sm ${
                              consultation.status === "completada"
                                ? "text-green-500": "text-green-500"
                            }`}
                          >
                            {consultation.status.toUpperCase()}
                          </div>
                        </div>
                        <div className="text-md text-start font-inter font-bold text-[#374151]">
                          {consultation.title.toUpperCase()}
                        </div>
                        <div className="flex justify-end pt-6">
                          <button
                            className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform"
                            onClick={() =>
                              navigate(
                                `/consultation/${consultation.id}/details`
                              )
                            }
                          >
                            Ver Ficha
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </section>
          </AccordionItem>
          <div className=" border-t-[0.1rem] border-lightBlue border-solid"></div>
        </Accordion>
      </div>
      <div className="flex  mx-4 md:mb-[27rem] mb-48 gap-2">
        <Link
          to="/create-consultation"
          className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base text-center p-2 rounded-lg active:scale-95 transition-transform transform"
        >
          Añadir nueva consulta
        </Link>
        <button
          className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform"
          onClick={() => openModal()}
        >
          Historial de consultas
        </button>
        <Modal
          isOpen={isModalOpen}
          onAfterOpen={() => {
            const historyUrl = `${API_HOST}/my-consultations`;
            const myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            const requestOptions = {
              method: "GET",
              headers: myHeaders,
              redirect: "follow",
            };
            fetch(historyUrl, requestOptions)
              .then((response) => response.json())
              .then((result) => {
                const translatedResult = result.map((consultation) => ({
                  ...consultation,
                  status:
                    consultation.status === "pending"
                      ? "pendiente"
                      : consultation.status === "cancelled"
                      ? "cancelada"
                      : "completada",
                }));
                setHistoryConsultations(translatedResult);
              })
              .catch((error) => console.error(error));
          }}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <button onClick={closeModal} className="close-button">
            <IoCloseSharp size={30} />
          </button>
          <h2 className="text-3xl font-bold text-center text-lightBlue font-roboto  my-6">
            Historial de consultas
          </h2>
          <section className="w-full">
            {historyConsultations.length === 0 ? (
              <article>
                <div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
                  <div className="flex flex-col p-8">
                    <div className="text-md font-inter font-bold text-center text-[#374151]">
                      No hay consultas disponibles
                    </div>
                    <div className="flex justify-end pt-6"></div>
                  </div>
                </div>
              </article>
            ) : (
              historyConsultations
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((consultation) => (
                  <article key={consultation.id}>
                    <div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
                      <div className="flex flex-col p-8">
                        <div className="text-lg flex justify-between items-center font-bold text-[#374151] pb-6">
                          {new Date(consultation.date).toLocaleDateString(
                            "es-ES"
                          )}
                          <div className="text-sm text-warning">
                            {consultation.status.toUpperCase()}
                          </div>
                        </div>
                        <div className="text-md text-start font-inter font-bold text-[#374151]">
                          {consultation.title.toUpperCase()}
                        </div>
                        <div className="flex justify-end pt-6">
                          <button
                            className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform"
                            onClick={() =>
                              navigate(
                                `/consultation/${consultation.id}/details`
                              )
                            }
                          >
                            Ver Ficha
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
            )}
          </section>
        </Modal>
      </div>
    </main>
  );
};
