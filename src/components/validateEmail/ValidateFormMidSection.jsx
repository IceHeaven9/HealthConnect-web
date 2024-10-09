import PropTypes from "prop-types";
export const ValidateFormMidSection = ({
  verificationCode,
  setVerificationCode,
}) => {
  return (
    <>
      <div className="pb-2">
        <label
          htmlFor="verificationCode"
          className="block mb-4 text-sm font-medium text-[#111827]"
        >
          Código de Verificación
        </label>
        <input
          type="number"
          name="verificationCode"
          id="verificationCode"
          className="mb-4 bg-[#ecf1ff] text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
          placeholder="Ingrese el código de verificación"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </div>
    </>
  );
};

ValidateFormMidSection.propTypes = {
  verificationCode: PropTypes.string.isRequired,
  setVerificationCode: PropTypes.func.isRequired,
};
