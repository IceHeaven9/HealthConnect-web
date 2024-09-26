import { API_HOST } from "../../../constants";
import { notify } from "../../../utils/notify";

export const fetchHistoryConsultations = (token, doctorId) => {
	const myHeaders = new Headers();
	myHeaders.append("Authorization", token);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	return fetch(
		`${API_HOST}/my-consultations?offset=0&doctorId=${doctorId}`,
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => {
			return result.map((consultation) => ({
				id: consultation.id,
				title: consultation.title,
				date: consultation.date,
				status: consultation.status,
			}));
		})
		.catch((error) => {
			notify(error);
			throw error;
		});
};
