import PropTypes from "prop-types";

export const ConsultationTitle = ({
  isEditing,
  consultationDetails,
  setConsultationDetails,
}) => {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h3 className="text-lg font-semibold h-min text-lightBlue">Título:</h3>
      </div>
      <input
        type="text"
        name="title"
        className="text-xl font-semibold mb-4 w-full h-min break-words"
        value={consultationDetails.title}
        onChange={(e) =>
          setConsultationDetails({
            ...consultationDetails,
            title: e.target.value,
          })
        }
        disabled={!isEditing.title}
      />
    </>
  );
};

ConsultationTitle.propTypes = {
  userType: PropTypes.string.isRequired,
  isEditing: PropTypes.object.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  consultationDetails: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  setConsultationDetails: PropTypes.func.isRequired,
};
