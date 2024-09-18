import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { TfiFiles } from "react-icons/tfi";
import Modal from "react-modal";
import { consultationsFilesModal } from "../../constants";

export const ConsultationFilesButton = ({
  setShowConsultationFiles,
  showConsultationFiles,
  consultationDetails,
}) => {
  const isDisabled =
    !consultationDetails.consultationFiles ||
    consultationDetails.consultationFiles.length === 0;
  return (
    <>
      <button
        className={`mb-4 p-2 w-full text-end text-smokeWhite rounded-lg flex flex-col items-center font-medium ${
          isDisabled ? "bg-darkBlue" : "bg-lightBlue"
        }`}
        onClick={() => setShowConsultationFiles(!showConsultationFiles)}
        disabled={isDisabled}
      >
        {showConsultationFiles ? <IoMdClose /> : <TfiFiles size={30} />}{" "}
        Archivos
      </button>
      <Modal
        isOpen={showConsultationFiles}
        onRequestClose={() => setShowConsultationFiles(false)}
        contentLabel="Consultation Files"
        style={consultationsFilesModal}
      >
        <div className="bg-smokeWhite p-4 rounded-lg shadow-md w-full">
          <h3 className="text-2xl text-lightBlue font-semibold mb-2">
            Archivos:
          </h3>
          <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full justify-items-center h-max">
            {consultationDetails.consultationFiles.filter(
              (file) =>
                file.filePath.match(/\.(jpeg|jpg|webp|png)$/) ||
                file.filePath.includes("i.pravatar.cc")
            ).length > 0 ? (
              consultationDetails.consultationFiles
                .filter(
                  (file) =>
                    file.filePath.match(/\.(jpeg|jpg|webp|png)$/) ||
                    file.filePath.includes("i.pravatar.cc")
                )
                .map((file, index) => (
                  <div key={index} className="w-full">
                    <img
                      className="w-20 mx-auto h-auto rounded-md border-solid border-lightBlue border-[0.1rem]"
                      src={file.filePath}
                      alt={file.fileName}
                    />
                  </div>
                ))
            ) : (
              <p className="font-inter font-medium text-md text-carbon col-span-3 w-full text-center">
                No hay imágenes
              </p>
            )}
          </div>
          <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2"></div>
          <div className="w-full">
            {consultationDetails.consultationFiles.filter(
              (file) => !file.filePath.match(/\.(jpeg|jpg|gif|png)$/)
            ).length > 0 ? (
              consultationDetails.consultationFiles
                .filter((file) => !file.filePath.match(/\.(jpeg|jpg|gif|png)$/))
                .map((file, index) => (
                  <div
                    key={index}
                    className="bg-lightBlue border-[0.1rem] border-solid border-lightBlue w-full p-2 rounded-lg mb-2"
                  >
                    <p className="font-inter font-medium text-md text-smokeWhite">
                      {file.fileName}
                    </p>
                  </div>
                ))
            ) : (
              <p className="font-inter font-medium text-md text-carbon">
                No hay documentos
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className="bg-smokeWhite p-2 rounded-full text-lightBlue"
            onClick={() => setShowConsultationFiles(false)}
          >
            <IoMdClose size={30} />
          </button>
        </div>
      </Modal>
    </>
  );
};

ConsultationFilesButton.propTypes = {
  setShowConsultationFiles: PropTypes.func.isRequired,
  showConsultationFiles: PropTypes.bool.isRequired,
  consultationDetails: PropTypes.shape({
    consultationFiles: PropTypes.arrayOf(
      PropTypes.shape({
        filePath: PropTypes.string.isRequired,
        fileName: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
