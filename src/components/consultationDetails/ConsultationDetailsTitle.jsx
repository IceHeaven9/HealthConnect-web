import PropTypes from "prop-types";
import { forwardRef } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export const ConsultationDetailsTitle = forwardRef(({ navigate }, ref) => {
	return (
		<>
			<div  ref={ref} className="flex text-center p-6 text-lightBlue font-bold text-3xl w-full ">
				<button onClick={() => navigate(-1)} className="w-max">
					{" "}
					<IoMdArrowRoundBack />
				</button>
				<p className="w-full">Detalles</p>
			</div>
		</>
	);
})

ConsultationDetailsTitle.propTypes = {
	navigate: PropTypes.func.isRequired,
};

ConsultationDetailsTitle.displayName = "ConsultationDetailsTitle";