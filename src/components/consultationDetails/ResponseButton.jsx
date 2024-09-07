import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { FaLaptopMedical } from "react-icons/fa6";

export const ResponseButton = ({
	showResponseFiles,
	setShowResponseFiles,
	consultationDetails,
}) => {
	return (
		<>
			<button
				className="mb-4 p-2 bg-[#628eff] w-full text-end text-white rounded-lg flex flex-col items-center font-medium"
				onClick={() => setShowResponseFiles(!showResponseFiles)}
			>
				{showResponseFiles ? <IoMdClose /> : <FaLaptopMedical size={30} />}{" "}
				Respuesta
			</button>
			{showResponseFiles && (
				<div>
					<h2 className="text-xl font-semibold mb-2">RESPUESTA:</h2>
					<div>
						<p className="mb-2 w-full h-auto break-words">
							{consultationDetails.responseContent}
						</p>
						<div className="bg-gray-100 p-4 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-2">Archivos:</h3>
							{consultationDetails.responseFiles.map((file, index) => (
								<div key={index} className="mb-2">
									<img
										className="w-full h-auto"
										src={file.filePath}
										alt={file.fileName}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

ResponseButton.propTypes = {
	showResponseFiles: PropTypes.bool.isRequired,
	setShowResponseFiles: PropTypes.func.isRequired,
	consultationDetails: PropTypes.shape({
		responseContent: PropTypes.string,
		responseFiles: PropTypes.arrayOf(
			PropTypes.shape({
				filePath: PropTypes.string,
				fileName: PropTypes.string,
			})
		).isRequired,
	}).isRequired,
};
