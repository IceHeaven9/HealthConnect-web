import { API_HOST } from "../../../constants";

// fetchSpecialties.js
export const fetchSpecialties = (setSpecialties) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(`${API_HOST}/specialities`, requestOptions)
    .then((response) => response.json())
    .then((result) => setSpecialties(result))
    .catch((error) => console.error(error));
};
