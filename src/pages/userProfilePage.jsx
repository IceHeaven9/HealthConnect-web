import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../contexts/authContext";
import { useAuthGuard } from "./../hooks/authGuard";
import { ToastContainer } from "react-toastify";
import { ProfileImageUploader } from "../components/profile/ProfileImageUploader";
import { ProfileForm } from "../components/profile/ProfileForm";
import { API_HOST } from "../constants";
import { notify } from "../utils/notify";
import { Header } from "../components/Header";

export const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const token = currentUser?.coded;
  const userType = currentUser?.decoded.userType;

  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(currentUser?.decoded.userName);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [biography, setBiography] = useState("");
  const [experience, setExperience] = useState("");

  useAuthGuard("/profile");

  const fetchProfile = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    fetch(`${API_HOST}/profile`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        const profile = result[0];
        setName(profile.firstName);
        setLastName(profile.lastName);
        setEmail(profile.email);
        setBiography(profile.biography);
        setExperience(profile.experience);
        setUserName(profile.userName);
        setImage(profile.avatar);
      })
      .catch((error) => notify(error.message));
  };

  const updateProfile = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstName: name,
      lastName: lastName,
      userName: userName,
      email: email,
      biography: biography,
      experience: experience,
    });

    fetch(`${API_HOST}/profile/${currentUser.decoded.id}`, {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        notify(result.message);
        setIsEditing(false);
      })
      .catch((error) => notify(error));
  };

  const handleEditProfile = () => {
    if (isEditing) {
      updateProfile();
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      <div className="absolute top-0 z-10 w-full">
        <Header title="Mi Perfil" showBackButton={true} />
      </div>
      <div className="flex items-center justify-center m-auto mx-4 mt-32 w-full">
        <div className="bg-lightCakeBlue rounded-2xl shadow-xl m-4 p-6 w-full sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
          <main className="bg-smokeWhite rounded-lg">
            <ProfileImageUploader
              currentUser={currentUser}
              token={token}
              image={image}
              setImage={setImage}
              name={name}
              lastName={lastName}
            />
            <div className="flex flex-col items-center justify-center w-full p-6 rounded-lg bg-gray-100">
              <ProfileForm
                isEditing={isEditing}
                userType={userType}
                userName={userName}
                setUserName={setUserName}
                name={name}
                setName={setName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                biography={biography}
                setBiography={setBiography}
                experience={Number(experience)}
                setExperience={setExperience}
              />
              <button
                onClick={handleEditProfile}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl"
              >
                {isEditing ? "Guardar Cambios" : "Editar Perfil"}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
