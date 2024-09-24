import Calendar from "react-calendar";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { SpecialtiesModal } from "../components/createConsutations/SpecialtiesModal";
import { DoctorsModal } from "../components/createConsutations/DoctorsModal";
import { customStyles } from "../constants";
import { AviableTimes } from "../components/createConsutations/AviableTimes";
import { DescriptionForm } from "./../components/createConsutations/DescriptionForm";
import { useAuthGuard } from "../hooks/authGuard";
import { fetchAvailableTimes } from "../components/createConsutations/fetch/availableTimesFetch";
import "react-calendar/dist/Calendar.css";
import { DinamicTitle } from "../components/DinamicTitle";

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
    <div>
      <div className="absolute top-0 z-10 w-full">
        <DinamicTitle text="Mis consultas" />
      </div>
      <div className="flex items-center justify-center m-auto mt-20 sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
        <div className="max-w-full bg-lightCakeBlue rounded-2xl shadow-xl m-4 p-6">
          <main className="flex flex-col items-center rounded-t-xl justify-center bg-lightCakeBlue ">
            <section className="flex flex-col items-center w-full bg-smokeWhite rounded-xl">
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
            <section className="flex flex-col items-center justify-center m-4 rounded-xl w-full bg-smokeWhite">
              <Calendar
                defaultActiveStartDate={new Date()}
                minDate={new Date()}
                onChange={handleDateChange}
                value={selectedDate}
                tileDisabled={({ date }) =>
                  date.getDay() === 0 || date.getDay() === 6
                }
                tileClassName={({ date }) =>
                  date.getDay() === 0 || date.getDay() === 6
                    ? "disabled-day"
                    : ""
                }
                showFixedNumberOfWeeks={false}
              />
            </section>
            <section className="bg-smokeWhite w-full rounded-xl">
              <h2 className="text-center text-xl font-medium bg-smokeWhite w-full text-lightBlue my-4">
                Horas disponibles para el dia{" "}
                {selectedDate.toLocaleDateString("es-ES")}
              </h2>
              <AviableTimes
                selectedDoctor={selectedDoctor}
                availableTimes={availableTimes}
                selectedHour={selectedHour}
                setSelectedHour={setSelectedHour}
              />
            </section>
            <div className="flex flex-row items-center justify-center my-6 rounded-xl text-smokeWhite text-xl w-[200px] p-4 font-medium bg-lightBlue">
              <button
                onClick={() => setShowDescriptionForm(true)}
                disabled={!selectedSpecialty || !selectedHour}
              >
                Continuar
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
