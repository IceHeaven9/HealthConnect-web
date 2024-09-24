import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";

export const UpFilesImageSection = ({ selectedFiles, handleRemoveFile }) => {
	return (
		<>
			<h3 className="text-2xl text-carbon font-semibold mb-2">Imágenes</h3>
			<div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
			<div className="grid grid-cols-3 auto-rows-auto w-full justify-items-center h-max ">
				{selectedFiles.filter((file) =>
					file.name.match(/\.(jpeg|jpg|webp|png)$/)
				).length > 0 ? (
					selectedFiles
						.filter((file) => file.name.match(/\.(jpeg|jpg|webp|png)$/))
						.map((file, index) => (
							<div key={index} className="w-full relative">
								<img
									className="w-20 mx-auto h-20 rounded-md border-solid border-lightBlue border-[0.1rem]"
									src={URL.createObjectURL(file)}
									alt={file.name}
								/>
								<button
									className="absolute top-0 right-3 bg-red-500 text-smokeWhite rounded-full p-1"
									onClick={() => handleRemoveFile(index)}
								>
									<IoMdClose size={15} />
								</button>
							</div>
						))
				) : (
					<p className="font-inter font-medium text-md text-carbon text-center w-full col-span-3 py-2">
						No hay imágenes
					</p>
				)}
			</div>
		</>
	);
};

UpFilesImageSection.propTypes = {
	selectedFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleRemoveFile: PropTypes.func.isRequired,
};
