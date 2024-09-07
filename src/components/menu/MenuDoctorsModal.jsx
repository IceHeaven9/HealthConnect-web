import Modal from "react-modal";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { customStyles } from "../../constants";
import {FaUserDoctor} from 'react-icons/fa6';

export const MenuDoctorsModal = ({
	doctorsModalIsOpen,
	doctorsModaSetIsOpen,
}) => {
	return (
		<>
			<button>
				<FaUserDoctor
					onClick={() => doctorsModaSetIsOpen(true)}
					size={25}
					color="#ffffff"
				/>
			</button>
			<Modal
				isOpen={doctorsModalIsOpen} // Asegúrate de pasar el estado aquí
				onRequestClose={() => doctorsModaSetIsOpen(false)} // Permite cerrar el modal al hacer clic fuera de él
				style={customStyles}
			>
				<button
					className="text-2xl"
					onClick={() => doctorsModaSetIsOpen(false)}
				>
					<IoClose />
				</button>
				{/* Contenido del modal */}
			</Modal>
		</>
	);
};

MenuDoctorsModal.propTypes = {
	doctorsModalIsOpen: PropTypes.bool.isRequired,
	doctorsModaSetIsOpen: PropTypes.func.isRequired,
};