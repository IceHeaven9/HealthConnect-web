import { FaEdit, FaSave } from "react-icons/fa";
import { MdAddComment } from "react-icons/md";
import { StarRating } from "../StarRating";
import PropTypes from "prop-types";

export const ResponseSection = ({
	currentUser,
	isEditing,
	handleSaveClick,
	consultationDetails,
	handleEditClick,
	responseContent,
	setResponseContent,
	handleRating,
}) => {
	return (
		<>
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold my-2 text-carbon p-2">RESPUESTA:</h2>

				{currentUser.decoded.userType === "doctor" && (
					<div className="">
						{isEditing ? (
							<button
								className="bg-green-500 p-2 rounded-lg text-smokeWhite ml-2"
								onClick={handleSaveClick}
							>
								<FaSave size={25} />
							</button>
						) : consultationDetails.responseContent ? (
							<button
								className="bg-warning p-2 rounded-lg text-smokeWhite"
								onClick={handleEditClick}
							>
								<FaEdit size={25} />
							</button>
						) : (
							<button
								className="bg-lightBlue p-2 rounded-lg text-smokeWhite"
								onClick={handleEditClick}
							>
								<MdAddComment size={25} />
							</button>
						)}
					</div>
				)}
			</div>
			<div className="w-full">
				{isEditing ? (
					<textarea
						className="mb-2 w-full h-max font-ubuntu font-bold text-md p-2 min-h-40 break-words rounded-xl"
						value={responseContent}
						onChange={(e) => {
							setResponseContent(e.target.value);
						}}
					/>
				) : responseContent ? (
					<p className="mb-2 w-full h-max font-ubuntu font-bold text-md p-2 min-h-40 break-words">
						{responseContent}
					</p>
				) : (
					<p className="mb-2 w-full h-max font-ubuntu font-bold text-md p-2 min-h-40 break-words">
						No hay respuesta
					</p>
				)}
				<div className="flex items-center justify-end pt-2 pb-4">
					<StarRating
						handleRating={handleRating}
						consultationDetails={consultationDetails}
						currentUser={currentUser}
					/>
				</div>
			</div>
		</>
	);
};

ResponseSection.propTypes = {
	currentUser: PropTypes.shape({
		decoded: PropTypes.shape({
			userType: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	isEditing: PropTypes.bool.isRequired,
	handleSaveClick: PropTypes.func.isRequired,
	consultationDetails: PropTypes.shape({
		responseContent: PropTypes.string,
	}).isRequired,
	handleEditClick: PropTypes.func.isRequired,
	responseContent: PropTypes.string.isRequired,
	setResponseContent: PropTypes.func.isRequired,
	handleRating: PropTypes.func.isRequired,
};
