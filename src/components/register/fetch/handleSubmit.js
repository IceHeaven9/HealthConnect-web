import { notify } from "./../../../utils/notify";
export const handleSubmit = async (
	e,
	name,
	lastName,
	email,
	username,
	password,
	userType,
	doctorCode,
	experience,
	bio,
	selectedSpecialties
) => {
	e.preventDefault();

	const userData = {
		firstName: name,
		lastName,
		email,
		userName: username,
		password,
		userType: userType.toLowerCase(),
		codigoMedico: userType === "Doctor" ? doctorCode : undefined,
		experience: userType === "Doctor" ? Number(experience) : undefined,
		biography: userType === "Doctor" ? bio : "null",
		specialityId:
			userType === "Doctor"
				? selectedSpecialties.map((id) => parseInt(id, 10))
				: undefined,
	};

	try {
		const response = await fetch("http://localhost:3000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(responseData.message || "Error al registrarse.");
		}

		notify("Usuario registrado correctamente.");
	} catch (err) {
		notify(err.message || "Ocurrió un error.");
	}
};
