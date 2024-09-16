import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { FaLaptopMedical, FaPlus } from "react-icons/fa6";
import Modal from "react-modal";
import { consultationsFilesModal } from "../../constants";
import { AuthContext } from "../../contexts/authContext";
import { useContext, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { MdAddComment } from "react-icons/md";
import { RiFolderAddFill } from "react-icons/ri";
export const ResponseButton = ({
	showResponseFiles,
	setShowResponseFiles,
	consultationDetails,
}) => {
	const { currentUser } = useContext(AuthContext);
	const [isEditing, setIsEditing] = useState(false);
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [responseContent, setResponseContent] = useState(
		consultationDetails.responseContent || ""
	);

	const handleRemoveFile = (index) => {
		setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const isDisabled =
		currentUser.decoded.userType === "patient" &&
		!consultationDetails.responseContent &&
		(!consultationDetails.responseFiles ||
			consultationDetails.responseFiles.length === 0);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		// Logic to save the response content
		setIsEditing(false);
	};
	const handleFileUpload = (e, fileType) => {
		const files = Array.from(e.target.files);
		setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
	};
	return (
		<>
			<button
				className={`mb-4 p-2 w-full text-end text-smokeWhite rounded-lg flex flex-col items-center font-medium ${
					isDisabled ? "bg-darkBlue" : "bg-lightBlue"
				}`}
				onClick={() => setShowResponseFiles(!showResponseFiles)}
				disabled={isDisabled}
			>
				{showResponseFiles ? <IoMdClose /> : <FaLaptopMedical size={30} />}{" "}
				Respuesta
			</button>
			<Modal
				isOpen={showResponseFiles}
				onRequestClose={() => setShowResponseFiles(false)}
				contentLabel="Response Files"
				style={consultationsFilesModal}
			>
				<div className="w-full flex flex-col ">
					<div className="flex justify-between items-center">
					<h2 className="text-xl font-bold my-2 text-carbon p-2">
                            RESPUESTA:
                        </h2>
                        {currentUser.decoded.userType === "doctor" && (
                            <div className="">
                                {isEditing ? (
                                    <button
                                        className="bg-green-500 p-2 rounded-lg text-smokeWhite ml-2"
                                        onClick={handleSaveClick}
                                    >
                                        <FaSave size={25} />
                                    </button>
                                ) : consultationDetails.responseContent ? (
                                    <button
                                        className="bg-warning p-2 rounded-lg text-smokeWhite"
                                        onClick={handleEditClick}
                                    >
                                        <FaEdit size={25} />
                                    </button>
                                ) : (
                                    <button
                                        className="bg-lightBlue p-2 rounded-lg text-smokeWhite"
                                        onClick={handleEditClick}
                                    >
                                        <MdAddComment size={25} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="w-full">
                        {isEditing ? (
                            <textarea
                                className="mb-2 w-full h-max font-ubuntu font-bold text-md p-2 min-h-40 break-words rounded-xl"
                                value={responseContent}
                                onChange={(e) => setResponseContent(e.target.value)}
                            />
                        ) : responseContent ? (
                            <p className="mb-2 w-full h-max font-ubuntu font-bold text-md p-2 min-h-40 break-words">
                                {responseContent}
                            </p>
                        ) : (
                            <p className="mb-2 w-full h-max font-ubuntu font-bold text-md p-2 min-h-40 break-words">
                                No hay respuesta
                            </p>
                        )}
					</div>
					<div className="bg-smokeWhite p-4 rounded-lg shadow-md w-full">
						<div className="flex justify-between items-center">
							<h3 className="text-2xl text-lightBlue font-semibold mb-2 ">
								Archivos:
							</h3>
							{currentUser.decoded.userType === "doctor" && (
								<>
									<button
										className="bg-lightBlue p-2 rounded-lg text-smokeWhite"
										onClick={() => setShowUploadModal(true)}
									>
										<RiFolderAddFill size={25} />
									</button>
									<Modal
										isOpen={showUploadModal}
										onRequestClose={() => setShowUploadModal(false)}
										contentLabel="Upload Files"
										style={consultationsFilesModal}
									>
										<div className="w-full flex flex-col">
											<div className="flex items-center justify-between">
												<h2 className="text-2xl font-bold font-roboto my-2 text-lightBlue p-2">
													Subir Archivos
												</h2>
												<label
													htmlFor="file-upload"
													className="cursor-pointer m-2 rounded-full text-lightBlue shadow-xl active:scale-95 transition-transform transform bg-smokeWhite p-2"
												>
													<FaPlus size={25} />
												</label>
												<input
													id="file-upload"
													type="file"
													multiple
													onChange={(e) => handleFileUpload(e, "responseFiles")}
													className="hidden"
												/>
											</div>
											<div className="w-full mt-4">
												<div className="bg-smokeWhite p-4 rounded-xl shadow-xl ">
													<h3 className="text-2xl text-carbon font-semibold mb-2">
														Imágenes
													</h3>
													<div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
													<div className="grid grid-cols-3 auto-rows-auto w-full justify-items-center h-max ">
														{selectedFiles.filter((file) =>
															file.name.match(/\.(jpeg|jpg|webp|png)$/)
														).length > 0 ? (
															selectedFiles
																.filter((file) =>
																	file.name.match(/\.(jpeg|jpg|webp|png)$/)
																)
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
													<div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
													<h3 className="text-2xl text-carbon font-semibold mb-2 mt-4">
														Documentos
													</h3>
													<div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
													<div className="w-full">
														{selectedFiles.filter(
															(file) =>
																!file.name.match(/\.(jpeg|jpg|webp|png)$/)
														).length > 0 ? (
															selectedFiles
																.filter(
																	(file) =>
																		!file.name.match(/\.(jpeg|jpg|webp|png)$/)
																)
																.map((file, index) => (
																	<div
																		key={index}
																		className="bg-lightBlue border-[0.1rem] border-solid border-lightBlue w-full p-2 rounded-lg mb-2 relative"
																	>
																		<p className="font-inter font-medium text-md text-smokeWhite">
																			{file.name}
																		</p>
																		<button
																			className="absolute top-2 right-1 bg-red-500 text-smokeWhite rounded-full p-1"
																			onClick={() => handleRemoveFile(index)}
																		>
																			<IoMdClose size={15} />
																		</button>
																	</div>
																))
														) : (
															<p className="font-inter font-medium text-md text-carbon text-center w-full col-span-3 py-2">
																No hay documentos
															</p>
														)}
													</div>
													<div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
												</div>
											</div>
											<div className="flex items-center justify-center w-full mt-4">
												<button
													className="bg-smokeWhite p-2 rounded-full text-lightBlue shadow-xl active:scale-95 transition-transform transform"
													onClick={() => setShowUploadModal(false)}
												>
													<IoMdClose size={30} />
												</button>
											</div>
										</div>
									</Modal>
								</>
							)}
						</div>
						<div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
						<div className="grid grid-cols-3 auto-rows-auto w-full justify-items-center h-max ">
							{consultationDetails.responseFiles.filter(
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
												src={file.filePath}
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
						<div className="w-full border-t-[0.1rem] border-solid border-lightBlue my-2 "></div>
						<div className="w-full">
							{consultationDetails.responseFiles.filter(
								(file) => !file.filePath.match(/\.(jpeg|jpg|gif|png)$/)
							).length > 0 ? (
								consultationDetails.responseFiles
									.filter(
										(file) => !file.filePath.match(/\.(jpeg|jpg|gif|png)$/)
									)
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
					</div>
				</div>
				<div className="flex items-center justify-center w-full mt-4 ">
					<button
						className="bg-smokeWhite p-2 rounded-full text-lightBlue  shadow-xl active:scale-95 transition-transform transform"
						onClick={() => setShowResponseFiles(false)}
					>
						<IoMdClose size={30} />
					</button>
				</div>
			</Modal>
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
