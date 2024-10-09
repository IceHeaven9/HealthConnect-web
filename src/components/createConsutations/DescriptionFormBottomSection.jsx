import PropTypes from "prop-types";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

export const DescriptionFormBottomSection = ({
  files,
  handleFileChange,
  previews,
  handleFileRemove,
  textinput,
}) => {
  return (
    <>
      <p className="font-medium mt-4  p-2">Imágenes:</p>
      <div className="border-light border-[0.1rem] border-solid min-w-full h-max  rounded-xl grid grid-cols-5 gap-4">
        {files.length === 0 ? (
          <div className="flex items-center justify-center min-h-20 w-full text-7xl col-span-5"></div>
        ) : (
          files.map(
            (file, index) =>
              file.type.startsWith("image/") && (
                <div key={index} className="relative">
                  <img
                    src={previews[index]}
                    alt="Preview"
                    className="w-16 h-16 m-2 rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute top-0 -right-2 bg-red-500 text-smokeWhite rounded-full p-1"
                    onClick={() => handleFileRemove(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ),
          )
        )}
      </div>

      <p className="font-medium mt-4  p-2">Documentos:</p>
      <div className="border-light p-2 gap-2 border-[0.1rem] border-solid min-w-full h-max mb-6 rounded-xl grid grid-cols-1 ">
        {files.filter((file) => !file.type.startsWith("image/")).length ===
        0 ? (
          <div className="flex items-center justify-center w-full h-full text-2xl p-2 font-medium"></div>
        ) : (
          files.map(
            (file, index) =>
              !file.type.startsWith("image/") && (
                <div
                  key={index}
                  className="relative p-2 border border-gray-300 rounded-lg w-max text-sm text-nowrap"
                >
                  <p>{file.name}</p>
                  <button
                    type="button"
                    className="absolute top-0 -right-2 bg-red-500 text-smokeWhite rounded-full p-1"
                    onClick={() => handleFileRemove(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ),
          )
        )}
      </div>

      <div className="flex flex-col text-center justify-center items-center w-full">
        <input
          aria-label="files"
          type="file"
          name="files"
          id="files"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
        <label
          htmlFor="files"
          className="flex items-center justify-center gap-2 font-bold text-xl text-lightBlue w-max h-10 bg-transparent transition-all duration-300 m-6 cursor-pointer"
        >
          <div className="text-3xl">
            <FaCloudUploadAlt />
          </div>{" "}
          Subir archivos
        </label>
        <div className="w-full flex justify-center text-center mt-4 p-4 max-w-[200px] text-xl mb-4 rounded-lg text-smokeWhite bg-lightBlue ">
          <button type="submit" disabled={!textinput}>
            Confirmar
          </button>
        </div>
      </div>
    </>
  );
};

DescriptionFormBottomSection.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFileChange: PropTypes.func.isRequired,
  previews: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFileRemove: PropTypes.func.isRequired,
  textinput: PropTypes.string,
};
