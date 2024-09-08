import PropTypes from "prop-types";
import { FiEdit } from "react-icons/fi";
import { MdSaveAs } from "react-icons/md";
import { handleEditConsultation } from "./fetch/editConsultationFetch";
import { useNavigate } from "react-router-dom";

export const ConsultationTitle = ({
	userType,
	isEditing,
	setIsEditing,
	id,
	consultationDetails,
	setConsultationDetails,
}) => {
	const navigate=useNavigate();
	return (
		<>
			<div className="flex justify-between items-center w-full">
				<h3 className="text-lg font-semibold h-min text-lightBlue">Título:</h3>
				{userType === "patient" && (
					<button
						className="p-2 text-lightBlue "
						onClick={() =>
							setIsEditing({ ...isEditing, title: !isEditing.title })
						}
					>
						{isEditing.title ? (
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
							<FiEdit size={20}/>
						)}
					</button>
				)}
			</div>
			<input
				type="text"
				name="title"
				className="text-xl font-semibold mb-4 w-full h-min break-words"
				value={consultationDetails.title}
				onChange={(e) =>
					setConsultationDetails({
						...consultationDetails,
						title: e.target.value,
					})
				}
				disabled={!isEditing.title}
			/>
		</>
	);
};

ConsultationTitle.propTypes = {
	userType: PropTypes.string.isRequired,
	isEditing: PropTypes.object.isRequired,
	setIsEditing: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	consultationDetails: PropTypes.shape({
		title: PropTypes.string.isRequired,
	}).isRequired,
	setConsultationDetails: PropTypes.func.isRequired,
};
