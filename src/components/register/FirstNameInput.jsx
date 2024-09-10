import PropTypes from "prop-types";

export const FirstNameInput = ({ name, setName }) => {
	return (
		<>
			<div className="mb-4">
				<label className="block text-gray-700 font-ubuntu text-md font-semibold mb-2">
					Nombre
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
							className="lucide lucide-user"
						>
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
							<circle cx="12" cy="7" r="4"></circle>
						</svg>
					</span>
					<input
						type="text"
						placeholder="Escribe tu nombre"
						className="pl-12 mb-2 bg-gray-50 font-inter text-gray-600 focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
			</div>
		</>
	);
};

FirstNameInput.propTypes = {
	name: PropTypes.string.isRequired,
	setName: PropTypes.func.isRequired,
};
