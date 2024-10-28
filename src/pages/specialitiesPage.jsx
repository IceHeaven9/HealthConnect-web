import { useEffect, useState } from "react";
import Modal from "react-modal";
import { specialtiesResume, microCustomStyles, API_HOST } from "../constants";
import { IoClose } from "react-icons/io5";
import { Header } from "../components/Header";
import { notify } from "../utils/notify";

export const SpecialitiesPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const fetchSpecialties = async () => {
    try {
      const response = await fetch(`${API_HOST}/specialities`);
      const result = await response.json();
      setSpecialties(result);
    } catch (error) {
      notify(error.message);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
    setIsModalOpen(true);
  };

  const specialitiesFormatted = specialties.map((specialty, index) => {
    return (
      <ul
        key={index}
        className="bg-lightCakeBlue flex flex-col items-center p-2 rounded-lg shadow-xl"
        onClick={() => handleSpecialtySelect(specialty)}
      >
        <li className="w-60 h-60 text-center bg-smokeWhite w-full rounded-lg flex flex-col items-center justify-center gap-2 m-2">
          <img
            src={specialtiesResume[index].icon}
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
        <Header title="Especialidades" showBackButton={true} />
      </div>
      <ul className="flex flex-wrap justify-center max-w-[1500px] gap-6 p-6 mx-auto mt-32">
        {specialitiesFormatted}
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
            <p>{selectedSpecialty.description}</p>
            <div className="flex items-center justify-center">
              <button
                className="mt-4 bg-lightBlue text-smokeWhite p-2 rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                <IoClose size={20} />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
