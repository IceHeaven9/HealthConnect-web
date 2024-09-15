import Modal from "react-modal";
import { IoMdArrowRoundBack, IoIosArrowDown } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { API_HOST, customStyles } from "../constants";
import { useAuthGuard } from "../hooks/authGuard";
import { AuthContext } from "../contexts/authContext";
import { IoClose } from "react-icons/io5";
import { SearchBar } from "../components/myConsultations/SearchBar";
import {DoctorConsultationsTitle} from '../components/myDoctorConsultations/DoctorConsultationsTitle';
import {DoctorUserCard} from '../components/myDoctorConsultations/DoctorUserCard';

export const ConsultationDoctorPage = () => {
	const { currentUser } = useContext(AuthContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [data, setData] = useState({});
	const [currentPage, setCurrentPage] = useState(0); // Define currentPage state
    const [historyConsultations, setHistoryConsultations] = useState([]);
	const [limit, setLimit] = useState(5); // Define limit state
	const token = currentUser?.coded;
	const navigate = useNavigate();
	const urlDate = new Date(Date.now()).toISOString().slice(0, 10);
	const [startOrEndDate, setStartOrEndDate] = useState("");

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
	}, []);

	useEffect(() => {
		fetchConsultations();
	}, [startOrEndDate, currentPage]);

	// Fetch para las consultas del doctor
	const fetchConsultations = () => {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", token);

		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(
			`${API_HOST}/my-consultations?offset=${
				currentPage * limit
			}&limit=${limit}&doctorId=${
				currentUser.decoded.id
			}&${startOrEndDate}=${urlDate}&status=pending`,
			requestOptions
		)
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
		<main className="mb-20">
			{/* MENU */}
			<HamburgerMenu />
			<DoctorConsultationsTitle/>
			{/* DATOS DEL DOCTOR */}
			<DoctorUserCard
            currentUser={currentUser}
            data={data}
            />
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
					onAfterOpen={() => {
						const myHeaders = new Headers();
						myHeaders.append("Authorization", token);
						const requestOptions = {
							method: "GET",
							headers: myHeaders,
							redirect: "follow",
						};
						fetch(
							`${API_HOST}/my-consultations?offset=0&doctorId=${currentUser.decoded.id}`,
							requestOptions
						)
							.then((response) => response.json())
							.then((result) => {
								const historyConsultations = result.map((consultation) => ({
									id: consultation.id,
									title: consultation.title,
									date: consultation.date,
									status: consultation.status,
								}));
								setHistoryConsultations(historyConsultations);
							})
							.catch((error) => console.error(error));
					}}
					onRequestClose={closeModal}
					style={customStyles}
				>
					<button onClick={closeModal}>
						<IoClose size={30} />
					</button>
					<h2 className="text-3xl font-bold text-center text-lightBlue font-roboto my-6">
						Historial de consultas
					</h2>
					<SearchBar />
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
			{/* PRÓXIMAS CONSULTAS */}
			<section className="w-full px-4">
				<Accordion>
					<AccordionItem
						header={
							<div className="flex rounded-t-xl justify-between font-inter font-bold text-lightBlue bg-smokeWhite w-full mx-auto p-3">
								<div className="w-full text-center h-max text-lg ">
									SIN RESPONDER
								</div>
								<IoIosArrowDown size={25} />
							</div>
						}
						onClick={() => setStartOrEndDate("endDate")}
					>
						<section className="flex flex-col justify-center rounded-xl shadow-xl w-full items-center border ">
							<div className="bg-lightCakeBlue w-full h-full text-center text-lightBlue font-bold font-roboto text-lg border-lightBlue border-solid border-b-[0.1rem]">
                            <ul>
                                    {data.consultations && data.consultations.length > 0 ? (
                                        data.consultations
                                            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Ordenar por fecha descendente
                                            .map((consultation) => (
                                                <li key={consultation.id} className="p-4 ">
                                                    <div className="flex flex-col items-center gap-4 bg-smokeWhite p-8 rounded-xl ">
                                                        <div className="flex items-center justify-between w-full">
                                                            <p className="text-carbon text-sm">
                                                                {new Date(consultation.date).toLocaleDateString(
                                                                    "es-ES"
                                                                )}
                                                            </p>
                                                            <p>{consultation.specialityName}</p>
                                                        </div>
                                                        <p className="font-bold text-xl font-inter text-carbon">
                                                            {consultation.title}
                                                        </p>
                                                        <button onClick={() =>
                                                            navigate(
                                                                `/consultation/${consultation.id}/details`
                                                            )
                                                        } className="bg-lightBlue text-smokeWhite p-2 rounded-lg w-full font-bold text-base active:scale-95 transition-transform transform">
                                                            Ver Ficha
                                                        </button>
                                                    </div>
                                                </li>
                                            ))
                                    ) : (
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
                                    )}
                                </ul>
							</div>
							<div className="flex justify-between w-full px-4 m-2 p-2">
								<button
									className={`p-4 w-max rounded-lg font-bold text-base active:scale-95 transition-transform transform ${
										currentPage === 0
											? "bg-light text-smokeWhite"
											: "bg-lightBlue text-smokeWhite"
									}`}
									onClick={() =>
										setCurrentPage((prev) => Math.max(prev - 1, 0))
									}
									disabled={currentPage === 0}
								>
									<FaArrowLeft />
								</button>
								<button
									className={`p-4 w-max rounded-lg font-bold text-base active:scale-95 transition-transform transform ${
										data.consultations && data.consultations.length < limit
											? "bg-light text-smokeWhite"
											: "bg-lightBlue text-smokeWhite"
									}`}
									onClick={() =>
										setCurrentPage((prev) =>
											data.consultations && data.consultations.length === limit
												? prev + 1
												: prev
										)
									}
									disabled={
										data.consultations && data.consultations.length < limit
									}
								>
									<FaArrowRight />
								</button>
							</div>
						</section>
					</AccordionItem>
					<AccordionItem
						header={
							<div className="flex rounded-b-xl justify-between font-inter font-bold text-lightBlue bg-smokeWhite w-full mx-auto p-3">
								<div className="w-full text-center h-max text-lg ">
									PROXIMAS CONSULTAS
								</div>
								<IoIosArrowDown size={25} />
							</div>
						}
						onClick={() => setStartOrEndDate("startDate")}
					>
						<section className="flex flex-col justify-center rounded-xl shadow-xl w-full items-center border mb-20">
							<div className="bg-lightCakeBlue w-full h-full text-center text-lightBlue font-bold font-roboto text-lg border-lightBlue border-solid border-b-[0.1rem]">
                            <ul>
                                    {data.consultations && data.consultations.length > 0 ? (
                                        data.consultations
                                            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Ordenar por fecha descendente
                                            .map((consultation) => (
                                                <li key={consultation.id} className="p-4 ">
                                                    <div className="flex flex-col items-center gap-4 bg-smokeWhite p-8 rounded-xl ">
                                                        <div className="flex items-center justify-between w-full">
                                                            <p className="text-carbon text-sm">
                                                                {new Date(consultation.date).toLocaleDateString(
                                                                    "es-ES"
                                                                )}
                                                            </p>
                                                            <p>{consultation.specialityName}</p>
                                                        </div>
                                                        <p className="font-bold text-xl font-inter text-carbon">
                                                            {consultation.title}
                                                        </p>
                                                        <button onClick={() =>
                                                            navigate(
                                                                `/consultation/${consultation.id}/details`
                                                            )
                                                        } className="bg-lightBlue text-smokeWhite p-2 rounded-lg w-full font-bold text-base active:scale-95 transition-transform transform">
                                                            Ver Ficha
                                                        </button>
                                                    </div>
                                                </li>
                                            ))
                                    ) : (
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
                                    )}
                                </ul>
							</div>
							<div className="flex justify-between w-full px-4 m-2 p-2">
								<button
									className={`p-4 w-max rounded-lg font-bold text-base active:scale-95 transition-transform transform ${
										currentPage === 0
											? "bg-light text-smokeWhite"
											: "bg-lightBlue text-smokeWhite"
									}`}
									onClick={() =>
										setCurrentPage((prev) => Math.max(prev - 1, 0))
									}
									disabled={currentPage === 0}
								>
									<FaArrowLeft />
								</button>
								<button
									className={`p-4 w-max rounded-lg font-bold text-base active:scale-95 transition-transform transform ${
										data.consultations && data.consultations.length < limit
											? "bg-light text-smokeWhite"
											: "bg-lightBlue text-smokeWhite"
									}`}
									onClick={() =>
										setCurrentPage((prev) =>
											data.consultations && data.consultations.length === limit
												? prev + 1
												: prev
										)
									}
									disabled={
										data.consultations && data.consultations.length < limit
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
