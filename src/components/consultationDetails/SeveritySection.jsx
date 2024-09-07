import PropTypes from "prop-types";
import { FiEdit } from "react-icons/fi";
import { MdSaveAs } from "react-icons/md";
import { handleEditConsultation } from "./fetch/editConsultationFetch";

export const SeveritySection = ({
	userType,
	isEditing,
	id,
	consultationDetails,
	setConsultationDetails,
	setIsEditing,
}) => {
	return (
		<>
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
								<MdSaveAs
									onClick={handleEditConsultation(
										id,
										consultationDetails,
										setConsultationDetails,
										setIsEditing
									)}
								/>
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
		</>
	);
};

SeveritySection.propTypes = {
	userType: PropTypes.string.isRequired,
	isEditing: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	consultationDetails: PropTypes.shape({
		severity: PropTypes.string.isRequired,
	}).isRequired,
	setConsultationDetails: PropTypes.func.isRequired,
	setIsEditing: PropTypes.func.isRequired,
};
