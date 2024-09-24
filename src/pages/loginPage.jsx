import { Link } from "react-router-dom";
import { LoginForm } from "../components/login/LoginForm";

export const LoginPage = () => {
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
      <div className="max-w-full sm:max-w-[600px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] mt-36 mx-auto px-4">
        <LoginForm />
      </div>
    </div>
  );
};
