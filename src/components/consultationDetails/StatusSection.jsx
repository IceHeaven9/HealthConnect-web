import PropTypes from "prop-types";
export const StatusSection = ({ consultationDetails }) => {
	return (
		<>
			<div className="w-full">
				<h3 className="text-lg font-semibold  text-lightBlue">Estado:</h3>
				<p className="mb-4 w-full text-xl font-medium h-auto break-words">
					{consultationDetails.status}
				</p>
			</div>
		</>
	);
};

StatusSection.propTypes = {
	consultationDetails: PropTypes.shape({
		status: PropTypes.string.isRequired,
	}).isRequired,
};
