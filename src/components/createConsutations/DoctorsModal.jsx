import PropTypes from 'prop-types';
import {GrAdd} from 'react-icons/gr';
import {IoClose} from 'react-icons/io5';
import Modal from 'react-modal';

export const DoctorsModal = ({doctorsModaSetIsOpen,setDoctors,selectedDoctor,doctorsModalIsOpen,customStyles,doctors,setSelectedDoctor, selectedSpecialty}) => {
  return (
   <>
<button 
  className={`flex flex-row text-xl font-medium items-center justify-center rounded-2xl gap-2 w-[90%] py-2 px-4 mt-2 mb-6 ${!selectedDoctor ? 'bg-white' : 'bg-[#628eff] text-white'} ${!selectedSpecialty ? 'text-[#bdd0ff]' : 'text-[#2260ff]'}`} 
  onClick={() => {
    doctorsModaSetIsOpen(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`http://localhost:3000/specialities/${selectedSpecialty}/doctors`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const formattedResult = result.map(doctor => ({
          ...doctor,
          averageRating: Math.floor(doctor.averageRating * 10) / 10
        }));
        setDoctors(formattedResult);
      })
      .catch((error) => console.error(error));
  }}
  disabled={!selectedSpecialty}
>
  {selectedDoctor ? `${selectedDoctor.firstName} ${selectedDoctor.lastName}` : "Selecciona un Doctor"}<GrAdd />
</button>  
<Modal
  isOpen={doctorsModalIsOpen}
  onRequestClose={() => doctorsModaSetIsOpen(false)}
  style={customStyles}
  contentLabel="Example Modal"
>

  <button className="text-2xl" onClick={() => doctorsModaSetIsOpen(false)}><IoClose /></button>
  <div className="text-center text-2xl pb-4 pl-4 pr-4 mb-4 font-medium">Doctores</div>
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {doctors.length > 0 && doctors.map((doctor) => (
    <li key={doctor.id} className={`flex items-center p-4 border rounded-lg ${selectedDoctor?.id === doctor.id ? 'bg-[#628eff] text-white ' : ''}`}>
      <label className="flex items-center space-x-4">
      <input
  type="radio"
  name="doctor"
  value={doctor.id}
  className="hidden"
  onChange={() => {
    if (selectedDoctor?.id === doctor.id) {
      setSelectedDoctor(null);
    } else {
      setSelectedDoctor(doctor);
    }
    doctorsModaSetIsOpen(false);
  }}
/>
        <img
          src={doctor.avatar}
          alt={`${doctor.firstName} ${doctor.lastName}`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">
            {doctor.firstName} {doctor.lastName}
          </h3>
          <p className="text-sm text-gray-600">{doctor.specialities}</p>
          <p className="text-sm text-gray-600">Rating: {doctor.averageRating}</p>
          <p className="text-sm text-gray-600">{doctor.biography}</p>
        </div>
      </label>
    </li>
  ))}
</ul>
</Modal>
   </>
  )
}

DoctorsModal.propTypes = {
  doctorsModaSetIsOpen: PropTypes.func.isRequired,
  setDoctors: PropTypes.func.isRequired,
  selectedDoctor: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string,
    specialities: PropTypes.string,
    averageRating: PropTypes.number,
    biography: PropTypes.string,
  }),
  doctorsModalIsOpen: PropTypes.bool.isRequired,
  customStyles: PropTypes.object.isRequired,
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      specialities: PropTypes.string.isRequired,
      averageRating: PropTypes.number.isRequired,
      biography: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedDoctor: PropTypes.func.isRequired,
  selectedSpecialty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};