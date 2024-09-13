import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ResetPassTitle } from "./ResetPassTitle";
import { ValidationCodeInput } from "./ValidationCodeInput";
import { NewPassInput } from "./NewPassInput";
import { RepeatPassInput } from './RepeatPassInput';
import { ResetPassFormButton } from './ResetPassFormButton';
import { resetPassword } from "./resetPassFetch";


export const ResetPassForm = () => {
  const [validationCode, setValidationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(validationCode, password, confirmPassword, navigate, setValidationCode, setPassword, setConfirmPassword);
  };

  return (
    <div className="flex flex-col justify-center w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl mb-20">
      <ResetPassTitle />
      
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <ValidationCodeInput
          validationCode={validationCode}
          setValidationCode={setValidationCode}
        />
        <NewPassInput password={password} setPassword={setPassword} />
        <RepeatPassInput
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
        <ResetPassFormButton
          validationCode={validationCode}
          password={password}
          confirmPassword={confirmPassword}
        />
        <ToastContainer />
      </form>
    </div>
  );
};