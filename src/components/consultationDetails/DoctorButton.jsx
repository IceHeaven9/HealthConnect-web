import PropTypes from "prop-types";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import { microCustomStyles } from "../../constants";

export const DoctorButton = ({
	setShowDoctor,
	showDoctor,
	consultationDetails,
}) => {
	const isDisabled =
	!consultationDetails.doctorName
	return (
		<>
			<button
				className={`mb-4 p-2 w-full text-end text-smokeWhite rounded-lg flex flex-col items-center font-medium ${
					isDisabled ? "bg-darkBlue" : "bg-lightBlue"
			}`}
				onClick={() => setShowDoctor(!showDoctor)}
				disabled={isDisabled}
			>
				{showDoctor ? <IoMdClose /> : <FaUserDoctor size={30} />}Doctor
			</button>
			<Modal
				isOpen={showDoctor}
				onRequestClose={() => setShowDoctor(false)}
				contentLabel="Doctor Details"
				style={microCustomStyles}
			>
				<button className="text-2xl" onClick={() => setShowDoctor(false)}>
					<IoMdClose />
				</button>
				<div className="flex items-center gap-6">
					<img
						className="w-20 h-20 m-2 rounded-full mr-2"
						src={consultationDetails.doctorAvatar}
						alt="Avatar del doctor"
					/>
					<div className="w-full gap-2 p-4">
						<p className="text-2xl font-medium w-full h-auto break-words">
							{consultationDetails.doctorName}
						</p>
					</div>
				</div>
			</Modal>
		</>
	);
};

DoctorButton.propTypes = {
	setShowDoctor: PropTypes.func.isRequired,
	showDoctor: PropTypes.bool.isRequired,
	consultationDetails: PropTypes.shape({
		doctorAvatar: PropTypes.string.isRequired,
		doctorName: PropTypes.string.isRequired,
	}).isRequired,
};
