import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const RegisterButton = ({ isFormValid }) => {
	return (
		<>
			<button
				type="submit"
				className="w-full bg-lightBlue my-4 font-ubuntu text-smokeWhite font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:bg-blue-600"
				disabled={!isFormValid()}
			>
				Confirmar
			</button>
			<p className="p-2 m-2 text-center text-lg text-carbon font-ubuntu">
				Ya tienes una cuenta?{" "}
				<Link className="text-[#628eff]" to="/login">
					Inicia sesión
				</Link>
			</p>
		</>
	);
};

RegisterButton.propTypes = {
	isFormValid: PropTypes.func.isRequired,
};
