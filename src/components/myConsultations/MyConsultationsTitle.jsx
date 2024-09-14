import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const MyConsultationsTitle = () => {
  const navigate= useNavigate();
	return (
		<>
			<div className="flex items-center justify-start text-center text-lightBlue h-min p-4 mt-1 mb-4">
				<button onClick={()=> navigate(-1)} className="text-center pr-12">
					<IoMdArrowRoundBack size={30} />
				</button>
				<p className="text-4xl font-bold font-roboto mt-1"> Mis consultas</p>
			</div>
		</>
	);
};
