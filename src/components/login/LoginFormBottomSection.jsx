import PropTypes from "prop-types";

export const LoginFormBottomSection = ({ email, password }) => {
	return (
		<>
			<button
				type="submit"
				className={`w-full text-[#FFFFFF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6 ${
					!email || !password ? "bg-[#bdd0ff]" : "bg-[#628eff]"
				}`}
				disabled={!email || !password}
			>
				Continuar
			</button>
			<div className="text-sm font-light text-[#6B7280] text-center">
				No tienes una cuenta?{" "}
				<a
					href="/register"
					className="font-medium text-[#628eff] hover:underline"
				>
					Registrate
				</a>
			</div>
		</>
	);
};

LoginFormBottomSection.propTypes = {
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
};
