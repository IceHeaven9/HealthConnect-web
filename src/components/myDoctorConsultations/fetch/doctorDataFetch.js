import { API_HOST } from "../../../constants";
import { notify } from "../../../utils/notify";
export const fetchDoctorData = (currentUser, setData) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(`${API_HOST}/doctors/${currentUser.decoded.id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const specialities = data.specialities
        ? Object.values(data.specialities).join("")
        : "No specialities found";
      setData({ specialities });
    })
    .catch((error) => notify(error));
};
