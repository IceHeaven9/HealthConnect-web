import { useState, useEffect, useContext, useCallback } from "react";
import { API_HOST } from "../constants";
import { AuthContext } from "../contexts/authContext";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DinamicTitle } from "../components/SingleTitle";

export const UnassignedDoctorConsultationPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [unassignedConsultations, setUnassignedConsultations] = useState([]);
  const [data, setData] = useState({});
  const token = currentUser?.coded;

  // Fetch para los datos del doctor
  const fetchDoctorData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${API_HOST}/doctors/${currentUser.decoded.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const specialityIds = data.specialities
          ? Object.keys(data.specialities).map(Number)
          : [];
        const specialities = data.specialities
          ? Object.values(data.specialities).join("")
          : "No specialities found";
        setData({ specialityIds, specialities });
      })
      .catch((error) => console.error(error));
  };

  // Fetch para las consultas no asignadas
  const fetchUnassignedConsultations = useCallback(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      specialityIds: data.specialityIds || [],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_HOST}/unassigned-consultations`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUnassignedConsultations(data);
      })
      .catch((error) => console.error(error));
  }, [token, data.specialityIds]);

  useEffect(() => {
    fetchDoctorData();
  }, []);

  useEffect(() => {
    if (data.specialityIds) {
      fetchUnassignedConsultations();
    }
  }, [data.specialityIds]);

  return (
    <div>
      <DinamicTitle text="Consultas No Asignadas" />
      <main>
        <section className="flex flex-col justify-center rounded-xl shadow-xl items-center mx-4 border">
          <div className="bg-smokeWhite w-full  h-max text-center rounded-t-xl text-lightBlue font-bold font-roboto text-lg border-solid border-lightBlue border-b-[0.1rem]">
            <p className="pt-4"> CONSULTAS PARA:</p>
            <p className="py-4">{data.specialities}</p>
          </div>
          <div className="bg-lightCakeBlue w-full h-full text-center text-lightBlue font-bold font-roboto text-lg border-solid border-lightBlue border-b-[0.1rem]">
            <ul>
              {unassignedConsultations &&
                unassignedConsultations.map((consultation) => (
                  <li
                    key={consultation.id}
                    className="p-4 border-b border-lightBlue"
                  >
                    <div className="flex flex-col items-center gap-4 bg-smokeWhite p-8 rounded-xl ">
                      <div className="flex items-center justify-between w-full">
                        <p className="text-carbon">
                          {new Date(consultation.date).toLocaleString()}
                        </p>
                        <p>{consultation.specialityName}</p>
                      </div>
                      <p className="font-bold text-xl font-inter text-carbon">
                        {consultation.title}
                      </p>
                      <div className="flex gap-4 w-full">
                        <button className="bg-lightBlue text-smokeWhite p-2 rounded-lg w-full font-bold text-base active:scale-95 transition-transform transform">
                          Ver Ficha
                        </button>
                        <button className="bg-lightBlue text-smokeWhite p-2 rounded-lg w-full font-bold text-base active:scale-95 transition-transform transform">
                          Asignarse
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};
