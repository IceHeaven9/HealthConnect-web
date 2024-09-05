import PropTypes from 'prop-types';
import { useState } from 'react';
import { FcRight } from "react-icons/fc";
import { FcLeft } from "react-icons/fc";

export const AviableTimes = ({ selectedDoctor, availableTimes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);



  if (!Array.isArray(availableTimes) || availableTimes.length === 0) {
    return <div>Sewlecciona una especialidad para poder ver las horas disponibles</div>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % availableTimes.length);
    setSelectedHour(null)
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + availableTimes.length) % availableTimes.length);
    setSelectedHour(null)
  };

  const currentSlot = availableTimes[currentIndex];

if (!currentSlot) {
  setCurrentIndex(0); // Ajusta el índice si está fuera de rango
  return <div>No hay horas disponibles</div>;
}

return (
  <div className='my-8 border-solid border-[0.1rem] border-[#628eff] mx-4 bg-[#fbf8f8]  rounded-xl  p-6'>
    <div className='flex gap-12 items-center justify-start'>
      <img className='border-solid border-[0.15rem] border-[#628eff] rounded-xl w-16 h-16 ' src={ currentSlot.avatar} alt=""/> 
      <h3 className='text-2xl font-medium' >{currentSlot.doctorName}</h3>
    </div>
    <div className=''> 
      <ul className='grid grid-cols-5 mb-4 mt-6 justify-items-center'>
        {currentSlot.freeHours.map((hour, idx) => (
          <li 
            className={`rounded-xl font-medium p-1.5 m-1 w-max text-black ${selectedHour === hour ? 'bg-[#628eff]' : 'bg-[#cad6ff]'}`} 
            key={idx}
          >
            <label>
              <input 
                type="radio" 
                name="selectedHour" 
                value={hour} 
                className="hidden" 
                onChange={() => setSelectedHour(hour)} 
              />
              {hour}
            </label>
          </li>
        ))}
      </ul>
    </div>
    <div className='flex text-4xl justify-between'>
      {!selectedDoctor && (
        <>
          <button onClick={handlePrevious}><FcLeft /></button>
          <button onClick={handleNext}><FcRight /></button>
        </>
      )}
    </div>
  </div>
);
};

AviableTimes.propTypes = {
  availableTimes: PropTypes.arrayOf(
    PropTypes.shape({
      doctorName: PropTypes.string.isRequired,
      freeHours: PropTypes.arrayOf(PropTypes.string).isRequired,
      avatar: PropTypes.string, 
    })
  ).isRequired,
  selectedDoctor: PropTypes.object
};