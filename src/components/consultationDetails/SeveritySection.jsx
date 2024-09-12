import PropTypes from "prop-types";

export const SeveritySection = ({
  isEditing,
  consultationDetails,
  setConsultationDetails,
}) => {
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold text-lightBlue">Severidad:</h3>
        </div>
        {isEditing.severity ? (
          <select
            name="severity"
            className="mb-4 w-full h-auto break-words text-xl font-medium"
            value={consultationDetails.severity}
            onChange={(e) =>
              setConsultationDetails({
                ...consultationDetails,
                severity: e.target.value,
              })
            }
          >
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        ) : (
          <p className="mb-4 w-full h-auto break-words text-xl font-medium">
            {consultationDetails.severity === "high"
              ? "Alta"
              : consultationDetails.severity === "medium"
              ? "Media"
              : consultationDetails.severity === "low"
              ? "Baja"
              : consultationDetails.severity}
          </p>
        )}
      </div>
    </>
  );
};

SeveritySection.propTypes = {
  userType: PropTypes.string.isRequired,
  isEditing: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  consultationDetails: PropTypes.shape({
    severity: PropTypes.string.isRequired,
  }).isRequired,
  setConsultationDetails: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
};
