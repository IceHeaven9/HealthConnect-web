import PropTypes from "prop-types";
export const SpecialtySection = ({ consultationDetails }) => {
	return (
		<>
			<div className="w-full">
				<h3 className="text-xl font-semibold mb-2">Especialidad:</h3>
				<p className="mb-2 w-full h-auto break-words">
					{consultationDetails.specialityName}
				</p>
			</div>
		</>
	);
};

SpecialtySection.propTypes = {
	consultationDetails: PropTypes.shape({
		specialityName: PropTypes.string.isRequired,
	}).isRequired,
};
