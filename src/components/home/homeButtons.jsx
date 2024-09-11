import { Link } from "react-router-dom";
import { useState } from "react";
import { MenuSpecialtiesModal } from "../menu/MenuSpecialtiesModal";
import { MenuDoctorsModal } from "../menu/MenuDoctorsModal";

export const HomeButtons = () => {
    {/*Estados para los modales */}
    const [specialtyModalIsOpen, specialtyModaSetIsOpen] = useState(false);
    const [doctorsModalIsOpen, doctorsModaSetIsOpen] = useState(false);

    return (
        <div className="flex flex-row items-center space-x-4">
            {/* Botón Especialidades */}
            <button
                className="flex items-center justify-center gap-2 bg-blue-700 text-white py-3 px-6 rounded-lg"
                onClick={() => specialtyModaSetIsOpen(true)}
            >
                Especialidades
            </button>
            <MenuSpecialtiesModal
                specialtyModalIsOpen={specialtyModalIsOpen}
                specialtyModaSetIsOpen={specialtyModaSetIsOpen}
            />

            {/* Botón Doctores */}
            <button
                className="flex items-center justify-center gap-2 bg-blue-700 text-white py-3 px-6 rounded-lg"
                onClick={() => doctorsModaSetIsOpen(true)}
            >
                Doctores
            </button>
            <MenuDoctorsModal
                doctorsModalIsOpen={doctorsModalIsOpen}
                doctorsModaSetIsOpen={doctorsModaSetIsOpen}
            />

            {/* Botón Crear Consulta */}
            <Link to="/create-consultation" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                Crear Consulta
            </Link>
        </div>
    );
};

