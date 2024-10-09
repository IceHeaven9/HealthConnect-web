import { RiFolderAddFill } from "react-icons/ri";
import PropTypes from "prop-types";

export const UpFilesBtn = ({ setShowUploadModal }) => {
  return (
    <>
      <button
        className="bg-lightBlue p-2 rounded-lg text-smokeWhite"
        onClick={() => setShowUploadModal(true)}
      >
        <RiFolderAddFill size={25} />
      </button>
    </>
  );
};

UpFilesBtn.propTypes = {
  setShowUploadModal: PropTypes.func.isRequired,
};
