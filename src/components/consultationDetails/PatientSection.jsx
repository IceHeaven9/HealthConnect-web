import PropTypes from "prop-types";
export const PatientSection = ({ consultationDetails }) => {
	return (
		<>
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
		</>
	);
};

PatientSection.propTypes = {
	consultationDetails: PropTypes.shape({
		patientAvatar: PropTypes.string.isRequired,
		patientName: PropTypes.string.isRequired,
	}).isRequired,
};
