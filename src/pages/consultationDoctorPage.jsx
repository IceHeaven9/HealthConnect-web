import Modal from "react-modal";
import { IoMdArrowRoundBack, IoIosArrowDown } from 'react-icons/io';
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { API_HOST, customStyles } from "../constants";
import { useAuthGuard } from "../hooks/authGuard";
import { AuthContext } from "../contexts/authContext";

export const ConsultationDoctorPage = () => {
    const { currentUser } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(0); // Define currentPage state
    const [limit, setLimit] = useState(5); // Define limit state
    const token = currentUser?.coded;
    const navigate = useNavigate();
    const urlDate = new Date(Date.now())
  

    useAuthGuard("/consultation/:id/details");

    if (currentUser.decoded.userType === "patient") {
        navigate("/*");
    }

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
    }, [currentPage]); // Add currentPage as a dependency

    // Fetch para las consultas del doctor
    const fetchConsultations = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`${API_HOST}/my-consultations?offset=${currentPage * limit}&limit=${limit}&doctorId=${currentUser.decoded.id}&startDate=${urlDate.toISOString().slice(0, 10)}`, requestOptions)
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
                    className="bg-lightBlue text-smokeWhite w-full font-bold text-base text-center p-2 rounded-lg active:scale-95 transition-transform transform"
                >
                    Asignar consulta
                </Link>

                {/* BOTON DE HISTORIAL */}
                <button
                    className="bg-lightBlue text-smokeWhite w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform"
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
                   <section className="w-full px-4">
                <Accordion>
                    <AccordionItem
                        header={
                            <div className="flex rounded-t-lg justify-between font-inter font-bold text-lightBlue bg-smokeWhite w-full mx-auto p-3">
                                <div className="w-full text-center h-max text-lg ">
                                    PROXIMAS CONSULTAS
                                </div>
                                <IoIosArrowDown size={25} />
                            </div>
                        }
                    >
                        <section className="flex flex-col justify-center rounded-xl shadow-xl w-full items-center border mb-20">
                            <div className="bg-lightCakeBlue w-full h-full text-center text-lightBlue font-bold font-roboto text-lg border-lightBlue border-solid border-b-[0.1rem]">
                                <ul>
                                    {data.consultations &&
                                        data.consultations
                                            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Ordenar por fecha descendente
                                            .map((consultation) => (
                                                <li key={consultation.id} className="p-4 ">
                                                    <div className="flex flex-col items-center gap-4 bg-smokeWhite p-8 rounded-xl ">
                                                        <div className="flex items-center justify-between w-full">
                                                            <p className="text-carbon text-sm">
                                                                {new Date(consultation.date).toLocaleDateString("es-ES")}
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
                            <div className="flex justify-between w-full px-4 m-2 p-2">
                                <button
                                    className={`p-4 w-max rounded-lg font-bold text-base active:scale-95 transition-transform transform ${
                                        currentPage === 0
                                            ? "bg-light text-smokeWhite"
                                            : "bg-lightBlue text-smokeWhite"
                                    }`}
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                                    disabled={currentPage === 0}
                                >
                                    <FaArrowLeft />
                                </button>
                                <button
                                    className={`p-4 w-max rounded-lg font-bold text-base active:scale-95 transition-transform transform ${
                                        data.consultations &&
                                        data.consultations.length < limit
                                            ? "bg-light text-smokeWhite"
                                            : "bg-lightBlue text-smokeWhite"
                                    }`}
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            data.consultations &&
                                            data.consultations.length === limit
                                                ? prev + 1
                                                : prev
                                        )
                                    }
                                    disabled={
                                        data.consultations &&
                                        data.consultations.length < limit
                                    }
                                >
                                    <FaArrowRight />
                                </button>
                            </div>
                        </section>
                    </AccordionItem>
                </Accordion>
            </section>
        </main>
    );
};