import { useState, useEffect } from "react";
import {toast, ToastContainer} from 'react-toastify';

export const VerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


  useEffect(() => {
    setIsButtonDisabled(verificationCode === '');
  }, [verificationCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ "code": verificationCode });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:3000/validate-email", requestOptions)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Error en la solicitud');
      }
    })
    .then(({ message }) => notify(message))
    .catch((error) => notify(error.message));
  };

  const notify = (message) => toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: '#ffffff',
      color: '#000000',
      fontSize: '16px'
    }
  });
  

  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl h-[25rem] ">
    <div className="w-28 h-28">
      <img src="/images/Perfil_healthConnect-Photoroom.png"></img>
    </div>
      <h1 className="text-3xl font-bold text-[#4B5563] mt-2 mb-4">Validación de Usuario</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="pb-2">
          <label htmlFor="verificationCode" className="block mb-2 text-sm font-medium text-[#111827]">
            Código de Verificación
          </label>
          <input
            type="number"
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
        </div>
        <ToastContainer/>
      </form>
    </div>
  );
};