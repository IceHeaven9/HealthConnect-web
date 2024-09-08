import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import PropTypes from "prop-types";

export const UserTypeInput = ({ userType, handleUserTypeChange }) => {
	return (
		<>
			<div className="mb-4">
				<label className="block text-gray-700 text-md font-semibold my-2">
					Registrarse como:
				</label>
				<div className="flex items-center">
					<label
						htmlFor="patient"
						className={`mr-4 px-3 py-2 rounded-lg text-sm w-full font-medium cursor-pointer flex flex-col items-center justify-center ${
							userType === "Patient"
								? "bg-lightBlue text-white"
								: "bg-gray-200 text-gray-700"
						}`}
					>
						<FaUser size={30} />
						Paciente
						<input
							type="radio"
							id="patient"
							name="userType"
							value="Patient"
							checked={userType === "Patient"}
							onChange={(e) => handleUserTypeChange(e.target.value)}
							className="hidden"
						/>
					</label>
					<label
						htmlFor="doctor"
						className={`px-3 py-2 rounded-lg cursor-pointer text-sm w-full font-medium flex flex-col items-center justify-center ${
							userType === "Doctor"
								? "bg-lightBlue text-white"
								: "bg-gray-200 text-gray-700"
						}`}
					>
						<FaUserDoctor size={30} />
						Doctor
						<input
							type="radio"
							id="doctor"
							name="userType"
							value="Doctor"
							checked={userType === "Doctor"}
							onChange={(e) => handleUserTypeChange(e.target.value)}
							className="hidden"
						/>
					</label>
				</div>
			</div>
		</>
	);
};

UserTypeInput.propTypes = {
	userType: PropTypes.string.isRequired,
	handleUserTypeChange: PropTypes.func.isRequired,
};
