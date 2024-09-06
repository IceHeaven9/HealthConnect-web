import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { login } from "./loginFetch";
import { notify } from "../../utils/notify";
import { LoginFormTopSection } from "./loginFormTopSection";
import { LoginFormEmailSection } from "./LoginFormEmailSection";
import { LoginFormPassSection } from "./LoginFormPassSection";
import { LoginFormBottomSection } from "./loginFormBottomSection";

export const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { onLogin } = useContext(AuthContext);

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
		<div className="flex flex-col w-full mb-12 md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-6 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
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
		</div>
	);
};
