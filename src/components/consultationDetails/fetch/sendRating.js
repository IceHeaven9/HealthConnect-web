import { API_HOST } from "../../../constants";

export const sendRating = async (consultationId, rating) => {

  const token = localStorage.getItem("TOKEN"); 

  const url = `${API_HOST}/consultations/${consultationId}/response/rate`;

  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`, 
    },
    body: JSON.stringify({ rating }),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Error al enviar la calificación. Status: ${response.status}`);
    }
    const result = await response.json();
    console.log('Rating actualizado con éxito:', result);
    return result;
  } catch (error) {
    console.error('Error al enviar la calificación:', error);
    throw error;
  }
};
