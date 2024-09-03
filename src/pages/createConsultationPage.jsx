import { useState } from "react";
import Calendar from "react-calendar";
import { FcOpenedFolder } from "react-icons/fc";
import { GrAdd } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";
import 'react-calendar/dist/Calendar.css';

export const CreateConsultationPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([
    "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"
  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // actualizar las horas disponibles según la fecha seleccionada

		//  consultar base de datos para obtener las horas disponibles en esa fecha:
		// setAvailableTimes(getAvailableTimesForDate(selectedDate));
  };

  return (
	<main>
	<div className="flex text-center p-6 text-[#628eff] font-bold text-2xl w-full mt-6">
	    <button className="w-max"> <IoMdArrowRoundBack/></button>
      <h1 className="w-full">Nueva Consulta</h1>
	</div>
<section className="bg-[#cad6ff] flex flex-col items-center"> 
<button className="flex flex-row text-xl font-medium text-[#2260ff] items-center justify-center rounded-2xl gap-2 w-[90%] py-2 px-4 mt-6 mb-2 bg-[#fbf8f8]">Selecciona una Especialidad<GrAdd /></button>
<button className="flex flex-row text-xl font-medium text-[#2260ff] items-center justify-center rounded-2xl gap-2 w-[90%] py-2 px-4 mb-6 mt-2 bg-[#fbf8f8]">Selecciona un Doctor<GrAdd /></button>
</section>
    <section className="flex flex-col items-center justify-center w-full">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
      <h2 className="p-4 mt-2 text-[#628eff] font-medium">Horas disponibles para {selectedDate.toLocaleDateString('es-ES')}:</h2>
			<section className="w-full">
      <ul className="grid grid-cols-5 auto-rows-auto justify-items-center gap-2 px-4 py-2.5 w-full">
        {availableTimes.map((time, index) => (
          <li className=" p-2 text-xs  bg-[#e0e4f2] rounded-3xl text-[#809cff] w-max" key={index}><p>{time}</p></li>
        ))}
      </ul>
			</section>
			<div className="border-t-[0.1rem] border-solid border-[#628eff] w-[90%] mt-4 mb-2"></div>
    </section>
		<form className="flex flex-col items-start justify-center mx-4 ">
		<label className="text-sm text-[#111827] p-1">Motivo de la consulta</label> 
			<textarea className="border-[0.1rem] border-solid border-[#cad6ff] w-full rounded-2xl h-44 pl-4 p-2" name="descripcion" placeholder="Escribe tu problema aqui..." required></textarea>
			<div className="flex text-center justify-end w-full">
			<button className="flex items-center justify-center gap-1 font-bold text-lg text-[#628eff] w-max h-10 bg-transparent hover:bg-[#4f6482] transition-all duration-300 mb-4" type="submit">Subir archivos<FcOpenedFolder /></button>
			</div>
		</form>
		</main>
  );
};