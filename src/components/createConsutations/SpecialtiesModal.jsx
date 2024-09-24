// SpecialtiesModal.jsx
import { GrAdd } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { fetchSpecialties } from "./fetch/specialtiesFetch";

export const SpecialtiesModal = ({
  setSelectedSpecialty,
  specialtyModaSetIsOpen,
  setSpecialties,
  selectedSpecialty,
  specialties,
  specialtyModalIsOpen,
  customStyles,
}) => {
  return (
    <>
      <button
        className={`flex flex-row text-xl font-medium items-center justify-center rounded-2xl gap-2 py-2 px-4 mt-6 mb-2 ${
          !selectedSpecialty
            ? "text-lightBlue bg-smokeWhite"
            : "bg-lightBlue text-smokeWhite"
        }`}
        onClick={() => {
          specialtyModaSetIsOpen(true);
          fetchSpecialties(setSpecialties);
        }}
      >
        {selectedSpecialty
          ? specialties.find((specialty) => specialty.id === selectedSpecialty)
              .name
          : "Selecciona una Especialidad"}
        <GrAdd />
      </button>
      <Modal
        isOpen={specialtyModalIsOpen}
        onRequestClose={() => specialtyModaSetIsOpen(false)}
        style={customStyles}
        contentLabel="Specialities"
      >
        <button
          className="text-3xl"
          onClick={() => specialtyModaSetIsOpen(false)}
        >
          <IoClose />
        </button>

        <ul className="custom-scrollbar flex flex-col text-xl gap-2">
          {specialties.map((specialty) => (
            <li
              className={`w-full bg-lightCakeBlue p-4 rounded-xl ${
                selectedSpecialty === specialty.id
                  ? "bg-lightBlue text-smokeWhite"
                  : ""
              }`}
              key={specialty.id}
            >
              <label className="px-2">
                {specialty.name}
                <input
                  className="appearance-none "
                  type="radio"
                  name="specialty"
                  value={specialty}
                  onChange={() => {
                    setSelectedSpecialty(specialty.id);
                    specialtyModaSetIsOpen(false);
                  }}
                />
              </label>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

SpecialtiesModal.propTypes = {
  setSelectedSpecialty: PropTypes.func.isRequired,
  specialtyModaSetIsOpen: PropTypes.func.isRequired,
  setSpecialties: PropTypes.func.isRequired,
  selectedSpecialty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  specialties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  specialtyModalIsOpen: PropTypes.bool.isRequired,
  customStyles: PropTypes.object.isRequired,
};
