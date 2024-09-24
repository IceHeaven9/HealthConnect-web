import { DinamicTitle } from "../components/DinamicTitle";

export const DoctorsPage = () => {
  return (
    <div className="max-w-full bg-smokeWhite sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] mx-auto px-4">
      <main className="flex flex-col items-center rounded-t-xl justify-center bg-lightCakeBlue">
        <DinamicTitle text="Doctors" />
        <h1>Doctor Page</h1>
      </main>
    </div>
  );
};
