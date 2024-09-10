import PropTypes from "prop-types";

export const DoctorCodeInput = ({ doctorCode, setDoctorCode }) => {
	return (
		<>
			<div className="mb-4">
				<label className="block text-gray-700 text-md font-ubuntu font-semibold  mb-2">
					Codigo de medico
				</label>
				<div className="relative text-gray-400">
					<span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-hash"
						>
							<line x1="4" y1="9" x2="20" y2="9"></line>
							<line x1="4" y1="15" x2="20" y2="15"></line>
							<line x1="10" y1="3" x2="8" y2="21"></line>
							<line x1="16" y1="3" x2="14" y2="21"></line>
						</svg>
					</span>
					<input
						type="text"
						placeholder="*******"
						className="pl-12 mb-2 bg-gray-50 text-gray-600 font-inter focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
						value={doctorCode}
						onChange={(e) => setDoctorCode(e.target.value)}
						required
					/>
				</div>
			</div>
		</>
	);
};

DoctorCodeInput.propTypes = {
	doctorCode: PropTypes.string.isRequired,
	setDoctorCode: PropTypes.func.isRequired,
};
