import { API_HOST } from "../../../constants";
import { notify } from "../../../utils/notify";

export const sendRating = async (consultationId, newRating,token) => {

  const url = `${API_HOST}/consultations/${consultationId}/response/rate`;

  const raw = JSON.stringify( {rating: newRating} );

  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`, 
    },
    body: raw,
    redirect: "follow"
  };


  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Error al enviar la calificación. Status: ${response.status}`);
    }
    const result = await response.json();
   notify('Rating actualizado con éxito:');
    return result;
  } catch (error) {
    notify('Error al enviar la calificación:');
    throw error;
  }
};
