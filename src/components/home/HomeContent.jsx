import { useState, useEffect } from "react";
import { HomeButtons } from "./homeButtons";
import { API_HOST } from "../../constants";

{
  /*Iconos especialidades*/
}
const specialtyIcons = [
  { id: 1, icon: "cardiologia.png" },
  { id: 2, icon: "cabello.png" },
  { id: 3, icon: "endocrinologia.png" },
  { id: 4, icon: "estomago.png" },
  { id: 5, icon: "geriatria.png" },
  { id: 6, icon: "utero.png" },
  { id: 7, icon: "hematologia.png" },
  { id: 8, icon: "sistema-inmune.png" },
  { id: 9, icon: "organos.png" },
  { id: 10, icon: "nefrologia.png" },
  { id: 11, icon: "neumologia.png" },
  { id: 12, icon: "neurologia.png" },
  { id: 13, icon: "oftalmologia.png" },
  { id: 14, icon: "oncologia.png" },
  { id: 15, icon: "pediatria.png" },
  { id: 16, icon: "psiquiatria.png" },
  { id: 17, icon: "reumatologia.png" },
  { id: 18, icon: "hueso-roto.png" },
  { id: 19, icon: "urologia.png" },
  { id: 20, icon: "oido.png" },
];

export const HomeContent = () => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);

  {
    /*Función para obtener los iconos de especialidades */
  }
  const getSpecialtyIcon = (specialtyId) => {
    const icon = specialtyIcons.find(
      (iconObj) => iconObj.id === specialtyId
    )?.icon;
    return icon
      ? `/images/specialtyIcons/${icon}`
      : "/images/specialtyIcons/default.png";
  };

  {
    /*Función para obtener especialidades desde el backend */
  }
  const fetchSpecialties = async () => {
    try {
      const response = await fetch(`${API_HOST}/specialities`);
      const result = await response.json();
      setSpecialties(result);
    } catch (error) {
      console.error("Error al obtener las especialidades:", error);
    }
  };

  {
    /* Función para obtener doctores desde el backend*/
  }
  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${API_HOST}/doctors`);
      const result = await response.json();
      setDoctors(result);
    } catch (error) {
      console.error("Error al obtener los doctores:", error);
    }
  };

  useEffect(() => {
    fetchSpecialties();
    fetchDoctors();
  }, []);

  return (
    <main className="flex flex-col items-center bg-smokeWhite p-4 gap-4 min-h-screen">
      {/* Texto */}
      <div
        className="text-center mb-6 w-full bg-cover bg-center p-6 rounded-lg shadow-md"
        style={{ backgroundImage: "url('/images/fondotext.jpg')" }}
      >
        <div className="bg-white bg-opacity-80 p-6 rounded-lg">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600">
            Tu salud simplificada.
          </h1>
          <p className="text-base md:text-lg leading-relaxed mb-6 text-blue-600">
            Hacemos que sea fácil reservar citas con los mejores profesionales
            de la salud.
          </p>
          <ul className="list-disc list-inside text-base md:text-lg leading-relaxed mb-6 text-blue-600">
            <li>
              <span className="font-semibold">Atención experta:</span> conéctese
              con médicos calificados de diversas especialidades.
            </li>
            <li>
              <span className="font-semibold">Reserva fácil:</span> programe sus
              citas en línea con solo unos pocos clics.
            </li>
            <li>
              <span className="font-semibold">Sin esperas:</span> elija el
              horario que mejor se adapte a sus necesidades.
            </li>
            <li>
              <span className="font-semibold">Seguro y Privado:</span> su
              información médica está protegida con nosotros.
            </li>
          </ul>
          <p className="text-base md:text-lg leading-relaxed text-blue-600">
            ¡Únase hoy y tome el control de su salud con facilidad!
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-center items-center w-full max-w-md mb-8 space-x-4">
        <HomeButtons />
      </div>

      {/* Contenedor especialidades y doctores */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Especialidades */}
        <div className="bg-blue-200 px-4 pb-4 rounded-lg shadow-lg overflow-auto max-h-96">
          <h2 className="text-xl font-bold mb-4 text-blue-800 sticky top-0 bg-blue-200 p-2">
            Especialidades
          </h2>
          {specialties.length > 0 ? (
            <ul className="space-y-3">
              {specialties.map((specialty) => (
                <li key={specialty.id} className="flex items-center">
                  <img
                    src={getSpecialtyIcon(specialty.id)}
                    alt={specialty.name}
                    className="w-12 h-12 mr-4"
                    onError={(e) => {
                      e.target.src = "/images/specialtyIcons/default.png";
                      console.error("Error al cargar la imagen:", e);
                    }}
                  />
                  <span className="text-blue-800">{specialty.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay especialidades disponibles.</p>
          )}
        </div>

        {/* Doctores */}
        <div className="bg-blue-200 px-4 pb-4 rounded-lg shadow-lg overflow-auto max-h-96">
          <h2 className="text-xl font-bold mb-4 text-blue-800 sticky top-0 bg-blue-200 p-2">
            Doctores
          </h2>
          {doctors.length > 0 ? (
            <ul className="space-y-3">
              {doctors.map((doctor) => (
                <li key={doctor.id} className="flex items-center">
                  <img
                    src={doctor.avatar || "/images/doctors/default-avatar.png"}
                    alt={`${doctor.firstName} ${doctor.lastName}`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <span className="text-blue-800">
                    {doctor.firstName} {doctor.lastName}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay doctores disponibles.</p>
          )}
        </div>
      </div>
    </main>
  );
};
