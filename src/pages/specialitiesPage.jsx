import { useState } from "react";
import Modal from "react-modal";
import { DinamicTitle } from "../components/DinamicTitle";
import { specialtiesResume, specialtiesIcons, microCustomStyles } from "../constants";
import { IoClose } from "react-icons/io5";

export const SpecialitiesPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
    setIsModalOpen(true);
  };

  const specialities = specialtiesResume.map((specialty, index) => {
    return (
      <ul
        key={index}
        className="bg-lightCakeBlue flex flex-col items-center p-2 rounded-lg shadow-xl"
        onClick={() => handleSpecialtySelect(specialty)}
      >
        <li className="w-60 h-60 text-center bg-smokeWhite w-full rounded-lg flex flex-col items-center justify-center gap-2 m-2">
          <img
            src={specialtiesIcons[index].icon}
            alt={specialty.name}
            className="w-60 h-60 p-4 object-contain"
          />
        </li>
        <span className="text-lightBlue text-2xl font-ubuntu font-bold text-center">
          {specialty.name}
        </span>
      </ul>
    );
  });

  return (
    <div className="flex flex-col items-center">
      <div className="absolute top-0 z-10 w-full">
        <DinamicTitle text="Especialidades" />
      </div>
      <ul className="flex flex-wrap justify-center max-w-[1500px] gap-6 p-6 mx-auto mt-20">
        {specialities}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Specialty Resume"
        style={microCustomStyles}
      >
        {selectedSpecialty && (
          <div className="p-4 bg-smokeWhite rounded-xl">
            <h2 className="text-2xl font-bold mb-4">
              {selectedSpecialty.name}
            </h2>
            <p>{selectedSpecialty.resume}</p>
            <div className="flex items-center justify-center">
            <button
              className="mt-4 bg-lightBlue text-smokeWhite p-2 rounded-full"
              onClick={() => setIsModalOpen(false)}
            >
              <IoClose size={20}/>
            </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};