import { API_HOST } from "../../../constants";
import PropTypes from "prop-types";

export const FilesImageSection = ({ consultationDetails }) => {
	return (
		<>
			<div className="grid grid-cols-3 auto-rows-auto w-full justify-items-center h-max ">
				{consultationDetails.responseFiles &&
				consultationDetails.responseFiles.filter(
					(file) =>
						file.filePath.match(/\.(jpeg|jpg|webp|png)$/) ||
						file.filePath.includes("i.pravatar.cc")
				).length > 0 ? (
					consultationDetails.responseFiles
						.filter(
							(file) =>
								file.filePath.match(/\.(jpeg|jpg|webp|png)$/) ||
								file.filePath.includes("i.pravatar.cc")
						)
						.map((file, index) => (
							<div key={index} className="w-full">
								<img
									className="w-20 mx-auto h-auto rounded-md border-solid border-lightBlue border-[0.1rem]"
									src={`${API_HOST}/responseFiles/${file.filePath.replace(
										/^.*[\\/]/,
										""
									)}`}
									alt={file.fileName}
								/>
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

FilesImageSection.propTypes = {
	consultationDetails: PropTypes.shape({
		responseFiles: PropTypes.arrayOf(
			PropTypes.shape({
				filePath: PropTypes.string.isRequired,
				fileName: PropTypes.string.isRequired,
			})
		),
	}).isRequired,
};
