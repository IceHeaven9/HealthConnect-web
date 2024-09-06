import PropTypes from "prop-types";
import { FaCloudUploadAlt } from "react-icons/fa";

export const DescriptionFormBottomSection = ({
	files,
	handleFileChange,
	previews,
}) => {
	return (
		<>
			<p className="font-medium mt-4  p-2">Imágenes:</p>
			<div className="border-[#cad6ff] border-[0.1rem] border-solid min-w-full h-max  rounded-xl grid grid-cols-5 gap-4">
				{files.length === 0 ? (
					<div className="flex items-center justify-center min-h-20 w-full text-7xl col-span-5"></div>
				) : (
					files.map(
						(file, index) =>
							file.type.startsWith("image/") && (
								<img
									key={index}
									src={previews[index]}
									alt="Preview"
									className="w-16 h-16 m-2 rounded-lg"
								/>
							)
					)
				)}
			</div>

			<p className="font-medium mt-4  p-2">Documentos:</p>
			<div className="border-[#cad6ff] p-2 gap-2 border-[0.1rem] border-solid min-w-full h-max mb-6 rounded-xl grid grid-cols-1 ">
				{files.filter((file) => !file.type.startsWith("image/")).length ===
				0 ? (
					<div className="flex items-center justify-center w-full h-full text-2xl p-2 font-medium"></div>
				) : (
					files.map(
						(file, index) =>
							!file.type.startsWith("image/") && (
								<div
									key={index}
									className="p-2 border border-gray-300 rounded-lg w-max text-sm text-nowrap"
								>
									<p>{file.name}</p>
								</div>
							)
					)
				)}
			</div>

			<div className="flex text-center justify-end w-full">
				<input
					aria-label="files"
					type="file"
					name="files"
					id="files"
					className="hidden"
					onChange={handleFileChange}
					multiple
				/>
				<label
					htmlFor="files"
					className="flex items-center justify-center gap-1 font-bold text-xl text-[#628eff] w-max h-10 bg-transparent transition-all duration-300 my-6 cursor-pointer"
				>
					<div className="text-3xl">
						<FaCloudUploadAlt />
					</div>{" "}
					Subir archivos
				</label>
			</div>
		</>
	);
};

DescriptionFormBottomSection.propTypes = {
	files: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleFileChange: PropTypes.func.isRequired,
	previews: PropTypes.arrayOf(PropTypes.string).isRequired,
};
