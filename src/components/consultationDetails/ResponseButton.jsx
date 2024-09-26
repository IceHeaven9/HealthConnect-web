import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { FaLaptopMedical } from "react-icons/fa6";
import Modal from "react-modal";
import { consultationsFilesModal, microCustomStyles } from "../../constants";
import { AuthContext } from "../../contexts/authContext";
import { useContext, useState } from "react";
import { sendRating } from "./fetch/sendRating";
import { ResponseSection } from "./responseBtnComp/ResponseSection";
import { FilesTitle } from "./responseBtnComp/FilesTitle";
import { UpFilesBtn } from "./responseBtnComp/UpFilesBtn";
import { UpFilesTopSection } from "./responseBtnComp/UpFilesTopSection";
import { UpFilesImageSection } from "./responseBtnComp/UpFilesImageSection";
import { UpFilesDocSection } from "./responseBtnComp/UpFilesDocSection";
import { SendFilesBtn } from "./responseBtnComp/SendFilesBtn";
import { UpFilesCloseBtn } from "./responseBtnComp/UpFilesCloseBtn";
import { FilesImageSection } from "./responseBtnComp/FilesImageSection";
import { FilesDocSection } from "./responseBtnComp/FilesDocSection";
import { CloseResponseBtn } from "./responseBtnComp/CloseResponseBtn";
import { saveResponse } from "./responseBtnComp/fetch/saveResponseFetch";

export const ResponseButton = ({
  showResponseFiles,
  setShowResponseFiles,
  consultationDetails,
  consultationId,
}) => {
  const { currentUser } = useContext(AuthContext);
  const token = currentUser?.coded;
  const [isEditing, setIsEditing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [responseContent, setResponseContent] = useState(
    consultationDetails.responseContent || ""
  );
  // Establecer rating
  const [rating, setRating] = useState(0);

  const isDisabled =
    currentUser.decoded.userType === "patient" &&
    !consultationDetails.responseContent &&
    (!consultationDetails.responseFiles ||
      consultationDetails.responseFiles.length === 0);

  const handleRating = async (newRating) => {
    if (!consultationDetails.id) {
      console.error("Error: consultationId no está definido");
      return;
    }

    try {
      await sendRating(consultationId, newRating, token);
      setRating(newRating);
    } catch (error) {
      console.error("Error al enviar la calificación", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    saveResponse(consultationId, responseContent, token).then(() =>
      setIsEditing(false)
    );
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
        style={microCustomStyles}
      >
        <div className="w-full flex flex-col ">
          <ResponseSection
            currentUser={currentUser}
            isEditing={isEditing}
            handleSaveClick={handleSaveClick}
            consultationDetails={consultationDetails}
            handleEditClick={handleEditClick}
            responseContent={responseContent}
            setResponseContent={setResponseContent}
            handleRating={handleRating}
          />
          <div className="bg-smokeWhite p-4 rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center">
              <FilesTitle />
              {currentUser.decoded.userType === "doctor" && (
                <>
                  <UpFilesBtn setShowUploadModal={setShowUploadModal} />
                  <Modal
                    isOpen={showUploadModal}
                    onRequestClose={() => setShowUploadModal(false)}
                    contentLabel="Upload Files"
                    style={consultationsFilesModal}
                  >
                    <div className="w-full flex flex-col">
                      <UpFilesTopSection handleFileUpload={handleFileUpload} />
                      <div className="w-full mt-4">
                        <div className="bg-smokeWhite p-4 rounded-xl shadow-xl ">
                          <UpFilesImageSection
                            selectedFiles={selectedFiles}
                            handleRemoveFile={handleRemoveFile}
                          />
                          <UpFilesDocSection
                            selectedFiles={selectedFiles}
                            handleRemoveFile={handleRemoveFile}
                          />
                          <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
                          <SendFilesBtn
                            token={token}
                            selectedFiles={selectedFiles}
                            consultationId={consultationId}
                          />
                        </div>
                      </div>
                      <UpFilesCloseBtn
                        setShowUploadModal={setShowUploadModal}
                      />
                    </div>
                  </Modal>
                </>
              )}
            </div>
            <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
            <FilesImageSection consultationDetails={consultationDetails} />
            <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
            <FilesDocSection consultationDetails={consultationDetails} />
          </div>
        </div>
        <CloseResponseBtn setShowResponseFiles={setShowResponseFiles} />
      </Modal>
    </>
  );
};

ResponseButton.propTypes = {
  showResponseFiles: PropTypes.bool.isRequired,
  setShowResponseFiles: PropTypes.func.isRequired,
  consultationDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    responseContent: PropTypes.string,
    responseFiles: PropTypes.arrayOf(
      PropTypes.shape({
        filePath: PropTypes.string,
        fileName: PropTypes.string,
      })
    ),
  }).isRequired,
  consultationId: PropTypes.number.isRequired,
  rating: PropTypes.number,
  onRate: PropTypes.func,
};
