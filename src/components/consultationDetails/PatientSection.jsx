import PropTypes from "prop-types";
export const PatientSection = ({ consultationDetails }) => {
	return (
		<>
			<div className="flex items-center justify-between mb-4 w-full gap-4">
				<img
					className="w-16 h-16 rounded-full mr-2"
					src={consultationDetails.patientAvatar}
					alt="Avatar del paciente"
				/>
				<div>
					<p className="text-2xl w-full h-auto break-words font-medium">
						{consultationDetails.patientName}
					</p>
				</div>
				<img src="/images/Perfil_healthConnect_blue.png" alt="" className="w-20 h-20"/>
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
