import { API_HOST } from "../../../constants";
import { notify } from "../../../utils/notify";
export const handleSubmit = async (
  e,
  name,
  lastName,
  email,
  username,
  password,
  userType,
  doctorCode,
  experience,
  bio,
  selectedSpecialties,
  navigate,
) => {
  e.preventDefault();

  const userData = {
    firstName: name,
    lastName,
    email,
    userName: username,
    password,
    userType: userType.toLowerCase(),
    codigoMedico: userType === "Doctor" ? doctorCode : undefined,
    experience: userType === "Doctor" ? Number(experience) : undefined,
    biography: userType === "Doctor" ? bio : "null",
    specialityId:
      userType === "Doctor"
        ? selectedSpecialties.map((id) => parseInt(id, 10))
        : undefined,
  };

  try {
    const response = await fetch(`${API_HOST}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Error al registrarse.");
    }

    notify(
      "Te has registrado correctamente, se te ha enviado un correo para verificar la cuenta",
    );

    setTimeout(() => {
      navigate("/validate-email");
    }, 3000);
  } catch (err) {
    notify(err.message || "Ocurrió un error.");
  }
};
