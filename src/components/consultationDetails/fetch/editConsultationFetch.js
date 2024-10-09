import { API_HOST } from "../../../constants";
import { notify } from "../../../utils/notify";

export const handleEditConsultation = async (
  id,
  consultationDetails,
  setConsultationDetails,
  setIsEditing,
  navigate,
) => {
  const token = localStorage.getItem("TOKEN");

  try {
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
    setIsEditing({ title: false, description: false, severity: false });
    navigate(0);
  } catch (error) {
    notify(error.message);
  }
};
