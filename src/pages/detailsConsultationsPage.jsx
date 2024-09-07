import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthGuard } from "../hooks/authGuard";
import { AuthContext } from "../contexts/authContext";
import { fetchConsultationDetails } from "../components/consultationDetails/fetch/consultationDetailsFetch";
import { ConsultationDetailsTitle } from "../components/consultationDetails/ConsultationDetailsTitle";
import { PatientSection } from "../components/consultationDetails/PatientSection";
import { DateSection } from "../components/consultationDetails/DateSection";
import { ConsultationTitle } from "../components/consultationDetails/ConsultationTitle";
import { DescriptionSection } from "../components/consultationDetails/DescriptionSection";
import { SeveritySection } from "../components/consultationDetails/SeveritySection";
import { StatusSection } from "../components/consultationDetails/StatusSection";
import { SpecialtySection } from "../components/consultationDetails/SpecialtySection";
import { DoctorButton } from "../components/consultationDetails/DoctorButton";
import { ConsultationFilesButton } from "../components/consultationDetails/ConsultationFilesSection";
import { ResponseButton } from "../components/consultationDetails/ResponseButton";

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
		fetchConsultationDetails(
			setUserType,
			currentUser,
			setConsultationDetails,
			id
		);
	}, [id]);

	if (!consultationDetails) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col items-center justify-center  min-h-screen">
			<ConsultationDetailsTitle navigate={navigate} />
			<main className="flex flex-col justify-start items-center bg-[#f3f0f0] border-[0.1rem] border-solid border-[#a9bbf5] p-6 rounded-lg shadow-md w-[90%] mx-4 h-full">
				<PatientSection consultationDetails={consultationDetails} />
				<DateSection consultationDetails={consultationDetails} />
				<ConsultationTitle
					userType={userType}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
					id={id}
					consultationDetails={consultationDetails}
					setConsultationDetails={setConsultationDetails}
				/>
				<DescriptionSection
					userType={userType}
					setIsEditing={setIsEditing}
					isEditing={isEditing}
					id={id}
					consultationDetails={consultationDetails}
					setConsultationDetails={setConsultationDetails}
				/>
				<SeveritySection
					userType={userType}
					setIsEditing={setIsEditing}
					isEditing={isEditing}
					id={id}
					consultationDetails={consultationDetails}
					setConsultationDetails={setConsultationDetails}
				/>
				<StatusSection consultationDetails={consultationDetails} />
				<SpecialtySection consultationDetails={consultationDetails} />
				<div className="w-full flex flex-col items-center gap-4">
					<DoctorButton
						setShowDoctor={setShowDoctor}
						showDoctor={showDoctor}
						consultationDetails={consultationDetails}
					/>
					<ConsultationFilesButton
						setShowConsultationFiles={setShowConsultationFiles}
						showConsultationFiles={showConsultationFiles}
						consultationDetails={consultationDetails}
					/>
					<ResponseButton
						showResponseFiles={showResponseFiles}
						setShowResponseFiles={setShowResponseFiles}
						consultationDetails={consultationDetails}
					/>
				</div>
			</main>
		</div>
	);
};
