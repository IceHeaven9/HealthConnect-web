import PropTypes from "prop-types";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import {API_HOST,  maxContent} from '../../constants';
import { useEffect, useState } from "react";

export const DoctorButton = ({
    setShowDoctor,
    showDoctor,
    consultationDetails,
}) => {
    const [isFirstOpen, setIsFirstOpen] = useState(true);
    const [doctorDetails, setDoctorDetails] = useState({});
		console.log(doctorDetails)

    useEffect(() => {
        if (showDoctor && isFirstOpen) {
            const requestOptions = { method: "GET", redirect: "follow" };
            fetch(`${API_HOST}/doctors/${consultationDetails.doctorId}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setDoctorDetails(result);
                    setIsFirstOpen(false);
                })
                .catch((error) => console.error(error));
        }
    }, [showDoctor, isFirstOpen, consultationDetails.doctorId]);

    const isDisabled = !consultationDetails.doctorName;

    return (
        <>
            <button
                className={`mb-4 p-2 w-full text-end text-smokeWhite rounded-lg flex flex-col items-center font-medium ${
                    isDisabled ? "bg-darkBlue" : "bg-lightBlue"
                }`}
                onClick={() => setShowDoctor(!showDoctor)}
                disabled={isDisabled}
            >
                {showDoctor ? <IoMdClose /> : <FaUserDoctor size={30} />}Doctor
            </button>
            <Modal
                isOpen={showDoctor}
                onRequestClose={() => setShowDoctor(false)}
                contentLabel="Doctor Details"
                style={maxContent}
            >
                <button className="text-2xl" onClick={() => setShowDoctor(false)}>
                    <IoMdClose />
                </button>
                <div className="flex flex-col items-center border-light border-solid border-[0.1rem] h-max rounded-xl mt-6 bg-smokeWhite">
                    <img
                        className="w-20 h-20 m-2 rounded-full mt-4"
                        src={doctorDetails.avatar}
                        alt="Avatar del doctor"
                    />
                    <div className="w-full gap-2 p-4">
                        <p className="text-2xl font-medium w-full h-auto break-words text-center">
                            {doctorDetails.fullName}
                        </p>
                        {doctorDetails && (
                            <div className="mt-4">
															   <div className=" border-t-[0.1rem] border-lightBlue border-solid my-2"></div>
                               <p className="text-start font-ubuntu font-bold " >{doctorDetails.biography}</p>
															 <div className=" border-t-[0.1rem] border-lightBlue border-solid my-2"></div>
															 <div className="flex justify-between my-4 ">
															 <p className="font-inter font-bold text-md  ">Años de Experiencia: {doctorDetails.experience}</p>
															 <p >{doctorDetails.averageRating}</p>
															 </div>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

DoctorButton.propTypes = {
    setShowDoctor: PropTypes.func.isRequired,
    showDoctor: PropTypes.bool.isRequired,
    consultationDetails: PropTypes.shape({
        doctorAvatar: PropTypes.string.isRequired,
        doctorName: PropTypes.string.isRequired,
        doctorId: PropTypes.number.isRequired,
    }).isRequired,
};