import { useState, useEffect, useContext } from "react";
import { API_HOST } from "../constants";
import { AuthContext } from "../contexts/authContext";
import { DinamicTitle } from "../components/SingleTitle";
import { useNavigate } from "react-router-dom";

export const UnassignedDoctorConsultationPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [unassignedConsultations, setUnassignedConsultations] = useState([]);
  const [data, setData] = useState({});
  const token = currentUser?.coded;
  const navigate = useNavigate();

  // Fetch para los datos del doctor
  const fetchDoctorData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${API_HOST}/doctors/${currentUser.decoded.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const specialityIds = data.specialityIds
          ? data.specialityIds.split(",").map(Number)
          : [];
        const specialities = data.specialities;
        setData({ specialities, specialityIds });
      })
      .catch((error) => console.error(error));
  };

  // Fetch para las consultas no asignadas
  const fetchUnassignedConsultations = () => {
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
        setUnassignedConsultations(data);
      })
      .catch((error) => console.error(error));
  };
  console.log(unassignedConsultations);

  useEffect(() => {
    fetchDoctorData();
  }, []);

  useEffect(() => {
    if (data.specialityIds) {
      fetchUnassignedConsultations();
    }
  }, [data.specialityIds]);
  return (
    <div className="max-w-full bg-smokeWhite sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] mx-auto px-4">
      <DinamicTitle text="Consultas No Asignadas" />
      <main>
        <section className="flex flex-col justify-center rounded-xl shadow-xl items-center border">
          <div className="bg-smokeWhite w-full h-max text-center rounded-t-xl text-lightBlue font-bold font-roboto text-lg border-solid border-lightBlue ">
            <p className="pt-4"> CONSULTAS PARA:</p>
            <p className="py-4">{data.specialities}</p>
          </div>
          <div className="bg-lightCakeBlue w-full h-full text-center text-lightBlue font-bold font-roboto text-lg border-solid border-lightBlue ">
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
                        <button
                          onClick={() =>
                            navigate(`/consultation/${consultation.id}/details`)
                          }
                          className="bg-lightBlue text-smokeWhite p-2 rounded-lg w-full font-bold text-base active:scale-95 transition-transform transform"
                        >
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
