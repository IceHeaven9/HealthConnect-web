import { API_HOST } from "../../../../constants";
import { notify } from "../../../../utils/notify";

export const saveResponse = (consultationId, responseContent, token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    content: responseContent,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(
    `${API_HOST}/consultations/${consultationId}/response`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => notify(result.message))
    .catch((error) => console.error(error));
};