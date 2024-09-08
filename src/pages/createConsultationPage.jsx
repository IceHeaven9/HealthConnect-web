import Calendar from "react-calendar";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { SpecialtiesModal } from "../components/createConsutations/SpecialtiesModal";
import { DoctorsModal } from "../components/createConsutations/DoctorsModal";
import { customStyles } from "../constants";
import { AviableTimes } from "../components/createConsutations/AviableTimes";
import { DescriptionForm } from "./../components/createConsutations/DescriptionForm";
import { useAuthGuard } from "../hooks/authGuard";
import { useNavigate } from "react-router-dom";
import { fetchAvailableTimes } from "../components/createConsutations/fetch/availableTimesFetch";
import { NewConsultationTitle } from "../components/createConsutations/NewConsultationTitle";
import { Footer } from "../components/Footer";
import {HamburgerMenu} from '../components/HamburgerMenu';
import "react-calendar/dist/Calendar.css";

Modal.setAppElement("#root");

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
	const navigate = useNavigate();

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	useAuthGuard("/create-consultation");

	useEffect(() => {
		if (selectedSpecialty) {
			fetchAvailableTimes(
				selectedDate,
				selectedSpecialty,
				selectedDoctor,
				setAvailableTimes
			);
		}
	}, [selectedSpecialty, selectedDoctor, selectedDate]);

	const handleSpecialtyChange = (specialty) => {
		setSelectedSpecialty(specialty);
		setSelectedDoctor(null);
	};

	if (showDescriptionForm) {
		return (
			<DescriptionForm
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				selectedSpecialty={selectedSpecialty}
				setSelectedSpecialty={setSelectedSpecialty}
				selectedDoctor={selectedDoctor}
				setSelectedDoctor={setSelectedDoctor}
				selectedHour={selectedHour}
				setSelectedHour={setSelectedHour}
				setShowDescriptionForm={setShowDescriptionForm}
			/>
		);
	}

	return (
		<main className="flex flex-col items-center justify-center">
			<HamburgerMenu/>
			<NewConsultationTitle navigate={navigate} />

			<section className="bg-smokeWhite flex flex-col items-center w-full">
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
			<section className="flex flex-col items-center justify-center w-full bg-light">
				<Calendar
					defaultActiveStartDate={new Date()}
					minDate={new Date()}
					onChange={handleDateChange}
					value={selectedDate}
					tileDisabled={({ date }) =>
						date.getDay() === 0 || date.getDay() === 6
					}
					tileClassName={({ date }) =>
						date.getDay() === 0 || date.getDay() === 6 ? "disabled-day" : ""
					}
					showFixedNumberOfWeeks={false}
				/>
			</section>
			<h2 className="text-center text-xl font-medium text-lightBlue my-4">
				Horas disponibles para el dia {selectedDate.toLocaleDateString("es-ES")}
			</h2>
			<section className="bg-light w-full">
				<AviableTimes
					selectedDoctor={selectedDoctor}
					availableTimes={availableTimes}
					selectedHour={selectedHour}
					setSelectedHour={setSelectedHour}
				/>
			</section>
			<div className="flex flex-row items-center justify-center my-6 rounded-xl text-smokeWhite text-xl w-[90%] p-4 font-medium bg-lightBlue">
				<button
					onClick={() => setShowDescriptionForm(true)}
					disabled={!selectedSpecialty || !selectedHour}
				>
					Continuar
				</button>
			</div>
      <Footer/>
		</main>
	);
};
