import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";

export const UpFilesCloseBtn = ({ setShowUploadModal }) => {
	return (
		<>
			<div className="flex items-center justify-center w-full mt-4">
				<button
					className="bg-smokeWhite p-2 rounded-full text-lightBlue shadow-xl active:scale-95 transition-transform transform"
					onClick={() => setShowUploadModal(false)}
				>
					<IoMdClose size={30} />
				</button>
			</div>
		</>
	);
};

UpFilesCloseBtn.propTypes = {
	setShowUploadModal: PropTypes.func.isRequired,
};
