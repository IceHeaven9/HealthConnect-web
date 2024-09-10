import { API_HOST } from "../../../constants";

export const handleEditConsultation = async (
	id,
	consultationDetails,
	setConsultationDetails,
	setIsEditing,
	navigate
) => {
	const token = localStorage.getItem("TOKEN");

	try {
		console.log("Sending data:", consultationDetails); // Agrega este log

		const response = await fetch(`${API_HOST}/consultations/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}`,
			},
			body: JSON.stringify({
				title: consultationDetails.title,
				description: consultationDetails.description,
				severity: consultationDetails.severity,
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		setConsultationDetails(data.consultation);
		console.log("Consultation edited successfully:", data);
		setIsEditing({ title: false, description: false, severity: false });
    navigate(0)
	} catch (error) {
		console.error("Error editing consultation:", error);
	}
};
