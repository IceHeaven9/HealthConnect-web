import { API_HOST } from "../../../../constants";
import { notify } from "../../../../utils/notify";

export const uploadFiles = (token, selectedFiles, consultationId) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  const formData = new FormData();
  selectedFiles.forEach((file) => {
    formData.append("files", file);
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };
  return fetch(
    `${API_HOST}/consultations/${consultationId}/response/files`,
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => notify(result.message))
    .catch((error) => notify(error));
};
