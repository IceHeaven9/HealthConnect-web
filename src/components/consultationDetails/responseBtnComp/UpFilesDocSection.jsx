import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";

export const UpFilesDocSection = ({ selectedFiles, handleRemoveFile }) => {
  return (
    <>
      <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
      <h3 className="text-2xl text-carbon font-semibold mb-2 mt-4">
        Documentos
      </h3>
      <div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
      <div className="w-full">
        {selectedFiles.filter(
          (file) => !file.name.match(/\.(jpeg|jpg|webp|png)$/),
        ).length > 0 ? (
          selectedFiles
            .filter((file) => !file.name.match(/\.(jpeg|jpg|webp|png)$/))
            .map((file, index) => (
              <div
                key={index}
                className="bg-lightBlue border-[0.1rem] border-solid border-lightBlue w-full p-2 rounded-lg mb-2 relative"
              >
                <p className="font-inter font-medium text-md text-smokeWhite">
                  {file.name}
                </p>
                <button
                  className="absolute top-2 right-1 bg-red-500 text-smokeWhite rounded-full p-1"
                  onClick={() => handleRemoveFile(index)}
                >
                  <IoMdClose size={15} />
                </button>
              </div>
            ))
        ) : (
          <p className="font-inter font-medium text-md text-carbon text-center w-full col-span-3 py-2">
            No hay documentos
          </p>
        )}
      </div>
    </>
  );
};

UpFilesDocSection.propTypes = {
  selectedFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRemoveFile: PropTypes.func.isRequired,
};
