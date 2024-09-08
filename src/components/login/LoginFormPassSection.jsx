import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const LoginFormPassSection = ({ password, handlePasswordChange }) => {
	return (
		<>
			<div className="pb-6">
				<label
					htmlFor="password"
					className="block mb-2 text-sm font-medium text-blackBlue"
				>
					Password
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
							className="lucide lucide-square-asterisk"
						>
							<rect width="18" height="18" x="3" y="3" rx="2"></rect>
							<path d="M12 8v8"></path>
							<path d="m8.5 14 7-4"></path>
							<path d="m8.5 10 7 4"></path>
						</svg>
					</span>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="••••••••••"
						className="pl-12 mb-2 bg-gray-50 text-gray-600  focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
						autoComplete="new-password"
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
					<Link className=" text-center text-sm text-lightBlue" to="/recovery-account">¿Has olvidado la contraseña?</Link>
			</div>
		</>
	);
};

LoginFormPassSection.propTypes = {
	password: PropTypes.string.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
};
