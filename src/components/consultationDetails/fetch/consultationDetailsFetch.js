import { API_HOST } from "../../../constants";
import { notify } from "../../../utils/notify";
export const fetchConsultationDetails = async (
  setUserType,
  currentUser,
  setConsultationDetails,
  id,
) => {
  const token = localStorage.getItem("TOKEN");

  try {
    const response = await fetch(`${API_HOST}/consultations/${id}/details`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const translatedStatus =
      data.status === "pending"
        ? "Pendiente"
        : data.status === "cancelled"
          ? "Cancelada"
          : data.status === "completed"
            ? "Completada"
            : "";

    setConsultationDetails({
      id: data.id,
      title: data.title,
      severity: data.severity,
      description: data.description,
      status: translatedStatus,
      doctorId: data.doctorId,
      date: data.date,
      patientAvatar: data.patientAvatar,
      patientName: data.patientName,
      patientEmail: data.patientEmail,
      responseId: data.responseId,
      rating: data.rating,
      responseContent: data.responseContent,
      doctorAvatar: data.doctorAvatar,
      doctorName: data.doctorName,
      specialityName: data.specialityName,
      consultationFiles: data.consultationFiles,
      responseFiles: data.responseFiles,
    });

    setUserType(currentUser.decoded.userType);
  } catch (error) {
    notify("Error fetching consultation details:", error);
  }
};
