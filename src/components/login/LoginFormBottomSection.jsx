import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const LoginFormBottomSection = ({ email, password }) => {
	return (
		<>
			<button
				type="submit"
				className={`w-full text-smokeWhite focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6 ${
					!email || !password ? "bg-lightCakeBlue" : "bg-lightBlue"
				}`}
				disabled={!email || !password}
			>
				Continuar
			</button>
			<div className="text-sm font-light text-blueGray text-center">
				No tienes una cuenta?{" "}
				<Link
					to="/register"
					className="font-medium text-lightBlue hover:underline"
				>
					Registrate
				</Link>
			</div>
		</>
	);
};

LoginFormBottomSection.propTypes = {
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
};
