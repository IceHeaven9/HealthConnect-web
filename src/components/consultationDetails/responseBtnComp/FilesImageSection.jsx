import { API_HOST } from "../../../constants";
import PropTypes from "prop-types";

export const FilesImageSection = ({ consultationDetails }) => {
  const getImageUrl = (filePath) => {
    const relativePath = filePath.split("public")[1]; // Extrae la ruta relativa después de "public"
    return `${API_HOST}${relativePath?.replace(/\\/g, "/")}`; // Ajusta el formato de la ruta
  };

  return (
    <>
      <div className="grid grid-cols-3 auto-rows-auto w-full justify-items-center h-max ">
        {consultationDetails.responseFiles &&
        consultationDetails.responseFiles.filter((file) =>
          file.filePath.match(/\.(jpeg|jpg|webp|png)$/),
        ).length > 0 ? (
          consultationDetails.responseFiles
            .filter((file) => file.filePath.match(/\.(jpeg|jpg|webp|png)$/))
            .map((file, index) => (
              <div key={index} className="w-full">
                <img
                  className="w-20 mx-auto h-auto rounded-md border-solid border-lightBlue border-[0.1rem]"
                  src={getImageUrl(file.filePath)}
                  alt={file.fileName}
                />
              </div>
            ))
        ) : (
          <p className="font-inter font-medium text-md text-carbon text-center w-full col-span-3 py-2">
            No hay imágenes
          </p>
        )}
      </div>
    </>
  );
};

FilesImageSection.propTypes = {
  consultationDetails: PropTypes.shape({
    responseFiles: PropTypes.arrayOf(
      PropTypes.shape({
        filePath: PropTypes.string.isRequired,
        fileName: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};
