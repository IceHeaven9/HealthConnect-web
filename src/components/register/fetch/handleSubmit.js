// utils/formHandlers.js
export const handleSubmit = async (e, name, lastName, email, username, password, userType, doctorCode, experience, bio, selectedSpecialties) => {
  e.preventDefault();

  const userData = {
      firstName: name,
      lastName,
      email,
      userName: username,
      password,
      userType: userType.toLowerCase(),
      codigoMedico: userType === "Doctor" ? doctorCode : undefined,
      experience: userType === "Doctor" ? experience : null,
      biography: userType === "Doctor" ? bio : "null",
      specialityId:
          userType === "Doctor"
              ? selectedSpecialties.map((id) => parseInt(id, 10))
              : undefined,
  };

  try {
      const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (!response.ok) {
          throw new Error("Error al registrarse.");
      }

      console.log("Usuario registrado correctamente.");
  } catch (err) {
      console.error(err);
  }
};