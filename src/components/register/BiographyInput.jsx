import PropTypes from "prop-types";

export const BiographyInput = ({ bio, setBio }) => {
	return (
		<>
			<div className="mb-4">
				<label className="block text-gray-700 text-md font-semibold  mb-2 ">
					Biografia (Opcional)
				</label>
				<div className="relative text-gray-400">
					<span className="absolute inset-y-0 left-0 flex items-start p-3 pl-3">
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
							className="lucide lucide-book-open"
						>
							<path d="M2 3h20v18H2z"></path>
							<path d="M2 3v18l10-6 10 6V3"></path>
						</svg>
					</span>
					<textarea
						placeholder="Tell us about yourself..."
						className="pl-12 mb-2 bg-gray-50 min-h-40 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
				</div>
			</div>
		</>
	);
};

BiographyInput.propTypes = {
	bio: PropTypes.string.isRequired,
	setBio: PropTypes.func.isRequired,
};
