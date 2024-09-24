import { DinamicTitle } from "../components/DinamicTitle";

export const SpecialitiesPage = () => {
  return (
    <div className="flex flex-col">
      <div className="absolute top-0 z-10 w-full">
        <DinamicTitle text="Especialidades" />
      </div>
      <div className="flex items-center justify-center mx-4 mt-20">
        <div className="max-w-full bg-lightCakeBlue rounded-2xl shadow-xl m-4 p-6 mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
          <main className="flex flex-col items-center rounded-t-xl justify-center bg-lightCakeBlue">
            <h1>Specialities Page</h1>
          </main>
        </div>
      </div>
    </div>
  );
};
