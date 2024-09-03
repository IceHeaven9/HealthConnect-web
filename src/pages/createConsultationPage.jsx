import { useState } from "react";
import Calendar from "react-calendar";
import { FcOpenedFolder } from "react-icons/fc";
import { IoMdArrowRoundBack } from "react-icons/io";
import Modal from 'react-modal';
import {SpecialtiesModal} from '../components/createConsutations/SpecialtiesModal';
import {DoctorsModal} from '../components/createConsutations/DoctorsModal';
import 'react-calendar/dist/Calendar.css';
import { customStyles } from "../constants";
import {DescriptionForm} from '../components/createConsutations/DescriptionForm';
import {AviableTimes} from '../components/createConsutations/AviableTimes';

Modal.setAppElement('#root');

export const CreateConsultationPage = () => {
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      // actualizar las horas disponibles según la fecha seleccionada
  
      //  consultar base de datos para obtener las horas disponibles en esa fecha:
      // setAvailableTimes(getAvailableTimesForDate(selectedDate));
    };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [specialtyModalIsOpen, specialtyModaSetIsOpen] = useState(false);
  const [doctorsModalIsOpen, doctorsModaSetIsOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([
    "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"
  ]);



  return (
	<main>
	<div className="flex text-center p-6 text-[#628eff] font-bold text-2xl w-full mt-6">
	    <button className="w-max"> <IoMdArrowRoundBack/></button>
      <h1 className="w-full">Nueva Consulta</h1>
	</div>
<section className="bg-[#cad6ff] flex flex-col items-center w-full"> 
<SpecialtiesModal 
  setSelectedSpecialty={setSelectedSpecialty}
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
  selectedSpecialty={selectedSpecialty} // Asegúrate de pasar esta prop
/>
</section>
    <section className="flex flex-col items-center justify-center w-full bg-[#cad6ff]">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
    </section>
    <AviableTimes
  selectedDate={selectedDate}
  availableTimes={availableTimes}
/>
		<DescriptionForm/>
		</main>
  );
};