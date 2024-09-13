import { API_HOST } from "../../../constants";


export const fetchConsultations = (startOrEndDate, date, status, token, setConsultations) => {
    if (!startOrEndDate) return;

    const url = `${API_HOST}/my-consultations?${startOrEndDate}=${date}&status=${status}`;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const translatedResult = result.map((consultation) => {
                let translatedStatus;
                switch (consultation.status) {
                    case "pending":
                        translatedStatus = "pendiente";
                        break;
                    case "completed":
                        translatedStatus = "completada";
                        break;
                    case "cancelled":
                        translatedStatus = "cancelada";
                        break;
                    default:
                        translatedStatus = consultation.status;
                }
                return { ...consultation, status: translatedStatus };
            });
            setConsultations(translatedResult);
        })
        .catch((error) => console.error(error));
};