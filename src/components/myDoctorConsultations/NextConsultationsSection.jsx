import { IoIosArrowDown } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AccordionItem } from "@szhsin/react-accordion";

export const NextConsultationsSection = ({
	setStartOrEndDate,
	data,
	currentPage,
	navigate,
	setCurrentPage,
	limit,
}) => {
	return (
		<>
			<AccordionItem
				header={
					<div className="flex rounded-b-xl justify-between font-inter font-bold text-lightBlue bg-smokeWhite w-full mx-auto p-3">
						<div className="w-full text-center h-max text-lg ">
							PROXIMAS CONSULTAS
						</div>
						<IoIosArrowDown size={25} />
					</div>
				}
				onClick={() => setStartOrEndDate("startDate")}
			>
				<section className="flex flex-col justify-center rounded-xl shadow-xl w-full items-center border mb-20">
					<div className="bg-lightCakeBlue w-full h-full text-center text-lightBlue font-bold font-roboto text-lg border-lightBlue border-solid border-b-[0.1rem]">
						<ul>
							{data.consultations && data.consultations.length > 0 ? (
								data.consultations
									.sort((a, b) => new Date(a.date) - new Date(b.date)) // Ordenar por fecha descendente
									.map((consultation) => (
										<li key={consultation.id} className="p-4 ">
											<div className="flex flex-col items-center gap-4 bg-smokeWhite p-8 rounded-xl ">
												<div className="flex items-center justify-between w-full">
													<p className="text-carbon text-sm">
														{new Date(consultation.date).toLocaleDateString(
															"es-ES"
														)}
													</p>
													<p>{consultation.specialityName}</p>
												</div>
												<p className="font-bold text-xl font-inter text-carbon">
													{consultation.title}
												</p>
												<button
													onClick={() =>
														navigate(`/consultation/${consultation.id}/details`)
													}
													className="bg-lightBlue text-smokeWhite p-2 rounded-lg w-full font-bold text-base active:scale-95 transition-transform transform"
												>
													Ver Ficha
												</button>
											</div>
										</li>
									))
							) : (
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
							)}
						</ul>
					</div>
					<div className="flex justify-between w-full px-4 m-2 p-2">
						<button
							className={`p-4 w-max rounded-lg font-bold text-base active:scale-95 transition-transform transform ${
								currentPage === 0
									? "bg-light text-smokeWhite"
									: "bg-lightBlue text-smokeWhite"
							}`}
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
							disabled={currentPage === 0}
						>
							<FaArrowLeft />
						</button>
						<button
							className={`p-4 w-max rounded-lg font-bold text-base active:scale-95 transition-transform transform ${
								data.consultations && data.consultations.length < limit
									? "bg-light text-smokeWhite"
									: "bg-lightBlue text-smokeWhite"
							}`}
							onClick={() =>
								setCurrentPage((prev) =>
									data.consultations && data.consultations.length === limit
										? prev + 1
										: prev
								)
							}
							disabled={data.consultations && data.consultations.length < limit}
						>
							<FaArrowRight />
						</button>
					</div>
				</section>
			</AccordionItem>
		</>
	);
};
