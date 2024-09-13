import PropTypes from 'prop-types';
import { AccordionItem } from "@szhsin/react-accordion";
import { IoIosArrowDown } from "react-icons/io";

export const EndedConsultation = ({
	setstartOrEndDate,
	setStatus,
	consultations,
	navigate,
}) => {
	return (
		<>
			<AccordionItem
				header={
					<div className="flex rounded-t-lg justify-between font-inter font-bold text-lightBlue bg-smokeWhite w-full p-3">
						<div className="w-full text-center h-max text-lg ">
							CONSULTAS FINALIZADAS
						</div>
						<IoIosArrowDown size={25} />
					</div>
				}
				onClick={() => {
					setstartOrEndDate("endDate");

					setStatus("completed");
				}}
			>
				<section className="w-full">
					{consultations.length === 0 ? (
						<article>
							<div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
								<div className="flex flex-col p-8">
									<div className="text-md font-inter font-bold text-center text-[#374151]">
										No hay consultas disponibles
									</div>
									<div className="flex justify-end pt-6"></div>
								</div>
							</div>
						</article>
					) : (
						consultations.map((consultation) => (
							<article key={consultation.id}>
								<div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
									<div className="flex flex-col p-8">
										<div className="text-lg flex justify-between items-center font-bold text-[#374151] pb-6">
											{new Date(consultation.date).toLocaleDateString("es-ES")}
											<div
												className={`text-sm ${
													consultation.status === "completada"
														? "text-green-500"
														: "text-green-500"
												}`}
											>
												{consultation.status.toUpperCase()}
											</div>
										</div>
										<div className="text-md text-start font-inter font-bold text-[#374151]">
											{consultation.title.toUpperCase()}
										</div>
										<div className="flex justify-end pt-6">
											<button
												className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform"
												onClick={() =>
													navigate(`/consultation/${consultation.id}/details`)
												}
											>
												Ver Ficha
											</button>
										</div>
									</div>
								</div>
							</article>
						))
					)}
				</section>
			</AccordionItem>
		</>
	);
};




EndedConsultation.propTypes = {
    setstartOrEndDate: PropTypes.func.isRequired,
    setStatus: PropTypes.func.isRequired,
    consultations: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    navigate: PropTypes.func.isRequired,
};