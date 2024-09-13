import PropTypes from "prop-types"
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../../contexts/authContext";
import { useContext, useState } from "react";
import { API_HOST, microCustomStyles } from "../../constants";
import { notify } from "../../utils/notify";
import Modal from "react-modal";

export const CancelButton = ({ consultationDetails, setConsultationDetails }) => {
  const token = useContext(AuthContext);
  const [isDisabled, setIsDisabled] = useState(
    consultationDetails.status === "Cancelada" || consultationDetails.status === "Completada"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token.currentUser.coded);
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${API_HOST}/consultations/${consultationDetails.id}/cancel`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        notify(result.message);
        setConsultationDetails((prevDetails) => ({
          ...prevDetails,
          status: "Cancelada",
        }));
        setIsDisabled(true);
        setIsModalOpen(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <button
        className={`mb-4 p-2 w-full text-end text-smokeWhite rounded-lg flex flex-col items-center font-medium ${isDisabled ? "bg-red-300" : "bg-cancelColor" }`}
        onClick={() => setIsModalOpen(true)}
        disabled={isDisabled}
      >
        <FaTimes size={30} />
        Cancelar
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Cancel"
        style={microCustomStyles}
      >
        <h3 className="font-roboto font-bold text-lg p-2 text-center">¿Estás seguro de que deseas cancelar la consulta?</h3>
        <div className="flex items-center justify-center gap-6 p-4">
        <button className="border p-4 bg-cancelColor w-full text-smokeWhite rounded-lg font-inter font-bold" onClick={handleCancel}>Sí, cancelar</button>
        <button className="border p-4 bg-lightBlue w-full text-smokeWhite rounded-lg font-inter font-bold" onClick={() => setIsModalOpen(false)}>Cerrar</button>
        </div>
      </Modal>
    </>
  );
};

CancelButton.propTypes = {
  consultationDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  setConsultationDetails: PropTypes.func.isRequired,
};