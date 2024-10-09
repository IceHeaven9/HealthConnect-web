import { API_HOST } from "../../constants";
import { notify } from "../../utils/notify";

// src/utils/api.js
export const sendRecoveryEmail = (email) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ email });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${API_HOST}}/recover-password`, requestOptions)
    .then((response) => {
      if (response.status === 200) {
        return response.text();
      } else {
        throw new Error("Error en la solicitud");
      }
    })
    .then((result) => {
      const { message } = JSON.parse(result);
      notify(message);
    });
};
