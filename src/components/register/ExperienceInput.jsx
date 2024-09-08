import PropTypes from "prop-types";

export const ExperienceInput = ({ experience, setExperience }) => {
	return (
		<>
			<div className="mb-4">
				<label className="block text-gray-700 text-md font-semibold  mb-2">
					Experiencia
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
							className="lucide lucide-briefcase"
						>
							<rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
							<path d="M16 3h-8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"></path>
						</svg>
					</span>
					<input
						type="number"
						placeholder="5"
						className="pl-12 mb-2 bg-gray-50 text-gray-600  focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
						value={experience}
						onChange={(e) => setExperience(e.target.value)}
						required
					/>
				</div>
			</div>
		</>
	);
};

ExperienceInput.propTypes = {
	experience: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	setExperience: PropTypes.func.isRequired,
};
