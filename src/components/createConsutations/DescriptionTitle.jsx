import { ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import PropTypes from "prop-types";
export const DescriptionTitle = ({ setShowDescriptionForm }) => {
	return (
		<>
			<div className="h-min w-max pl-4 pr-4 pt-6 text-[#628eff]"></div>
			<div className="flex items-center justify-start text-center  text-[#628eff] h-min p-4 mb-8">
				<ToastContainer />
				<button className="pr-20" onClick={() => setShowDescriptionForm(false)}>
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
