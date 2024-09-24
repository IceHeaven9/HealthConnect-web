import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notify } from "../../utils/notify";
import { validateEmail } from "./validateEmailFetch";
import { ValidateFormMidSection } from "./ValidateFormMidSection";
import { ValidateFormTopSection } from "./ValidateFormTopSection";

export const VerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsButtonDisabled(verificationCode === "");
  }, [verificationCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await validateEmail(verificationCode);
      notify(message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      notify(error.message);
    }
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl mt-36 shadow-xl mb-20 ">
      <ValidateFormTopSection />
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <ValidateFormMidSection
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
        />
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className={`w-full text-[#FFFFFF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md p-4 text-center mb-6 ${
              isButtonDisabled ? "bg-[#bdd0ff]" : "bg-[#628eff]"
            }`}
            disabled={isButtonDisabled}
          >
            Validar
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};
