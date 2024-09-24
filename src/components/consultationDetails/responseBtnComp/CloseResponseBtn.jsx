import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";

export const CloseResponseBtn = ({ setShowResponseFiles }) => {
	return (
		<>
			<div className="flex items-center justify-center w-full mt-4 ">
				<button
					className="bg-smokeWhite p-2 rounded-full text-lightBlue  shadow-xl active:scale-95 transition-transform transform"
					onClick={() => setShowResponseFiles(false)}
				>
					<IoMdClose size={30} />
				</button>
			</div>
		</>
	);
};

CloseResponseBtn.propTypes = {
	setShowResponseFiles: PropTypes.func.isRequired,
};
