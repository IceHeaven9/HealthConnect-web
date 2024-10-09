import PropTypes from "prop-types";

export const SpecialtiesSection = ({
  specialties,
  setSelectedSpecialties,
  selectedSpecialties,
}) => {
  return (
    <>
      <div className="mb-6">
        <label className=" text-gray-700 text-md font-ubuntu font-semibold  mb-6">
          Especialidades
        </label>
        <div className="grid grid-cols-2 items-center justify-items-center gap-2 mt-4">
          {specialties.map((specialty) => (
            <div
              key={specialty.id}
              className={`flex items-center p-2 font-ubuntu rounded-lg cursor-pointer  w-full ${
                selectedSpecialties.includes(specialty.id)
                  ? "bg-lightBlue text-white"
                  : "bg-smokeWhite text-gray-700"
              }`}
              onClick={() => {
                const value = specialty.id;
                setSelectedSpecialties((prev) =>
                  prev.includes(value)
                    ? prev.filter((id) => id !== value)
                    : [...prev, value],
                );
              }}
            >
              <span className="text-sm font-medium">{specialty.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

SpecialtiesSection.propTypes = {
  specialties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setSelectedSpecialties: PropTypes.func.isRequired,
  selectedSpecialties: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
};
