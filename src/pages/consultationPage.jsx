import { ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

export const ConsultationPage = () => {
	return (
		<main className="w-full mb-20">
			<HamburgerMenu />
			<div className="h-min w-max pl-4 pr-4 pt-1 text-lightBlue"></div>
			<div className="flex items-center justify-start text-center text-lightBlue h-min p-4 mb-4">
				<ToastContainer />
				<button className="text-center pr-12">
					<IoMdArrowRoundBack size={30} />
				</button>
				<p className="text-4xl font-bold font-roboto mt-1"> Mis consultas</p>
			</div>
			<div className="flex justify-center relative">
				<input
					type="text"
					placeholder="Buscar consulta..."
					className="bg-lightCakeBlue rounded-xl p-2 w-full mb-10 mx-4 outline-none pl-10 shadow-xl"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="absolute left-7 top-5 transform -translate-y-1/2 text-gray-400"
					width="20"
					height="20"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
			</div>

			<div className="border rounded-xl bg-smokeWhites mx-4 bg-light shadow-xl mb-8">
				<Accordion>
					<AccordionItem
						header={
							<div className="flex rounded-t-lg justify-between font-inter font-bold text-lightBlue bg-smokeWhite w-full p-3">
								<div className="w-full text-center h-max text-lg ">
									AÚN SIN RESPUESTA
								</div>
								<IoIosArrowDown size={25} />
							</div>
						}
					>
						<section className="w-full">
							<article>
								<div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
									<div className="flex flex-col p-8">
										<div className="text-lg font-bold   text-[#374151] pb-6">
											02/09/2024
										</div>
										<div className=" text-sm   text-[#374151]">
											Titulo de consulta
										</div>
										<div className="flex justify-end pt-6">
											<button className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform">
												Ver Ficha
											</button>
										</div>
									</div>
								</div>
							</article>
						</section>
					</AccordionItem>
					<div className=" border-t-[0.1rem] border-lightBlue border-solid"></div>
					<AccordionItem
						header={
							<div className="flex justify-between bg-smokeWhite font-inter font-bold text-lightBlue w-full p-3">
								<div className="w-full text-center  h-max text-lg font-ubuntu ">
									PROXIMAS CONSULTAS
								</div>
								<IoIosArrowDown size={25} />
							</div>
						}
					>
						<section className="w-full">
							<article>
								<div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
									<div className="flex flex-col p-8">
										<div className="text-lg font-bold   text-[#374151] pb-6">
											02/09/2024
										</div>
										<div className=" text-sm   text-[#374151]">
											Titulo de consulta
										</div>
										<div className="flex justify-end pt-6">
											<button className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform">
												Ver Ficha
											</button>
										</div>
									</div>
								</div>
							</article>
						</section>
					</AccordionItem>
					<div className=" border-t-[0.1rem] border-lightBlue border-solid"></div>
					<AccordionItem
						header={
							<div className="flex justify-between bg-smokeWhite font-inter font-bold text-lightBlue w-full p-3">
								<div className="w-full text-center h-max text-lg font-ubuntu  ">
									CONSULTAS FINALIZADAS{" "}
								</div>
								<IoIosArrowDown size={25} />
							</div>
						}
					>
					<section className="w-full">
							<article>
								<div className="flex flex-col rounded-2xl m-6 bg-smokeWhite shadow-xl">
									<div className="flex flex-col p-8">
										<div className="text-lg font-bold   text-[#374151] pb-6">
											02/09/2024
										</div>
										<div className=" text-sm   text-[#374151]">
											Titulo de consulta
										</div>
										<div className="flex justify-end pt-6">
											<button className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform">
												Ver Ficha
											</button>
										</div>
									</div>
								</div>
							</article>
						</section>
					</AccordionItem>
					<div className=" border-t-[0.1rem] border-lightBlue border-solid"></div>
				</Accordion>
			</div>
			<div className="flex  mx-4 mb-48 md:mb-[27rem] gap-2">
				<Link to="/create-consultation" className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform">
					Añadir nueva consulta
				</Link>
				<button className="bg-[#628eff] text-[#f5f5f5] w-full font-bold text-base p-2 rounded-lg active:scale-95 transition-transform transform">
					{" "}
					Historial de consultas
				</button>
			</div>
		</main>
	);
};
