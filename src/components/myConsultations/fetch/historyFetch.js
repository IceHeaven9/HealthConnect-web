import { API_HOST } from "../../../constants";


export const fetchHistoryConsultations = (token, setHistoryConsultations) => {
    const historyUrl = `${API_HOST}/my-consultations`;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    fetch(historyUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const translatedResult = result.map((consultation) => ({
                ...consultation,
                status:
                    consultation.status === "pending"
                        ? "pendiente"
                        : consultation.status === "cancelled"
                        ? "cancelada"
                        : "completada",
            }));
            setHistoryConsultations(translatedResult);
        })
        .catch((error) => console.error(error));
};