import PropTypes from "prop-types";
export const SpecialtySection = ({ consultationDetails }) => {
	return (
		<>
			<div className="w-full">
				<h3 className="text-lg font-semibold text-[#628eff]">Especialidad:</h3>
				<p className="mb-4 text-xl font-medium w-full h-auto break-words">
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
