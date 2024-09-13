import { Accordion } from "@szhsin/react-accordion";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { HamburgerMenu } from "./../components/HamburgerMenu";
import { AuthContext } from "../contexts/authContext";
import { API_HOST } from "../constants";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/myConsultations/SearchBar";
import { NewConsultationAndHistoryButton } from "../components/myConsultations/NewConsultation&HistoryButton";
import { SillNoAnswer } from "../components/myConsultations/SillNoAnswer";
import { NextConsultations } from "../components/myConsultations/NextConsultations";
import { EndedConsultation } from "../components/myConsultations/EndedConsultation";

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

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

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
			<ToastContainer />
			<SearchBar />

			<NewConsultationAndHistoryButton
				navigate={navigate}
				openModal={openModal}
				isModalOpen={isModalOpen}
				token={token}
				setHistoryConsultations={setHistoryConsultations}
				historyConsultations={historyConsultations}
				closeModal={closeModal}
			/>

			<div className="border rounded-xl bg-smokeWhites mx-4 bg-light shadow-xl mb-[10.6rem]">
				<Accordion>
					<SillNoAnswer
						setstartOrEndDate={setstartOrEndDate}
						setStatus={setStatus}
						consultations={consultations}
						navigate={navigate}
					/>
					<div className=" border-t-[0.1rem] border-lightBlue border-solid"></div>
					<NextConsultations
						setstartOrEndDate={setstartOrEndDate}
						setStatus={setStatus}
						consultations={consultations}
						navigate={navigate}
					/>
					<div className=" border-t-[0.1rem] border-lightBlue border-solid"></div>
					<EndedConsultation
						setstartOrEndDate={setstartOrEndDate}
						setStatus={setStatus}
						consultations={consultations}
						navigate={navigate}
					/>
					<div className=" border-t-[0.1rem] border-lightBlue border-solid"></div>
				</Accordion>
			</div>
		</main>
	);
};
