import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { FaLaptopMedical } from "react-icons/fa6";
import Modal from "react-modal";
import { useState } from "react";
import { customStyles } from "../../constants";
import { sendRating } from "./fetch/sendRating";


// Componente de estrellas para calificación
 export const StarRating = ({ rating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          className={`text-2xl ${hoverRating > index || rating > index ? 'text-yellow-500' : 'text-gray-300'}`}
          onClick={() => onRate(index + 1)}
          onMouseEnter={() => setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

// Fin de componente de Estrella

export const ResponseButton = ({
    showResponseFiles,
    setShowResponseFiles,
    consultationDetails,
    
}) => {
    
     // Establecer rating
   const [rating, setRating] = useState(0);
  // Fin de establecer rating


    const isDisabled =
        !consultationDetails.responseContent &&
        (!consultationDetails.responseFiles || consultationDetails.responseFiles.length === 0);

        const handleRating = async (newRating) => {
            if (!consultationDetails.id) {  
              console.error('Error: consultationId no está definido');
              return;
            }
          
            try {
              await sendRating(consultationDetails.id, newRating);
              setRating(newRating);
            } catch (error) {
              console.error('Error al enviar la calificación', error);
            }
          };

    return (
        <>
            <button
                className={`mb-4 p-2 w-full text-end text-smokeWhite rounded-lg flex flex-col items-center font-medium ${
                    isDisabled ? "bg-darkBlue" : "bg-lightBlue"
                }`}
                onClick={() => setShowResponseFiles(!showResponseFiles)}
                disabled={isDisabled}
            >
                {showResponseFiles ? <IoMdClose /> : <FaLaptopMedical size={30} />}{" "}
                Respuesta
            </button>
            <Modal
                isOpen={showResponseFiles}
                onRequestClose={() => setShowResponseFiles(false)}
                contentLabel="Response Files"
                style={customStyles}
            >
                <button
                    className="text-2xl"
                    onClick={() => setShowResponseFiles(false)}
                >
                    <IoMdClose />
                </button>
                <div>
                    <h2 className="text-xl font-semibold mb-2">RESPUESTA:</h2>
                    <div>
                        <p className="mb-2 w-full h-auto break-words">
                            {consultationDetails.responseContent}
                        </p>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Archivos:</h3>
                            {consultationDetails.responseFiles.map((file, index) => (
                                <div key={index} className="mb-2">
                                    <img
                                        className="w-full h-auto"
                                        src={file.filePath}
                                        alt={file.fileName}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Aquí añadimos el sistema de calificación */}
          <StarRating rating={rating} onRate={handleRating} />



                </div>
            </Modal>
        </>
    );
};

ResponseButton.propTypes = {
    showResponseFiles: PropTypes.bool.isRequired,
    setShowResponseFiles: PropTypes.func.isRequired,
    consultationDetails: PropTypes.shape({
        responseContent: PropTypes.string,
        responseFiles: PropTypes.arrayOf(
            PropTypes.shape({
                filePath: PropTypes.string,
                fileName: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
};