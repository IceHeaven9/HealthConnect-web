import PropTypes from "prop-types";
import { useContext } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { useState, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { API_HOST } from "../../constants";
import { notify } from './../../utils/notify';

export const EditButton = ({ setIsEditing, scrollToRef, isEditing, consultationDetails }) => {
  const token = useContext(AuthContext);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (consultationDetails.status === "Completada" || consultationDetails.status === "Cancelada") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [consultationDetails.status]);

  const handleSave = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token.currentUser.coded);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title: consultationDetails.title,
      description: consultationDetails.description,
      severity: consultationDetails.severity,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_HOST}/consultations/${consultationDetails.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        notify(result.message);
      })
      .catch((error) => console.log(error));
  };

  return (
    <button
      className={`mb-4 p-2 w-full text-end text-smokeWhite rounded-lg flex flex-col items-center font-medium ${isDisabled ? "bg-warning/50": ""} ${isEditing.title ? "bg-green-500" : "bg-warning"} `}
      onClick={() => {
        if (isEditing.title) {
          handleSave();
        }
        setIsEditing((prev) => ({
          title: !prev.title,
          description: !prev.description,
          severity: !prev.severity,
        }));
        scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      disabled={isDisabled}
    >
      {isEditing.title ? <FaSave size={25} /> : <FaEdit size={25} />}
      {isEditing.title ? "Guardar" : "Editar"}
    </button>
  );
};

EditButton.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
  scrollToRef: PropTypes.object.isRequired,
  isEditing: PropTypes.shape({
    title: PropTypes.bool.isRequired,
    description: PropTypes.bool.isRequired,
    severity: PropTypes.bool.isRequired,
  }).isRequired,
  consultationDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};