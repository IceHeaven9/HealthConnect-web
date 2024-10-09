import PropTypes from "prop-types";
export const ResetPassFormButton = ({
  validationCode,
  password,
  confirmPassword,
}) => {
  return (
    <>
      <button
        type="submit"
        disabled={!validationCode || !password || !confirmPassword}
        className={`w-full text-[#FFFFFF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md p-4 text-center mb-6 ${
          !validationCode || !password || !confirmPassword
            ? "bg-[#bdd0ff]"
            : "bg-[#628eff]"
        }`}
      >
        Confirmar
      </button>
    </>
  );
};

ResetPassFormButton.propTypes = {
  validationCode: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
};
