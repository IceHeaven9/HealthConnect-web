import { API_HOST } from "../../../constants";

// fetchDoctors.js
export const fetchDoctors = (selectedSpecialty, setDoctors) => {
	const requestOptions = {
		method: "GET",
		redirect: "follow",
	};
	fetch(
		`${API_HOST}/specialities/${selectedSpecialty}/doctors`,
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => {
			const formattedResult = result.map((doctor) => ({
				...doctor,
				averageRating: Math.floor(doctor.averageRating * 10) / 10,
			}));
			setDoctors(formattedResult);
		})
		.catch((error) => console.error(error));
};
