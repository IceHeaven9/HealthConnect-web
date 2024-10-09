import { FaPlus } from "react-icons/fa6";
import PropTypes from "prop-types";

export const UpFilesTopSection = ({ handleFileUpload }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-roboto my-2 text-lightBlue p-2">
          Subir Archivos
        </h2>
        <label
          htmlFor="file-upload"
          className="cursor-pointer m-2 rounded-full text-lightBlue shadow-xl active:scale-95 transition-transform transform bg-smokeWhite p-2"
        >
          <FaPlus size={25} />
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={(e) => handleFileUpload(e, "responseFiles")}
          className="hidden"
        />
      </div>
    </>
  );
};

UpFilesTopSection.propTypes = {
  handleFileUpload: PropTypes.func.isRequired,
};
