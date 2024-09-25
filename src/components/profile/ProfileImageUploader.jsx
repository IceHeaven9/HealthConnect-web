import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { API_HOST } from "../../constants";
import { notify } from "../../utils/notify";
import PropTypes from "prop-types";

export const ProfileImageUploader = ({
  currentUser,
  token,
  image,
  setImage,
  name,
  lastName,
}) => {
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  const handleSaveImage = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const formData = new FormData();
    formData.append("avatarFile", imageFile);

    fetch(`${API_HOST}/profile/${currentUser.decoded.id}/avatar`, {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "error") {
          console.error(result.message);
        } else {
          notify(result.message);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mt-4">
        <img
          src={image || "public/images/defaultAvatar.jpg"}
          alt="Profile"
          className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44 object-cover rounded-full border-4 border-white shadow-md"
        />
        <label
          htmlFor="upload"
          className={`bg-blue-500 text-white rounded-full p-1 sm:p-2 lg:p-3 xl:p-4 cursor-pointer absolute bottom-0 right-0 ${
            imageFile ? "hidden" : ""
          }`}
        >
          <input
            id="upload"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
          <CiEdit />
        </label>
        {imageFile && (
          <button
            className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 sm:p-2 lg:p-3 xl:p-4 cursor-pointer"
            onClick={() => {
              handleSaveImage();
              setImageFile(null);
            }}
          >
            <FaSave />
          </button>
        )}
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-lightBlue">
        {name} {lastName}
      </h2>
    </div>
  );
};
ProfileImageUploader.propTypes = {
  currentUser: PropTypes.shape({
    decoded: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  image: PropTypes.string,
  setImage: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};
