import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router-dom";

export const DetailsConsultationPage = () => {
  const { id } = useParams();
  const [consultationDetails, setConsultationDetails] = useState(null);

  useEffect(() => {
    const fetchConsultationDetails = async () => {
      const token = localStorage.getItem("TOKEN");

      try {
        const response = await fetch(
          `http://localhost:3000/consultations/${id}/details`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setConsultationDetails(data);
      } catch (error) {
        console.error("Error fetching consultation details:", error);
      }
    };

    fetchConsultationDetails();
  }, [id]);

  if (!consultationDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#cad6ff]">
      <div className="flex items-center justify-start gap-20 w-full ">
        <button className="text-[#628eff] p-4">
          <IoMdArrowRoundBack size={40} />
        </button>
        <div className="flex flex-col items-center text-[#628eff] gap-4">
          <img
            className="w-32 h-32"
            src="/public/images/Perfil_healthConnect-Photoroom.png"
            alt=""
          />
        </div>
        <div className="w-6"></div>
      </div>
      <header className="text-2xl font-bold mb-4">
        Detalles de la consulta
      </header>
      <main className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-2">Paciente:</h2>
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-full mr-2"
            src={consultationDetails.patientAvatar}
            alt="Avatar del paciente"
          />
          <p className="text-lg">{consultationDetails.patientName}</p>
        </div>
        <h2 className="text-lg font-semibold mb-2">Doctor:</h2>
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-full mr-2"
            src={consultationDetails.doctorAvatar}
            alt="Avatar del doctor"
          />
          <p className="text-lg">{consultationDetails.doctorName}</p>
        </div>
        <h1 className="text-2xl font-bold text-[#4B5563] mb-4">
          {consultationDetails.title}
        </h1>
        <p className="mb-2">
          <strong>Descripción:</strong> {consultationDetails.description}
        </p>
        <p className="mb-2">
          <strong>Severidad:</strong>
          {consultationDetails.severity === "high"
            ? " Alta"
            : consultationDetails.severity === "medium"
            ? " Media"
            : consultationDetails.severity === "low"
            ? " Baja"
            : consultationDetails.severity}
        </p>
        <p className="mb-2">
          <strong>Estado:</strong> {consultationDetails.status}
        </p>
        <p className="mb-2">
          <strong>Fecha:</strong>{" "}
          {new Date(consultationDetails.date).toLocaleString()}
        </p>

        <p className="mb-2">
          <strong>Especialidad:</strong> {consultationDetails.specialityName}
        </p>

        <h2 className="text-lg font-semibold mb-2">RESPUESTA:</h2>
        <p className="mb-2">{consultationDetails.responseContent}</p>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Archivos de la Consulta:
          </h2>
          {consultationDetails.consultationFiles.map((file, index) => (
            <div key={index} className="mb-2">
              <img
                className="w-full h-auto"
                src={file.filePath}
                alt={file.fileName}
              />
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Archivos de la RESPUESTA:
          </h2>
          {consultationDetails.responseFiles.map((file, index) => (
            <div key={index} className="mb-2">
              <img
                className="w-full h-auto"
                src={file.filePath}
                alt={file.fileName}
              />
            </div>
          ))}
        </div>
      </main>
      <footer className="mt-6 text-center">Footer content</footer>
    </div>
  );
};
