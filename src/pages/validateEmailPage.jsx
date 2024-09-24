import { Link } from "react-router-dom";
import { VerificationForm } from "../components/validateEmail/ValidationForm";

export const ValidateEmailPage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-lightCakeBlue absolute top-0 w-full ">
        <Link to="/">
          <img
            src="/images/Perfil_healthConnect-Photoroom.png"
            width="125"
            alt="Logo"
          />
        </Link>
      </div>
      <div>
        <VerificationForm />
      </div>
    </div>
  );
};
