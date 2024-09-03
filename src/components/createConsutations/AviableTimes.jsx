
import PropTypes from 'prop-types';

export const AviableTimes = ({selectedDate,availableTimes}) => {
  return (
    <>
     <section className="flex flex-col items-center justify-center w-full">
      <h2 className="p-2 mt-4 text-[#628eff] font-medium">Horas disponibles para {selectedDate.toLocaleDateString('es-ES')}</h2>
			<div className="border-t-[0.1rem] border-solid border-[#628eff] w-[90%] mt-4 mb-2"></div>
      </section>
			<section className="w-full">
      <ul className="grid grid-cols-5 auto-rows-auto justify-items-center gap-2 px-4 py-2.5 w-full">
        {availableTimes.map((time, index) => (
          <li className=" p-2 text-xs  bg-[#e0e4f2] rounded-3xl text-[#809cff] w-max" key={index}><p>{time}</p></li>
        ))}
      </ul>
			</section>
    </>
  )
}


AviableTimes.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  availableTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
