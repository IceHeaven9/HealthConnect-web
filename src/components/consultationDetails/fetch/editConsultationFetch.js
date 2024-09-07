export const handleEditConsultation = async (id,consultationDetails,setConsultationDetails,setIsEditing) => {
  const token = localStorage.getItem("TOKEN");

  try {
    const response = await fetch(
      `http://localhost:3000/consultations/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(consultationDetails),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setConsultationDetails(data.consultation);
    console.log("Consultation edited successfully:", data);
    setIsEditing({ title: false, description: false, severity: false });
  } catch (error) {
    console.error("Error editing consultation:", error);
  }
};