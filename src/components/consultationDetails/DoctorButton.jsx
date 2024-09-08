import PropTypes from "prop-types";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export const DoctorButton = ({
	setShowDoctor,
	showDoctor,
	consultationDetails,
}) => {
	return (
		<>
			<button
				className="mb-4 p-2 bg-[#628eff] w-full text-end text-white rounded-lg flex flex-col items-center font-medium mt-8"
				onClick={() => setShowDoctor(!showDoctor)}
			>
				{showDoctor ? <IoMdClose /> : <FaUserDoctor size={30} />}Doctor
			</button>
			{showDoctor && (
				<div className="flex items-center mb-4">
					<img
						className="w-16 h-16 rounded-full mr-2"
						src={consultationDetails.doctorAvatar}
						alt="Avatar del doctor"
					/>
					<div className="w-full gap-2 p-4">
						<p className="text-lg w-full h-auto break-words">
							{consultationDetails.doctorName}
						</p>
					</div>
				</div>
			)}
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
