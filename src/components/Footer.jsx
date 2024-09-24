import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="max-w-full">
      <div className="flex flex-col items-center w-full h-fit bg-lightCakeBlue text-[#628eff] pb-4 rounded-b-lg">
        <div className="flex flex-col justify-center items-center">
          <div className=" w-full flex flex-col items-center">
            <div className=" w-28 h-28">
              <img
                src="/images/Perfil_healthConnect-Photoroom.png"
                alt="Logo Preview"
              />
            </div>
          </div>
          <div className="flex flex-row w-[65%] items-center justify-center gap-16 text-nowrap">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="font-bold text-3xl text-center text-[#ffffff] pb-3">
                HealthConnect
              </div>
              <Link to="#xxx" className="hover:underline text-xl">
                Sobre nosotros
              </Link>
              <Link to="#xxx" className="hover:underline text-xl">
                Politica de privacidad
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[90%] border-t border-gray-500 my-8"></div>
        <div className="text-center">
          © 2024 HealthConnect - Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
};
