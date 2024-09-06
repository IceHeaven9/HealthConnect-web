import {GrAdd} from 'react-icons/gr';
import {IoClose} from 'react-icons/io5';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

export const SpecialtiesModal = ({setSelectedSpecialty,specialtyModaSetIsOpen,setSpecialties,selectedSpecialty,specialties,specialtyModalIsOpen,customStyles}) => {
  return (
    <>
    <button 
  className={`flex flex-row text-xl font-medium items-center justify-center rounded-2xl gap-2 w-[90%] py-2 px-4 mt-6 mb-2 ${!selectedSpecialty ? 'text-[#2260ff]  bg-white' : 'bg-[#628eff] text-white'}`} 
  onClick={() => {
    specialtyModaSetIsOpen(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch("http://localhost:3000/specialities", requestOptions)
      .then((response) => response.json())
      .then((result) => setSpecialties(result))
      .catch((error) => console.error(error));
  }}
  >
    {selectedSpecialty ? specialties.find(specialty => specialty.id === selectedSpecialty).name : 'Selecciona una Especialidad'}<GrAdd />
  </button>  
  <Modal
  isOpen={specialtyModalIsOpen}
  onRequestClose={() => specialtyModaSetIsOpen(false)}
  style={customStyles}
  contentLabel="Specialties"
>
  <button className="text-2xl" onClick={() => specialtyModaSetIsOpen(false)}><IoClose /></button>
  <div className=" text-center text-3xl pb-4">Especialidades</div>
  <ul className="custom-scrollbar flex flex-col items-start justify-start text-xl gap-2 w-full">
    {specialties.map((specialty) => (
      <li className={`w-full p-4 rounded-xl ${selectedSpecialty === specialty.id ? 'bg-[#628eff] text-white' : ''}`}
      key={specialty.id}>
      <label className="px-2">
      {specialty.name}
          <input 
           className="appearance-none "
            type="radio"
            name="specialty" 
            value={specialty} 
            onChange={() => {
              setSelectedSpecialty(specialty.id);
              specialtyModaSetIsOpen(false);
            }} 
          />
        </label>
         
      </li>
    ))}
  </ul>
</Modal>
    </>
  )
}



SpecialtiesModal.propTypes = {
  setSelectedSpecialty: PropTypes.func.isRequired,
  specialtyModaSetIsOpen: PropTypes.func.isRequired,
  setSpecialties: PropTypes.func.isRequired,
  selectedSpecialty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  specialties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  specialtyModalIsOpen: PropTypes.bool.isRequired,
  customStyles: PropTypes.object.isRequired,
};