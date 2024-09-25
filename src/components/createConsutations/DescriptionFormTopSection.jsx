import PropTypes from "prop-types";

export const DescriptionFormTopSection = ({
	setTextinput,
	setTitle,
	title,
	textinput,
}) => {
	return (
		<>
			<label htmlFor="title" className=" font-medium p-2">
				Título:
			</label>
			<input
				aria-label="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Titulo de la consulta"
				className="border-[0.1rem] border-solid border-light w-full rounded-2xl pl-4 p-2 outline-none"
				id="title"
				name="title"
				type="text"
			/>

			<label className="text-md text-[#111827] p-2 font-medium">
				Motivo de la consulta:
			</label>
			<textarea
				value={textinput}
				onChange={(e) => setTextinput(e.target.value)}
				className="border-[0.1rem] border-solid border-light w-full rounded-2xl h-72 pl-4 p-2 outline-none"
				name="descripcion"
				placeholder="Describe tu problema..."
				required
			></textarea>
		</>
	);
};

DescriptionFormTopSection.propTypes = {
	setTextinput: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	textinput: PropTypes.string.isRequired,
};
