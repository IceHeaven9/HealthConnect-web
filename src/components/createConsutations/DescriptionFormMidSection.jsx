import PropTypes from "prop-types";

export const DescriptionFormMidSection = ({ severity, setSeverity }) => {
  return (
    <>
      <p className="font-medium p-2 text-center">Severidad:</p>
      <section className="flex items-center justify-center text-center w-full">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 ">
            <input
              aria-label="low"
              type="radio"
              name="severity"
              value="low"
              className="hidden"
              onChange={(e) => setSeverity(e.target.value)}
            />
            <span
              className={`p-2 rounded-xl cursor-pointer ${
                severity === "low"
                  ? "bg-lightBlue text-smokeWhite"
                  : "bg-gray-200"
              }`}
              data-severity="low"
            >
              Baja
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              aria-label="medium"
              type="radio"
              name="severity"
              value="medium"
              className="hidden"
              onChange={(e) => setSeverity(e.target.value)}
            />
            <span
              className={`p-2 rounded-xl cursor-pointer ${
                severity === "medium"
                  ? "bg-lightBlue text-smokeWhite"
                  : "bg-gray-200"
              }`}
              data-severity="medium"
            >
              Media
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              aria-label="hight"
              type="radio"
              name="severity"
              value="high"
              className="hidden"
              onChange={(e) => setSeverity(e.target.value)}
            />
            <span
              className={`p-2 rounded-xl cursor-pointer ${
                severity === "high"
                  ? "bg-lightBlue text-smokeWhite"
                  : "bg-gray-200"
              }`}
              data-severity="high"
            >
              Alta
            </span>
          </label>
        </div>
      </section>
    </>
  );
};

DescriptionFormMidSection.propTypes = {
  severity: PropTypes.string.isRequired,
  setSeverity: PropTypes.func.isRequired,
};
