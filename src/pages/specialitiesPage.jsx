import { DinamicTitle } from "../components/DinamicTitle";
import { specialtiesResume, specialtiesIcons } from "../constants";

const specialities = specialtiesResume.map((specialty, index) => {
  return (
    <ul
      key={index}
      className="bg-lightCakeBlue flex flex-col items-center p-2 rounded-lg shadow-xl"
    >
      <li className="w-60 h-60 text-center bg-smokeWhite w-full rounded-lg flex flex-col items-center justify-center gap-2 m-2">
        <img
          src={specialtiesIcons[index].icon}
          alt={specialty.name}
          className="w-60 h-60 p-4 object-contain"
        />
      </li>
      <span className="text-lightBlue text-2xl font-ubuntu font-bold text-center">
        {specialty.name}
      </span>
    </ul>
  );
});

export const SpecialitiesPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="absolute top-0 z-10 w-full">
        <DinamicTitle text="Especialidades" />
      </div>
      <ul className="flex flex-wrap justify-center max-w-[1500px] gap-6 p-6 mx-auto mt-20">
        {specialities}
      </ul>
    </div>
  );
};
