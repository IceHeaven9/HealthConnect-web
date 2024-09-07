import PropTypes from "prop-types";
export const StatusSection = ({ consultationDetails }) => {
	return (
		<>
			<div className="w-full">
				<h3 className="text-xl font-semibold mb-2">Estado:</h3>
				<p className="mb-2 w-full h-auto break-words">
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
