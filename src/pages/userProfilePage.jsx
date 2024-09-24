import { useContext, useEffect, useState } from "react";
import { DinamicTitle } from "../components/DinamicTitle";
import { AuthContext } from "./../contexts/authContext";
import { useAuthGuard } from "./../hooks/authGuard";
import { ToastContainer } from "react-toastify";
import { ProfileImageUploader } from "../components/profile/ProfileImageUploader";
import { ProfileForm } from "../components/profile/ProfileForm";
import { API_HOST } from "../constants";

export const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const token = currentUser?.coded;
  const userType = currentUser?.decoded.userType;

  const [image, setImage] = useState(currentUser?.decoded.avatar);
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
      })
      .catch((error) => console.error(error));
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
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setIsEditing(false);
      })
      .catch((error) => console.error(error));
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

<<<<<<< HEAD
  // Función para cambiar el estado de edición
  const handleEditProfile = () => {
    setIsEditing(!isEditing); // Cambiar entre modo de edición y modo de visualización
  };

=======
>>>>>>> 9cfc393 (arreglos)
  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      <div className="absolute top-0 z-10 w-full">
        <DinamicTitle text="Mi perfil" />
      </div>
      <div className="flex items-center justify-center m-auto mx-4 mt-20 w-full">
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
                experience={experience}
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
