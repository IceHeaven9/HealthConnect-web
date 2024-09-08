import PropTypes from "prop-types";
import { FiEdit } from "react-icons/fi";
import { MdSaveAs } from "react-icons/md";
import { handleEditConsultation } from "./fetch/editConsultationFetch";
import { useNavigate } from "react-router-dom";

export const SeveritySection = ({
	userType,
	isEditing,
	id,
	consultationDetails,
	setConsultationDetails,
	setIsEditing,
}) => {
	const navigate = useNavigate();
	return (
		<>
			<div className="w-full">
				<div className="flex justify-between items-center ">
					<h3 className="text-lg font-semibold text-[#628eff]">Severidad:</h3>
					{userType === "patient" && (
						<button
							className="p-2 text-[#628eff] rounded"
							onClick={() =>
								setIsEditing({ ...isEditing, severity: !isEditing.severity })
							}
						>
							{isEditing.severity ? (
								<MdSaveAs
								size={20}
									onClick={() =>
										handleEditConsultation(
											id,
											consultationDetails,
											setConsultationDetails,
											setIsEditing,
											navigate
										)
									}
								/>
							) : (
								<FiEdit size={20} />
							)}
						</button>
					)}
				</div>
				<input
					type="text"
					name="severity"
					className="mb-4 w-full h-auto break-words text-xl font-medium"
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
