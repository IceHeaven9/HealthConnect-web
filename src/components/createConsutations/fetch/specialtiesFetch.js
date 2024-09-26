import { API_HOST } from "../../../constants";
import {notify} from '../../../utils/notify';

// fetchSpecialties.js
export const fetchSpecialties = (setSpecialties) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(`${API_HOST}/specialities`, requestOptions)
    .then((response) => response.json())
    .then((result) => setSpecialties(result))
    .catch((error) => notify(error.message));
};
