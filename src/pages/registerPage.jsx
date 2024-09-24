import { Link } from "react-router-dom";
import { RegisterForm } from "../components/register/RegisterForm";

export const RegisterPage = () => {
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
      <div className="max-w-full sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] mt-36 mx-auto my-4 px-4">
        <RegisterForm />
      </div>
    </div>
  );
};
