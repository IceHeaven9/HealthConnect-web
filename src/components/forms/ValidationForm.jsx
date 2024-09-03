//DAMIAN TESTEANDO
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validateUser = (verificationCode) => {
  // Implementar la lógica de validación del código de verificación aquí
  // Puede utilizar fetch, axios, o cualquier biblioteca de HTTP para realizar la solicitud
  // Asegúrese de manejar correctamente los casos de éxito y error
  // Mostrar notificaciones utilizando toast cuando sea necesario
};

const VerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUser(verificationCode);
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl h-[25rem] ">
      <h1 className="text-3xl font-bold text-[#4B5563] my-auto">Validación de Usuario</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="pb-2">
          <label htmlFor="verificationCode" className="block mb-2 text-sm font-medium text-[#111827]">
            Código de Verificación
          </label>
          <input
            type="text"
            name="verificationCode"
            id="verificationCode"
            className="mb-2 bg-[#ecf1ff] text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
            placeholder="Ingrese el código de verificación"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className={`w-28 text-[#FFFFFF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6 ${isButtonDisabled ? 'bg-[#bdd0ff]' : 'bg-[#628eff]'}`}
            disabled={isButtonDisabled}
          >
            Validar
          </button>
          {timer > 0 && (
            <div className="text-sm font-light text-[#6B7280] pb-4 h-6">
              Por favor espera {timer} segundos para reenviar el código.
            </div>
          )}
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;