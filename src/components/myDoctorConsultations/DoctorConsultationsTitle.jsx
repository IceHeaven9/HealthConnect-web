import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ToastContainer } from "react-toastify";

export const DoctorConsultationsTitle = () => {
	return (
		<>
			<div className="h-min w-max pl-4 pr-4 pt-1 text-lightBlue"></div>
			<div className="flex items-center justify-start text-center text-lightBlue h-min p-4 mb-4">
				<ToastContainer />

				{/* BOTON DE ATRAS */}
				<button onClick={() => navigate(-1)} className="text-center pr-12">
					<IoMdArrowRoundBack size={30} />
				</button>
				<p className="text-4xl font-bold font-roboto mt-1"> Mis consultas</p>
			</div>
		</>
	);
};
