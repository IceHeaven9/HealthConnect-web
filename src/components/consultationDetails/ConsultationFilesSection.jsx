import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { TfiFiles } from "react-icons/tfi";

export const ConsultationFilesButton = ({
	setShowConsultationFiles,
	showConsultationFiles,
	consultationDetails,
}) => {
	return (
		<>
			<button
				className="mb-4 p-2 bg-[#628eff] w-full text-end text-white rounded-lg flex flex-col items-center font-medium"
				onClick={() => setShowConsultationFiles(!showConsultationFiles)}
			>
				{showConsultationFiles ? <IoMdClose /> : <TfiFiles size={30} />}{" "}
				Archivos
			</button>
			{showConsultationFiles && (
				<div className="bg-gray-100 p-4 rounded-lg shadow-md">
					<h3 className="text-xl font-semibold mb-2">Archivos:</h3>
					{consultationDetails.consultationFiles.map((file, index) => (
						<div key={index} className="mb-2">
							<img
								className="w-full h-auto"
								src={file.filePath}
								alt={file.fileName}
							/>
						</div>
					))}
				</div>
			)}
		</>
	);
};

ConsultationFilesButton.propTypes = {
	setShowConsultationFiles: PropTypes.func.isRequired,
	showConsultationFiles: PropTypes.bool.isRequired,
	consultationDetails: PropTypes.shape({
		consultationFiles: PropTypes.arrayOf(
			PropTypes.shape({
				filePath: PropTypes.string.isRequired,
				fileName: PropTypes.string.isRequired,
			})
		).isRequired,
	}).isRequired,
};
