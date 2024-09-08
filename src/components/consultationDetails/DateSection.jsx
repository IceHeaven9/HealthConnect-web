import PropTypes from "prop-types";
export const DateSection = ({ consultationDetails }) => {
	return (
		<>
			<div className="w-full">
				<h3 className="text-lg font-semibold  w-full text-lightBlue">
					Fecha de la consulta:
				</h3>
				<p className="mb-6 w-full text-lg h-auto break-words font-medium ">
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
		</>
	);
};

DateSection.propTypes = {
	consultationDetails: PropTypes.shape({
		date: PropTypes.string.isRequired,
	}).isRequired,
};
