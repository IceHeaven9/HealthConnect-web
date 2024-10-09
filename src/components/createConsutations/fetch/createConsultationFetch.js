import { API_HOST } from "../../../constants";

export const createConsultationFetch = (
  event,
  token,
  title,
  textinput,
  severity,
  selectedSpecialty,
  formattedDateTime,
  selectedDoctor,
  files,
  setTitle,
  setTextinput,
  setSeverity,
  setFiles,
  setPreviews,
  notify,
) => {
  event.preventDefault();

  const myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    title: title,
    description: textinput,
    severity: severity,
    specialityid: selectedSpecialty,
    date: formattedDateTime,
    doctorId: selectedDoctor ? Number(selectedDoctor.id) : undefined,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${API_HOST}/consultations`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.message) {
        setTitle("");
        setTextinput("");
        setSeverity("");
        setFiles([]);
        setPreviews([]);
        notify(result.message);

        // Upload files
        const fileHeaders = new Headers();
        fileHeaders.append("Authorization", token);

        const formdata = new FormData();
        files.forEach((file) => {
          formdata.append("files", file);
        });

        const fileRequestOptions = {
          method: "POST",
          headers: fileHeaders,
          body: formdata,
          redirect: "follow",
        };

        return fetch(
          `${API_HOST}/consultations/${result.id}/files`,
          fileRequestOptions,
        )
          .then((response) =>
            response.text().then((fileResult) => ({ response, fileResult })),
          )
          .then(({ response, fileResult }) => {
            if (response.ok) {
              notify(fileResult.message);
            }
            return result.id; // Retorna el ID de la consulta creada
          })
          .catch((error) => {
            notify(error.message);
          });
      }
    })
    .catch((error) => {
      notify(error.message);
    });
};
