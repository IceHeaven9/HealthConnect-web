import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

export const DetailsConsultationPage = () => {
  const { id } = useParams();
  const [consultationDetails, setConsultationDetails] = useState(null);
  const navigate = useNavigate();

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
      <div className="flex text-center p-6 text-[#628eff] font-bold text-3xl w-full mt-6">
        <button onClick={() => navigate("/")} className="w-max">
          {" "}
          <IoMdArrowRoundBack />
        </button>
        <h1 className="w-full">Detalles de la consulta</h1>
      </div>
      <main className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <button
          className="absolute right-1 mt-2 mr-2 p-2 text-[#628eff] rounded"
          onClick={() => {
            document
              .querySelectorAll("input, textarea")
              .forEach((input) => (input.disabled = !input.disabled));
          }}
        >
          <FiEdit size={25} />
        </button>
        <div>
          <h2 className="text-lg font-semibold mb-2">Fecha de la consulta:</h2>
          <p className="mb-2 w-full h-auto break-words">
            Dia:{" "}
            {new Date(consultationDetails.date)
              .toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              .toUpperCase()}
            .
            <br />
            Hora:{" "}
            {new Date(consultationDetails.date).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {"."}
          </p>
        </div>
        <h2 className="text-lg font-semibold mb-2">Paciente:</h2>
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-full mr-2"
            src={consultationDetails.patientAvatar}
            alt="Avatar del paciente"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Paciente
            </label>
            <input
              type="text"
              className="text-lg w-full h-auto break-words"
              value={consultationDetails.patientName}
              disabled
            />
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2">Doctor:</h2>
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-full mr-2"
            src={consultationDetails.doctorAvatar}
            alt="Avatar del doctor"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Doctor
            </label>
            <input
              type="text"
              className="text-lg w-full h-auto break-words"
              value={consultationDetails.doctorName}
              disabled
            />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-[#4B5563] mb-4">
          {consultationDetails.title}
        </h1>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            className="mb-2 w-full h-auto ite"
            value={consultationDetails.description}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Severidad
          </label>
          <input
            type="text"
            className="mb-2 w-full h-auto break-words"
            value={
              consultationDetails.severity === "high"
                ? "Alta"
                : consultationDetails.severity === "medium"
                ? "Media"
                : consultationDetails.severity === "low"
                ? "Baja"
                : consultationDetails.severity
            }
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <input
            type="text"
            className="mb-2 w-full h-auto break-words"
            value={consultationDetails.status}
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Especialidad
          </label>
          <input
            type="text"
            className="mb-2 w-full h-auto break-words"
            value={consultationDetails.specialityName}
            disabled
          />
        </div>
        <h2 className="text-lg font-semibold mb-2">RESPUESTA:</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contenido de la Respuesta
          </label>
          <input
            type="text"
            className="mb-2 w-full h-auto break-words"
            value={consultationDetails.responseContent}
            disabled
          />
        </div>
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
