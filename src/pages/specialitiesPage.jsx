import { useEffect, useState } from "react";
import { fetchSpecialties } from "../components/createConsutations/fetch/specialtiesFetch";
import { DinamicTitle } from "../components/DinamicTitle";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export const SpecialitiesPage = () => {
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);

  useEffect(() => {
    fetchSpecialties(setSpecialities);
  }, []);

  const handleSpecialityChange = (event) => {
    const selectedId = Number(event.target.value);
    const selectedSpeciality = specialities.find(
      (speciality) => speciality.id === selectedId
    );
    setSelectedSpeciality(selectedSpeciality);
  };

  const handleOnSelect = (item) => {
    const selectedSpeciality = specialities.find(
      (speciality) => speciality.id === item.id
    );
    setSelectedSpeciality(selectedSpeciality);
  };

  const formatResult = (item) => {
    return (
      <div className="relative min-h-max z-50">
        <div className="flex flex-col p-2 m-1">
          <div className="flex items-center justify-between">
            <span className="font-ubuntu font-bold text-carbon text-sm">
              {item.name}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="absolute top-0 z-10 w-full">
        <DinamicTitle text="Especialidades" />
      </div>
      <div className="flex items-center justify-center mx-4 mt-20">
        <div className="max-w-full bg-lightCakeBlue rounded-2xl shadow-xl w-full m-4 p-6 mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
          <main className="flex flex-col items-center rounded-t-xl justify-center bg-smokeWhite">
            <div className="w-full p-4">
              <ReactSearchAutocomplete
                items={specialities}
                onSelect={handleOnSelect}
                autoFocus
                formatResult={formatResult}
                fuseOptions={{ keys: ["name"] }}
                resultStringKeyName="name"
              />
            </div>
            <ul className="flex flex-wrap gap-6 p-4 space-y-3">
              {specialities.map((specialty) => (
                <li
                  key={specialty.id}
                  className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <span className="text-lightBlue font-bold text-lg">
                    {specialty.name}
                  </span>
                  <button
                    className="mt-2 px-4 py-2 bg-lightBlue text-white rounded-lg"
                    onClick={() => setSelectedSpeciality(specialty)}
                  >
                    Seleccionar
                  </button>
                </li>
              ))}
            </ul>
          </main>
        </div>
      </div>
    </div>
  );
};
