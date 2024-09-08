import { useState } from "react";
import { GrValidate } from "react-icons/gr";
import {ToastContainer} from 'react-toastify';
import { notify } from "../../utils/notify";
import { useNavigate } from "react-router-dom";

export const ResetPassForm = () => {
  const [validationCode, setValidationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      recoveryPasswordCode: Number(validationCode),
      password1: password,
      password2: confirmPassword,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/reset", requestOptions)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Codigo invalido');
      }
    })
    .then((result) => {
      notify(result.message);
      setValidationCode("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    })
    .catch((error) => notify(error.message));
  }



  return (
    <div className="flex flex-col justify-center w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl mb-20">
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
			
      <div className="flex flex-row text-center justify-center gap-3 pb-4">
        <h1 className="text-3xl font-bold text-[#4B5563] my-2 text-center">Cambio de contraseña</h1>
      </div>
      <div className="text-md font-medium text-[#6B7280] pb-8 text-center ">Introduce el codigo de validación y la nueva contraseña.</div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="pb-2">
          <label htmlFor="validationCode" className="block mb-2 text-sm font-medium text-[#111827]">Codigo de validación</label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <GrValidate />
            </span>
            <input type="number" name="validationCode" id="validationCode" 
              value={validationCode}
              onChange={(e) => setValidationCode(e.target.value)} className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="123456" autoComplete="off" />
          </div>
        </div>
        <div className="pb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Contraseña nueva</label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M12 8v8"></path>
                <path d="m8.5 14 7-4"></path>
                <path d="m8.5 10 7 4"></path>
              </svg>
            </span>
            <input type="password" name="password" id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" className="pl-12  bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" />
          </div>
        </div>
        <div className="pb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Repite la contraseña</label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M12 8v8"></path>
                <path d="m8.5 14 7-4"></path>
                <path d="m8.5 10 7 4"></path>
              </svg>
            </span>
            <input type="password" name="password" id="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" />
          </div>
        </div>
        <button type="submit"
          disabled={!validationCode || !password || !confirmPassword}
          className={`w-full text-[#FFFFFF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md p-4 text-center mb-6 ${!validationCode || !password || !confirmPassword ? 'bg-[#bdd0ff]' : 'bg-[#628eff]'}`}>Confirmar</button>
      <ToastContainer/>
      </form>
    </div>
  )
}