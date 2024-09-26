import PropTypes from "prop-types";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { API_HOST, microCustomStyles } from "../../constants";
import { StarRating } from "./StarRating";
import { sendRating } from "./fetch/sendRating";
import {notify} from '../../utils/notify';

export const DoctorButton = ({
  setShowDoctor,
  showDoctor,
  consultationDetails,
  currentUser,
}) => {
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [rating, setRating] = useState(consultationDetails.rating);
  const token = currentUser?.coded;

  const handleRating = async (newRating) => {
    if (!consultationDetails.id) {
      notify("Error: consultationId no está definido");
      return;
    }

    try {
      await sendRating(consultationDetails.id, newRating, token);
      setRating(newRating);
    } catch (error) {
      notify( error.message);
    }
  };

  useEffect(() => {
    if (showDoctor && isFirstOpen) {
      const requestOptions = { method: "GET", redirect: "follow" };
      fetch(
        `${API_HOST}/doctors/${consultationDetails.doctorId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setDoctorDetails(result);
          setIsFirstOpen(false);
        })
        .catch((error) =>notify(error));
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
        style={microCustomStyles}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <img
              className="w-20 h-20 rounded-full mt-4"
              src={doctorDetails.avatar}
              alt="Avatar del doctor"
            />
            <p className="text-2xl font-medium mb-4 w-full h-auto break-words text-center">
              {doctorDetails.fullName}
            </p>
          </div>
          <div className="w-full gap-2 p-4 bg-smokeWhite rounded-xl">
            {doctorDetails && (
              <div className="mt-4">
                <div className=" border-t-[0.1rem] border-lightBlue border-solid my-2"></div>
                <p className="text-start font-ubuntu font-bold text-lg">
                  {doctorDetails.biography}
                </p>
                <div className=" border-t-[0.1rem] border-lightBlue border-solid my-2"></div>
                <div className="flex items-center justify-between my-4 ">
                  <p className="font-inter font-bold text-md  ">
                    Años de Experiencia: {doctorDetails.experience}
                  </p>
                  <StarRating
                    handleRating={handleRating}
                    consultationDetails={consultationDetails}
                    currentUser={currentUser}
                  />
                </div>
              </div>
            )}
          </div>
          <button
            className="text-3xl rounded-full mt-4 bg-smokeWhite text-lightBlue p-2"
            onClick={() => setShowDoctor(false)}
          >
            <IoMdClose />
          </button>
        </div>
      </Modal>
    </>
  );
};

DoctorButton.propTypes = {
  setShowDoctor: PropTypes.func.isRequired,
  showDoctor: PropTypes.bool.isRequired,
  consultationDetails: PropTypes.shape({
    doctorAvatar: PropTypes.string,
    doctorName: PropTypes.string,
    doctorId: PropTypes.number,
    rating: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  currentUser: PropTypes.shape({
    coded: PropTypes.string,
  }),
};
