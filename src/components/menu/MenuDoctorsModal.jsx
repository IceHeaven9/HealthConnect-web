import Modal from "react-modal";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { customStyles } from "../../constants";
import { FaUserDoctor } from 'react-icons/fa6';
import { useState } from 'react';

export const MenuDoctorsModal = ({
    doctorsModalIsOpen,
    doctorsModaSetIsOpen,
}) => {
    const [doctors, setDoctors] = useState([]);

    const fetchDoctors = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        fetch("http://localhost:3000/doctors", requestOptions)
            .then((response) => response.json())
            .then((result) => setDoctors(result))
            .catch((error) => console.error(error));
    };

    return (
        <>
            <button>
                <FaUserDoctor
                    onClick={() => {
                        doctorsModaSetIsOpen(true);
                        fetchDoctors();
                    }}
                    size={25}
                    color="#ffffff"
                />
            </button>
            <Modal
                isOpen={doctorsModalIsOpen}
                onRequestClose={() => doctorsModaSetIsOpen(false)}
                style={customStyles}
            >
                <button
                    className="text-2xl"
                    onClick={() => doctorsModaSetIsOpen(false)}
                >
                    <IoClose />
                </button>
                <section className="flex flex-col items-center justify-center gap-2 text-xl w-full">
                    <h2 className="text-3xl p-6 text-center">Doctores</h2>
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="flex flex-col items-center gap-2 p-4 m-3 rounded-xl bg-[#bdd0ff] border-[0.1rem] border-solid border-[#90b2ff] text-black">
                            <img src={doctor.avatar} alt="doctor" className="w-12 h-12 rounded-full" />
                            <span className="text-2xl">{doctor.firstName} {doctor.lastName}</span>
                            <p className="text-center">{doctor.biography}</p>
                            <p className="text-center">Especialidades: {doctor.specialities}</p>
														<p className="text-center">Rating: {doctor.averageRating ? parseFloat(doctor.averageRating).toFixed(1) : 'N/A'}</p>
                        </div>
                    ))}
                </section>
            </Modal>
        </>
    );
};

MenuDoctorsModal.propTypes = {
    doctorsModalIsOpen: PropTypes.bool.isRequired,
    doctorsModaSetIsOpen: PropTypes.func.isRequired,
};