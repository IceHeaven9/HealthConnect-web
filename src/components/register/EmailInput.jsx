import PropTypes from "prop-types";

export const EmailInput = ({ email, setEmail }) => {
	return (
		<>
			<div className="mb-4">
				<label className="block text-gray-700 text-md font-semibold mb-2">
					Correo electronico
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
							className="lucide lucide-mail"
						>
							<rect width="20" height="16" x="2" y="4" rx="2"></rect>
							<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
						</svg>
					</span>
					<input
						type="email"
						placeholder="example@example.com"
						className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
			</div>
		</>
	);
};

EmailInput.propTypes = {
	email: PropTypes.string.isRequired,
	setEmail: PropTypes.func.isRequired,
};
