import { ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import PropTypes from "prop-types";
export const DescriptionTitle = ({ setShowDescriptionForm }) => {
	return (
		<>
			<div className="h-min w-max pl-4 pr-4 pt-1 text-lightBlue"></div>
			<div className="flex items-center justify-start text-center  text-lightBlue h-min p-4 mb-8">
				<ToastContainer />
				<button className="text-center pr-16" onClick={() => setShowDescriptionForm(false)}>
					{" "}
					<IoMdArrowRoundBack size={30} />
				</button>

				<p className="text-4xl font-medium"> Descripción</p>
			</div>
		</>
	);
};

DescriptionTitle.propTypes = {
	setShowDescriptionForm: PropTypes.func.isRequired,
};
