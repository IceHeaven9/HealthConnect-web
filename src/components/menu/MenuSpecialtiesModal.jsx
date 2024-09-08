import Modal from "react-modal";
import PropTypes from "prop-types";
import { LiaClipboardListSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { customStyles, specialtiesIcons, miniCustomStyles, specialtiesResume } from "../../constants";

const fetchSpecialties = (setSpecialties) => {
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    fetch("http://localhost:3000/specialities", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const specialtiesWithIcons = result.map((specialty) => {
                const icon = specialtiesIcons.find((iconObj) => iconObj.id === specialty.id)?.icon;
                return { ...specialty, icon };
            });
            setSpecialties(specialtiesWithIcons);
        })
        .catch((error) => console.error(error));
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
        const selectedSpecialty = specialties.find(specialty => specialty.id === selectedId);
        setSelectedSpecialty(selectedSpecialty);
        setSecondModalIsOpen(true);
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
                    <div className="">
                        <h2 className="text-3xl p-6 text-center">Especialidades</h2>
                        {specialties.map((specialty) => (
                            <label
                                key={specialty.id}
                                className={`flex flex-col items-center gap-2 p-4 m-3 rounded-xl ${selectedSpecialty?.id === specialty.id ? 'bg-lightCakeBlue border-[0.1rem] border-solid border-cakeBlue text-smokeWhite' : ' '}`}
                            >
                                <input
                                    type="radio"
                                    name="specialty"
                                    value={specialty.id}
                                    className="hidden"
                                    onChange={handleSpecialtyChange}
                                />
                                <img src={specialty.icon} alt="specialty" className="w-12 h-12" />
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
                        onClick={() => {setSecondModalIsOpen(false),setSelectedSpecialty(!selectedSpecialty)}}
                    >
                        <IoClose />
                    </button>
                    <div className="flex flex-col items-center justify-center gap-2 text-xl w-full">
                        <img src={selectedSpecialty.icon} alt="specialty" className="w-20 h-20 m-2" />
                        <h2 className="text-3xl p-1">{selectedSpecialty.name}</h2>
                        <p className="text-center">
                            {specialtiesResume.find(resume => resume.id === selectedSpecialty.id)?.resume}
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