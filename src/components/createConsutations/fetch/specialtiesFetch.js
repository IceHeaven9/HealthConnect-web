// fetchSpecialties.js
export const fetchSpecialties = (setSpecialties) => {
	const requestOptions = {
		method: "GET",
		redirect: "follow",
	};
	fetch("http://localhost:3000/specialities", requestOptions)
		.then((response) => response.json())
		.then((result) => setSpecialties(result))
		.catch((error) => console.error(error));
};
