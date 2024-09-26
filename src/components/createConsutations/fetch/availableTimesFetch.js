import { API_HOST } from "../../../constants";
import {notify} from '../../../utils/notify';

// fetchAvailableTimes.js
export const fetchAvailableTimes = (
	date,
	specialtyId,
	doctor,
	setAvailableTimes
) => {
	const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
	const formattedDate = localDate.toISOString().split("T")[0];
	let url = `${API_HOST}/availability?specialityId=${specialtyId}&date=${formattedDate}`;
	if (doctor) {
		url += `&doctorId=${doctor.id}`;
	}

	const requestOptions = {
		method: "GET",
		redirect: "follow",
	};

	fetch(url, requestOptions)
		.then((response) => response.json())
		.then((result) => {
			setAvailableTimes(Array.isArray(result) ? result : []);
		})
		.catch((error) => {
			notify(error);
			setAvailableTimes([]);
		});
};
