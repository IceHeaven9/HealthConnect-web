import PropTypes from "prop-types";

export const PatientSection = ({ consultationDetails }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4 w-full gap-4">
        <img
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full mr-2"
          src={consultationDetails.patientAvatar}
          alt="Avatar del paciente"
        />
        <div>
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl w-full h-auto break-words font-medium">
            {consultationDetails.patientName}
          </p>
        </div>
        <img
          src="/public/images/Perfil_healthConnect_blue.png"
          alt=""
          className="w-20 h-20"
        />
      </div>
    </>
  );
};

PatientSection.propTypes = {
  consultationDetails: PropTypes.shape({
    patientAvatar: PropTypes.string.isRequired,
    patientName: PropTypes.string.isRequired,
  }).isRequired,
};
