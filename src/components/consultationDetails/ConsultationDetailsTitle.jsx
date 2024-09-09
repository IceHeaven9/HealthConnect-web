import PropTypes from "prop-types";
import { IoMdArrowRoundBack } from "react-icons/io";

export const ConsultationDetailsTitle = ({ navigate }) => {
	return (
		<>
			<div className="flex text-center p-6 text-lightBlue font-bold text-3xl w-full ">
				<button onClick={() => navigate("/")} className="w-max">
					{" "}
					<IoMdArrowRoundBack />
				</button>
				<p className="w-full">Detalles</p>
			</div>
		</>
	);
};

ConsultationDetailsTitle.propTypes = {
	navigate: PropTypes.func.isRequired,
};
