import PropTypes from "prop-types";
import { IoMdArrowRoundBack } from "react-icons/io";

export const ConsultationDetailsTitle = ({ navigate }) => {
	return (
		<>
			<div className="flex text-center p-6 text-[#628eff] font-bold text-3xl w-full mt-6">
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