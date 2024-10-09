import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export const RecoveryFormTopSection = () => {
  return (
    <>
      <Link
        to="/login"
        className="font-bold rounded-md text-3xl w-10 h-10 text-[#628eff] bg-[#ffffff] flex flex-col items-center justify-center"
      >
        <IoMdArrowRoundBack />
      </Link>
      <div className="flex flex-row pb-4">
        <div>
          <img
            src="/images/Perfil_healthConnect-Photoroom.png"
            width="80"
            alt="Logo"
          />
        </div>
        <h1 className="text-center text-4xl font-bold text-[#4B5563] my-auto">
          HealthConnect
        </h1>
      </div>

      <div className="flex flex-row items-center justify-center gap-3 pb-4">
        <h2 className="text-2xl text-center font-bold text-[#4B5563] mt-8">
          Recuperación de la cuenta
        </h2>
      </div>
      <div className="text-lg font-medium text-[#6B7280] pb-8 text-center">
        Introduce el correo electronico de tu cuenta para recibir un código de
        recuperación.
      </div>
    </>
  );
};
