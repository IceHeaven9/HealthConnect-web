import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../contexts/authContext";
import { login } from "./loginFetch";
import { notify } from "../../utils/notify";
import { LoginFormTopSection } from "./LoginFormTopSection";
import { LoginFormEmailSection } from "./LoginFormEmailSection";
import { LoginFormPassSection } from "./LoginFormPassSection";
import { LoginFormBottomSection } from "./LoginFormBottomSection";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);
  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    if (token) {
      navigate("/");
      notify("Tu sesion esta iniciada");
    }
  }, [token, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password)
      .then((result) => {
        if (result.token) {
          onLogin(result.token);
          navigate("/");
        } else {
          notify(result.message || "Error desconocido");
        }
      })
      .catch((error) => notify(error.message || "Error en la solicitud"));
  };

  return (
    <div className="flex flex-col w-full mx-auto p-6 bg-lightCakeBlue rounded-t-2xl shadow-xl mt-4 ">
      <main className="bg-smokeWhite rounded-lg p-4 w-full">
        <LoginFormTopSection />
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <LoginFormEmailSection
            email={email}
            handleEmailChange={handleEmailChange}
          />
          <LoginFormPassSection
            password={password}
            handlePasswordChange={handlePasswordChange}
          />
          <LoginFormBottomSection email={email} password={password} />
        </form>
        <ToastContainer />
      </main>
    </div>
  );
};
