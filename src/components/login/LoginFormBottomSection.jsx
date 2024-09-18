import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const LoginFormBottomSection = ({ email, password }) => {
  return (
    <>
      <button
        type="submit"
        className={` text-center w-[200px] bg-lightBlue my-4 font-ubuntu text-smokeWhite font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline hover:bg-blue-600 mx-auto ${
          !email || !password ? "bg-lightCakeBlue" : "bg-lightBlue"
        }`}
        disabled={!email || !password}
      >
        Continuar
      </button>
      <div className="text-sm font-light font-ubuntu text-blueGray text-center">
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
