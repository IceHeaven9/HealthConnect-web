import { useContext, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdSaveAs } from "react-icons/md";
import { useAuthGuard } from "../hooks/authGuard";
import { AuthContext } from "../contexts/authContext";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { TfiFiles } from "react-icons/tfi";
import { FaLaptopMedical } from "react-icons/fa6";

export const DetailsConsultationPage = () => {
	const { id } = useParams();
	const [consultationDetails, setConsultationDetails] = useState(null);
	const [showConsultationFiles, setShowConsultationFiles] = useState(false);
	const [showResponseFiles, setShowResponseFiles] = useState(false);
	const [showDoctor, setShowDoctor] = useState(false);
	const [userType, setUserType] = useState(null);
	const { currentUser } = useContext(AuthContext);
	const [isEditing, setIsEditing] = useState({
		title: false,
		description: false,
		severity: false,
	});
	const navigate = useNavigate();

	useAuthGuard("/consultations/:id/details");

	// Fetch para obtener los datos de la consulta
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
				setConsultationDetails({
					id: data.id,
					title: data.title,
					severity: data.severity,
					description: data.description,
					status: data.status,
					date: data.date,
					patientAvatar: data.patientAvatar,
					patientName: data.patientName,
					patientEmail: data.patientEmail,
					responseId: data.responseId,
					rating: data.rating,
					responseContent: data.responseContent,
					doctorAvatar: data.doctorAvatar,
					doctorName: data.doctorName,
					specialityName: data.specialityName,
					consultationFiles: data.consultationFiles,
					responseFiles: data.responseFiles,
				});

				// Suponiendo que el tipo de usuario viene en la respuesta
				setUserType(currentUser.userType);
			} catch (error) {
				console.error("Error fetching consultation details:", error);
			}
		};

		fetchConsultationDetails();
	}, [id]);

	if (!consultationDetails) {
		return <div>Loading...</div>;
	}

	// Fetch para modificar la consulta
	const handleEditConsultation = async () => {
		const token = localStorage.getItem("TOKEN");

		try {
			const response = await fetch(
				`http://localhost:3000/consultations/${id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
					body: JSON.stringify(consultationDetails),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setConsultationDetails(data);
			setIsEditing({ title: false, description: false, severity: false });
		} catch (error) {
			console.error("Error editing consultation:", error);
		}
	};

	// Tarjeta de detalles de la consulta
	return (
		<div className="flex flex-col items-center justify-center  min-h-screen">
			<div className="flex text-center p-6 text-[#628eff] font-bold text-3xl w-full mt-6">
				<button onClick={() => navigate("/")} className="w-max">
					{" "}
					<IoMdArrowRoundBack />
				</button>
				<p className="w-full">Detalles de la consulta</p>
			</div>
			<main className="flex flex-col justify-start items-center bg-[#f3f0f0] border-[0.1rem] border-solid border-[#a9bbf5] p-6 rounded-lg shadow-md w-[90%] mx-4 h-full">
				{/* Paciente de la consulta */}
				<div className="flex items-center mb-4 w-full">
					<img
						className="w-16 h-16 rounded-full mr-2"
						src={consultationDetails.patientAvatar}
						alt="Avatar del paciente"
					/>
					<div>
						<p className="block text-sm font-medium text-gray-700 w-full">
							Nombre del Paciente
						</p>
						<p className="text-lg w-full h-auto break-words">
							{consultationDetails.patientName}
						</p>
					</div>
				</div>
			
				{/* Fecha consulta */}
				<div className="w-full">
					<h3 className="text-xl font-semibold mb-2 w-full">
						Fecha de la consulta:
					</h3>
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

				{/* Titulo de la consulta */}
				<div className="flex justify-between items-center mb-2 w-full">
					<h3 className="text-xl font-semibold h-min">Título:</h3>
					{userType === "patient" && (
						<button
							className="p-2 text-[#628eff] rounded"
							onClick={() =>
								setIsEditing({ ...isEditing, title: !isEditing.title })
							}
						>
							{isEditing.title ? (
								<MdSaveAs onClick={handleEditConsultation} />
							) : (
								<FiEdit />
							)}
						</button>
					)}
				</div>
				<input
					type="text"
					name="title"
					className="text-lg font-semibold mb-4 w-full h-min break-words"
					value={consultationDetails.title}
					onChange={(e) =>
						setConsultationDetails({
							...consultationDetails,
							title: e.target.value,
						})
					}
					disabled={!isEditing.title}
				/>

				{/* Descripcion de la consulta */}
				<div className="w-full h-max">
					<div className="flex justify-between items-center mb-2 h-max">
						<h3 className="text-xl font-semibold">Descripción:</h3>
						{userType === "patient" && (
							<button
								className="p-2 text-[#628eff] rounded"
								onClick={() =>
									setIsEditing({
										...isEditing,
										description: !isEditing.description,
									})
								}
							>
								{isEditing.description ? (
									<MdSaveAs onClick={handleEditConsultation} />
								) : (
									<FiEdit />
								)}
							</button>
						)}
					</div>
					<textarea
						name="description"
						className=" w-full h-[15rem] p-2  "
						value={consultationDetails.description}
						onChange={(e) =>
							setConsultationDetails({
								...consultationDetails,
								description: e.target.value,
							})
						}
						disabled={!isEditing.description}
					/>
				</div>

				{/* Gravedad de la consulta */}
				<div className="w-full">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-xl font-semibold">Severidad:</h3>
						{userType === "patient" && (
							<button
								className="p-2 text-[#628eff] rounded"
								onClick={() =>
									setIsEditing({ ...isEditing, severity: !isEditing.severity })
								}
							>
								{isEditing.severity ? (
									<MdSaveAs onClick={handleEditConsultation} />
								) : (
									<FiEdit />
								)}
							</button>
						)}
					</div>
					<input
						type="text"
						name="severity"
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
						onChange={(e) =>
							setConsultationDetails({
								...consultationDetails,
								severity: e.target.value,
							})
						}
						disabled={!isEditing.severity}
					/>
				</div>
				{/* Estado de la consulta */}
				<div className="w-full">
					<h3 className="text-xl font-semibold mb-2">Estado:</h3>
					<p className="mb-2 w-full h-auto break-words">
						{consultationDetails.status}
					</p>
				</div>

				{/* Especialidad de la consulta */}
				<div className="w-full">
					<h3 className="text-xl font-semibold mb-2">Especialidad:</h3>
					<p className="mb-2 w-full h-auto break-words">
						{consultationDetails.specialityName}
					</p>
				</div>

				{/* Archivos de la consulta */}
      {/* Doctor Asignado */}
<div className="w-full flex flex-col items-center gap-4">
  <button
    className="mb-4 p-2 bg-[#628eff] w-full text-end text-white rounded-lg flex flex-col items-center font-medium mt-8"
    onClick={() => setShowDoctor(!showDoctor)}
  >
    {showDoctor ? <IoMdClose /> : <FaUserDoctor size={30} />}Doctor
  </button>
  {showDoctor && (
    <div className="flex items-center mb-4">
      <img
        className="w-16 h-16 rounded-full mr-2"
        src={consultationDetails.doctorAvatar}
        alt="Avatar del doctor"
      />
      <div className="w-full gap-2 p-4">
        <p className="text-lg w-full h-auto break-words">
          {consultationDetails.doctorName}
        </p>
      </div>
    </div>
  )}

  <button
    className="mb-4 p-2 bg-[#628eff] w-full text-end text-white rounded-lg flex flex-col items-center font-medium"
    onClick={() => setShowConsultationFiles(!showConsultationFiles)}
  >
    {showConsultationFiles ? <IoMdClose /> : <TfiFiles size={30} />} Archivos
  </button>
  {showConsultationFiles && (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Archivos:</h3>
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
  )}

  {/* Respuesta a la consulta */}
  <button
    className="mb-4 p-2 bg-[#628eff] w-full text-end text-white rounded-lg flex flex-col items-center font-medium"
    onClick={() => setShowResponseFiles(!showResponseFiles)}
  >
    {showResponseFiles ? <IoMdClose /> : <FaLaptopMedical size={30} />} Respuesta
  </button>
  {showResponseFiles && (
    <div>
      <h2 className="text-xl font-semibold mb-2">RESPUESTA:</h2>
      <div>
        <p className="mb-2 w-full h-auto break-words">
          {consultationDetails.responseContent}
        </p>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Archivos:</h3>
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
      </div>
    </div>
  )}
</div>
			</main>
		</div>
	);
};
