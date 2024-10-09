import Modal from "react-modal";
import PropTypes from "prop-types";
import { LiaClipboardListSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {
  customStyles,
  specialtiesIcons,
  miniCustomStyles,
  specialtiesResume,
  API_HOST,
} from "../../constants";
import { notify } from "../../utils/notify";

const fetchSpecialties = (setSpecialties) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(`${API_HOST}/specialities`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const specialtiesWithIcons = result.map((specialty) => {
        const icon = specialtiesIcons.find(
          (iconObj) => iconObj.id === specialty.id,
        )?.icon;
        return { ...specialty, icon };
      });
      setSpecialties(specialtiesWithIcons);
    })
    .catch((error) => notify(error.message));
};

export const MenuSpecialtiesModal = ({
  specialtyModalIsOpen,
  specialtyModaSetIsOpen,
}) => {
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);

  const handleSpecialtyChange = (event) => {
    const selectedId = Number(event.target.value);
    const selectedSpecialty = specialties.find(
      (specialty) => specialty.id === selectedId,
    );
    setSelectedSpecialty(selectedSpecialty);
    setSecondModalIsOpen(true);
  };

  const handleOnSelect = (item) => {
    const selectedSpecialty = specialties.find(
      (specialty) => specialty.id === item.id,
    );
    setSelectedSpecialty(selectedSpecialty);
    setSecondModalIsOpen(true);
  };

  const formatResult = (item) => {
    return (
      <div className="relative min-h-max z-50">
        <div className="flex flex-col p-2 m-1">
          <div className="flex items-center justify-between">
            <span className="font-ubuntu font-bold text-carbon text-sm">
              {item.name}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <button>
        <LiaClipboardListSolid
          onClick={() => {
            specialtyModaSetIsOpen(true);
            fetchSpecialties(setSpecialties);
          }}
          size={30}
          color="#ffffff"
        />
      </button>
      <Modal
        isOpen={specialtyModalIsOpen}
        onRequestClose={() => specialtyModaSetIsOpen(false)}
        style={customStyles}
      >
        <button
          className="text-2xl"
          onClick={() => specialtyModaSetIsOpen(false)}
        >
          <IoClose />
        </button>
        <section className="flex flex-col items-center justify-center gap-2 text-xl w-full">
          <div className="w-full">
            <h2 className="text-3xl p-6 text-center">Especialidades</h2>
            <div className="w-full p-4">
              <ReactSearchAutocomplete
                items={specialties}
                onSelect={handleOnSelect}
                autoFocus
                formatResult={formatResult}
                fuseOptions={{ keys: ["name"] }}
                resultStringKeyName="name"
              />
            </div>
            {specialties.map((specialty) => (
              <label
                key={specialty.id}
                className={`flex flex-col items-center gap-2 p-4 m-3 rounded-xl ${
                  selectedSpecialty?.id === specialty.id
                    ? "bg-lightCakeBlue border-[0.1rem] border-solid border-cakeBlue text-smokeWhite"
                    : " "
                }`}
              >
                <input
                  type="radio"
                  name="specialty"
                  value={specialty.id}
                  className="hidden"
                  onChange={handleSpecialtyChange}
                />
                <img
                  src={specialty.icon}
                  alt="specialty"
                  className="w-12 h-12"
                />
                <span className="cursor-pointer">{specialty.name}</span>
              </label>
            ))}
          </div>
        </section>
      </Modal>
      {selectedSpecialty && (
        <Modal
          isOpen={secondModalIsOpen}
          onRequestClose={() => setSecondModalIsOpen(false)}
          style={miniCustomStyles}
        >
          <button
            className="text-2xl"
            onClick={() => {
              setSecondModalIsOpen(false),
                setSelectedSpecialty(!selectedSpecialty);
            }}
          >
            <IoClose />
          </button>
          <div className="flex flex-col items-center justify-center gap-2 text-xl w-full">
            <img
              src={selectedSpecialty.icon}
              alt="specialty"
              className="w-20 h-20 m-2"
            />
            <h2 className="text-3xl p-1">{selectedSpecialty.name}</h2>
            <p className="text-center">
              {
                specialtiesResume.find(
                  (resume) => resume.id === selectedSpecialty.id,
                )?.resume
              }
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

MenuSpecialtiesModal.propTypes = {
  specialtyModalIsOpen: PropTypes.bool.isRequired,
  specialtyModaSetIsOpen: PropTypes.func.isRequired,
};
