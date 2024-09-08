// utils/userTypeHandler.js
export const handleUserTypeChange = async (type, setUserType, setDoctorCode, setExperience, setBio, setSpecialties) => {
  setUserType(type);
  if (type === "Patient") {
      setDoctorCode("");
      setExperience("");
      setBio("");
  } else if (type === "Doctor") {
      try {
          const response = await fetch("http://localhost:3000/specialities");
          const data = await response.json();
          setSpecialties(data);
      } catch (error) {
          console.error("Error fetching specialties", error);
      }
  }
};