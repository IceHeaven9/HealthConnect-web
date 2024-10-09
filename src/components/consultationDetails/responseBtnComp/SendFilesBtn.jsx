import { FaFileUpload } from "react-icons/fa";
import PropTypes from "prop-types";
import { uploadFiles } from "./fetch/uploadFilesFetch";

export const SendFilesBtn = ({ token, selectedFiles, consultationId }) => {
  return (
    <>
      <div className="flex items-center justify-end ">
        <button
          className="bg-smokeWhite flex items-center gap-2 text-md font-bold font-inter p-2 rounded-b-lg w-max text-lightBlue active:scale-95 transition-transform transform"
          onClick={() => {
            uploadFiles(token, selectedFiles, consultationId);
          }}
        >
          <FaFileUpload size={30} /> Subir Archivos
        </button>
      </div>
    </>
  );
};

SendFilesBtn.propTypes = {
  token: PropTypes.string.isRequired,
  selectedFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  consultationId: PropTypes.string.isRequired,
};
