import PropTypes from "prop-types";
import { FiEdit } from "react-icons/fi";
import { MdSaveAs } from "react-icons/md";
import { handleEditConsultation } from "./fetch/editConsultationFetch";

export const DescriptionSection = ({
	userType,
	setIsEditing,
	isEditing,
	id,
	consultationDetails,
	setConsultationDetails,
}) => {
	return (
		<>
			<div className="w-full h-max">
				<div className="flex justify-between items-center mb-2 h-max">
					<h3 className="text-xl font-semibold">Descripción:</h3>
					{userType === "patient" && (
						<button
							className="p-2 text-[#628eff] rounded"
							onClick={() =>
								setIsEditing({
									...isEditing,
									description: !isEditing.description,
								})
							}
						>
							{isEditing.description ? (
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
				<textarea
					name="description"
					className=" w-full h-[15rem] p-2  "
					value={consultationDetails.description}
					onChange={(e) =>
						setConsultationDetails({
							...consultationDetails,
							description: e.target.value,
						})
					}
					disabled={!isEditing.description}
				/>
			</div>
		</>
	);
};

DescriptionSection.propTypes = {
	userType: PropTypes.string.isRequired,
	isEditing: PropTypes.object.isRequired,
	setIsEditing: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	consultationDetails: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	}).isRequired,
	setConsultationDetails: PropTypes.func.isRequired,
};
