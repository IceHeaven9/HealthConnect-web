import { API_HOST } from "../../../constants";

export const fetchConsultations = (
	currentPage,
	limit,
	token,
	currentUser,
	startOrEndDate,
	urlDate,
	setData
) => {
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
