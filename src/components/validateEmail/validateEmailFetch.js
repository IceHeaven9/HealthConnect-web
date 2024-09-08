// src/utils/api.js

export const validateEmail = async (verificationCode) => {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const raw = JSON.stringify({ code: verificationCode });

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	const response = await fetch(
		"http://localhost:3000/validate-email",
		requestOptions
	);
	if (response.status === 200) {
		return response.json();
	} else {
		throw new Error("Error en la solicitud");
	}
};
