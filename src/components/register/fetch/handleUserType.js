import { API_HOST } from "../../../constants";
import { notify } from "../../../utils/notify";


// utils/userTypeHandler.js
export const handleUserTypeChange = async (
	type,
	setUserType,
	setDoctorCode,
	setExperience,
	setBio,
	setSpecialties
) => {
	setUserType(type);
	if (type === "Patient") {
		setDoctorCode("");
		setExperience("");
		setBio("");
	} else if (type === "Doctor") {
		try {
			const response = await fetch(`${API_HOST}/specialities`);
			const data = await response.json();
			setSpecialties(data);
		} catch (error) {
			notify("Error fetching specialties", error);
		}
	}
};
