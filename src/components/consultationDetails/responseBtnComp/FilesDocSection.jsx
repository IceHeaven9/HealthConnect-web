import PropTypes from "prop-types";

export const FilesDocSection = ({ consultationDetails }) => {
	return (
		<>
			<div className="w-full">
				{consultationDetails.responseFiles &&
				consultationDetails.responseFiles.filter(
					(file) => !file.filePath.match(/\.(jpeg|jpg|webp|png)$/)
				).length > 0 ? (
					consultationDetails.responseFiles
						.filter((file) => !file.filePath.match(/\.(jpeg|jpg|webp|png)$/))
						.map((file, index) => (
							<div
								key={index}
								className="bg-lightBlue border-[0.1rem] border-solid border-lightBlue w-full p-2 rounded-lg mb-2"
							>
								<p className="font-inter font-medium text-md text-smokeWhite">
									{file.fileName}
								</p>
							</div>
						))
				) : (
					<p className="font-inter font-medium text-md text-carbon text-center py-2">
						No hay documentos
					</p>
				)}
			</div>
		</>
	);
};

FilesDocSection.propTypes = {
	consultationDetails: PropTypes.shape({
		responseFiles: PropTypes.arrayOf(
			PropTypes.shape({
				filePath: PropTypes.string.isRequired,
				fileName: PropTypes.string.isRequired,
			})
		),
	}).isRequired,
};
