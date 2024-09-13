import { IoMdArrowRoundBack } from "react-icons/io";

export const SearchBar = () => {
	return (
		<>
			<div className="flex items-center justify-start text-center text-lightBlue h-min p-4 mt-1 mb-4">
				<button className="text-center pr-12">
					<IoMdArrowRoundBack size={30} />
				</button>
				<p className="text-4xl font-bold font-roboto mt-1"> Mis consultas</p>
			</div>
			<div className="flex justify-center relative">
				<input
					type="text"
					placeholder="Buscar consulta..."
					className="bg-lightCakeBlue  rounded-xl p-2 w-full mb-10 mx-4 outline-none pl-10 shadow-xl placeholder-lightBlue"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="absolute left-7 top-5 transform -translate-y-1/2 text-lightBlue"
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
		</>
	);
};
