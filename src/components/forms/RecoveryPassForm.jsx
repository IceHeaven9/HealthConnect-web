import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";


export const RecoveryPassForm = () => {
  const [email, setEmail] = useState('');
  console.log(email);
  return (
    <form className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl ">
      <div className="flex flex-row gap-3 pb-4">
        
      <button className="font-bold rounded-md text-3xl w-10 h-10 text-[#628eff] bg-[#ffffff] flex flex-col items-center justify-center"><IoMdArrowRoundBack />
</button>
        <h1 className="text-3xl font-bold text-[#4B5563] my-auto">Recuperación de contraseña</h1>
      </div>
      <div className="text-sm font-light text-[#6B7280] pb-8">
        Introduce el correo electronico de tu cuenta para recuperar la contraseña.
      </div>
      <form className="flex flex-col">
        <div className="pb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">
            Email
          </label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span>
            <input
              type="email"
              name="email"
              id="email"
              className="pl-12 mb-2 bg-[#ecf1ff] text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
              placeholder="name@company.com"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
       <div className="flex flex-col items-center">
       <button
  type="submit"
  className="w-28 text-[#FFFFFF] bg-[#628eff] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
  onClick={(e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ email });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:3000/recover-password", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }}
>
  Enviar
</button>
        </div>
      </form>
    </form>
  );
};