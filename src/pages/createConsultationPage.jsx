import Calendar from "react-calendar";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import {SpecialtiesModal} from '../components/createConsutations/SpecialtiesModal';
import {DoctorsModal} from '../components/createConsutations/DoctorsModal';
import { customStyles } from "../constants";
import {AviableTimes} from '../components/createConsutations/AviableTimes';
import 'react-calendar/dist/Calendar.css';
import { DescriptionForm } from './../components/createConsutations/DescriptionForm';

Modal.setAppElement('#root');

export const CreateConsultationPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [specialtyModalIsOpen, specialtyModaSetIsOpen] = useState(false);
  const [doctorsModalIsOpen, doctorsModaSetIsOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchAvailableTimes = (date, specialtyId, doctor) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0];
    let url = `http://localhost:3000/availability?specialityId=${specialtyId}&date=${formattedDate}`;
    if (doctor) {
      url += `&doctorId=${doctor.id}`;
    }
  
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
  
    fetch(url, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setAvailableTimes(Array.isArray(result) ? result : []);
      })
      .catch((error) => {
        console.error(error);
        setAvailableTimes([]);
      });
  };

  useEffect(() => {
    if (selectedSpecialty) {
      fetchAvailableTimes(selectedDate, selectedSpecialty, selectedDoctor);
    }
  }, [selectedSpecialty, selectedDoctor, selectedDate]);

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty);
    setSelectedDoctor(null); // Vaciar la variable del doctor
  };

  if (showDescriptionForm) {
    return <DescriptionForm 
    selectedDate={selectedDate}
    selectedSpecialty={selectedSpecialty}
    selectedDoctor={selectedDoctor}
    selectedHour={selectedHour}
     />;
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex text-center p-6 text-[#628eff] font-bold text-2xl w-full mt-6">
        <button className="w-max"> <IoMdArrowRoundBack /></button>
        <h1 className="w-full">Nueva Consulta</h1>
      </div>
      
      <section className="bg-[#cad6ff] flex flex-col items-center w-full">
        <SpecialtiesModal
          setSelectedSpecialty={handleSpecialtyChange}
          specialtyModaSetIsOpen={specialtyModaSetIsOpen}
          setSpecialties={setSpecialties}
          selectedSpecialty={selectedSpecialty}
          specialties={specialties}
          specialtyModalIsOpen={specialtyModalIsOpen}
          customStyles={customStyles}
        />
        <DoctorsModal
          doctorsModaSetIsOpen={doctorsModaSetIsOpen}
          setDoctors={setDoctors}
          selectedDoctor={selectedDoctor}
          doctorsModalIsOpen={doctorsModalIsOpen}
          customStyles={customStyles}
          doctors={doctors}
          setSelectedDoctor={setSelectedDoctor}
          selectedSpecialty={selectedSpecialty}
        />
      </section>
      <section className="flex flex-col items-center justify-center w-full bg-[#cad6ff]">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </section>
      <h2 className='text-center text-xl font-medium text-[#628eff] my-4'>Horas disponibles para el dia {selectedDate.toLocaleDateString("es-ES")}</h2>
      <section className="bg-[#cad6ff] w-full">
        
      <AviableTimes
      selectedDoctor={selectedDoctor}
        availableTimes={availableTimes}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
      />
      </section>
      <div className="flex flex-row items-center justify-center my-6 rounded-xl text-white text-xl w-[90%] p-4 font-medium bg-[#628eff]">
     <button onClick={() => setShowDescriptionForm(true)} disabled={!selectedSpecialty || !selectedHour}>Continuar</button>
     </div>
    </main>
  );
};