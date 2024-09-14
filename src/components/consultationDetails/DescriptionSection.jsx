import PropTypes from "prop-types";

export const DescriptionSection = ({
  isEditing,
  consultationDetails,
  setConsultationDetails,
}) => {
  return (
    <>
      <div className="w-full h-max">
        <div className="flex justify-between items-center mb-2 h-max">
          <h3 className="text-lg font-semibold text-lightBlue">Descripción:</h3>
        </div>
        <textarea
          name="description"
          className={`w-full h-[10rem] p-2 font-medium break-words rounded-lg ${isEditing.description ? "border-solid border-[0.2rem] border-lightBlue": "" } `}
          value={consultationDetails.description}
          onChange={(e) =>
            setConsultationDetails({
              ...consultationDetails,
              description: e.target.value,
            })
          }
          disabled={!isEditing.description}
        />
      </div>
    </>
  );
};

DescriptionSection.propTypes = {
  userType: PropTypes.string.isRequired,
  isEditing: PropTypes.object.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  consultationDetails: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  setConsultationDetails: PropTypes.func.isRequired,
};
