import { useState, useEffect } from "react";
import { DinamicTitle } from "../components/DinamicTitle";
import { API_HOST, microCustomStyles, miniCustomStyles } from "../constants";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Modal from "react-modal";
import { IoClose } from 'react-icons/io5';

export const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorRating, setDoctorRating] = useState(0);  // Estado par
  const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para el modal

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${API_HOST}/doctors`, requestOptions)
      .then((response) => response.json())
      .then((result) => setDoctors(result))
      .catch((error) => console.error(error));
  };

  
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctorId(doctor.id);
    setSelectedDoctor(doctor);
    setDoctorRating(doctor.averageRating || 0);  // Establece el rating inicial
    setIsModalOpen(true);  // Abre el modal
  };

  const handleOnSearch = (string) => {
    if (string === "") {
      fetchDoctors();
    } else {
      const filteredDoctors = doctors.filter(
        (doctor) =>
          doctor.firstName.toLowerCase().includes(string.toLowerCase()) ||
          doctor.lastName.toLowerCase().includes(string.toLowerCase()) ||
          doctor.specialities.toLowerCase().includes(string.toLowerCase())
      );
      setDoctors(filteredDoctors);
    }
  };

  const handleOnSelect = (item) => {
    handleDoctorSelect(item);
  };

  const formatResult = (item) => {
    return (
      <div className="relative min-h-max z-50">
        <div className="flex flex-col p-2 m-1">
          <div className="flex items-center justify-between">
            <span className="font-ubuntu font-bold text-carbon text-sm">
              {item.firstName} {item.lastName}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="absolute top-0 z-10 w-full">
        <DinamicTitle text="Doctores" />
      </div>
      <div className="flex items-center justify-center mx-4 mt-20">
        <div className="max-w-full bg-lightCakeBlue rounded-2xl shadow-xl m-4 p-6 mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
          <section className="flex flex-col w-full rounded-t-xl bg-lightCakeBlue">
            <ReactSearchAutocomplete
              items={doctors}
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              autoFocus
              formatResult={formatResult}
              fuseOptions={{ keys: ["firstName", "lastName", "specialities"] }}
              resultStringKeyName="firstName"
              styling={{ zIndex: 0 }}
            />
          </section>
          <div className="flex flex-wrap justify-center gap-4 p-6 mx-auto mt-10">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white p-4 rounded-lg shadow-md w-60 flex flex-col items-center"
                onClick={() => handleDoctorSelect(doctor)}  // Maneja la selección del doctor
              >
                <img
                  src={doctor.avatar}
                  alt={doctor.firstName}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-bold">
                  {doctor.firstName} {doctor.lastName}
                </h3>
                <p className="text-sm ">{doctor.specialities}</p>
                <p className="text-sm">
                  Rating: {doctor.averageRating || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div></div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Doctor Biography"
        style={microCustomStyles}
      >
        {selectedDoctor && (
          
          <div className="bg-smokeWhite p-6 rounded-xl">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">
              {selectedDoctor.firstName} {selectedDoctor.lastName}
            </h2>
            <p>{selectedDoctor.biography}</p>
            <div className="flex items-center justify-center mt-4">
            <button
              className="mt-4 bg-lightBlue text-smokeWhite p-2 rounded-full"
              onClick={() => setIsModalOpen(false)}
            >
              
              <IoClose size={15}/>
            </button>
            </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};