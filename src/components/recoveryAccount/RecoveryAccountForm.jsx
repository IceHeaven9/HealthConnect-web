import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { notify } from "../../utils/notify";
import { sendRecoveryEmail } from "./recoveryAccountFetch";
import { useNavigate } from "react-router-dom";
import { RecoveryFormTopSection } from "./RecoveryFormTopSection";
import { RecoveryFormMidSection } from "./RecoveryFormMidSection";
import "react-toastify/dist/ReactToastify.css";

export const RecoveryAccountForm = () => {
	const [email, setEmail] = useState("");
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [timer, setTimer] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		let interval;
		if (isButtonDisabled) {
			interval = setInterval(() => {
				setTimer((prevTimer) => {
					if (prevTimer <= 1) {
						clearInterval(interval);
						setIsButtonDisabled(false);
						return 0;
					}
					return prevTimer - 1;
				});
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isButtonDisabled]);

	const handleSubmit = (e) => {
		e.preventDefault();
		sendRecoveryEmail(email)
			.then(() => {
				setIsButtonDisabled(true);
				setTimer(60);
				setEmail("");
			})
			.catch(() => {
				setIsButtonDisabled(false);
				notify("Debes introducir un correo electrónico válido");
			});
	};
	return (
		<div className="flex flex-col mb-20 justify-center w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl h-max ">
			<RecoveryFormTopSection navigate={navigate} />
			<form className="flex flex-col">
				<RecoveryFormMidSection email={email} setEmail={setEmail} />
				<div className="flex flex-col items-center">
					<button
						type="submit"
						className={`w-full text-[#FFFFFF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md p-4 text-center mb-6 ${
							isButtonDisabled || email === "" ? "bg-[#bdd0ff]" : "bg-[#628eff]"
						}`}
						onClick={handleSubmit}
						disabled={isButtonDisabled || email === ""} // Deshabilitar si el email está vacío
					>
						Enviar
					</button>
					{isButtonDisabled && (
						<div className="text-sm font-light text-[#6B7280] pb-4 h-6">
							Por favor espera {timer} segundos para reenviar el codigo.
						</div>
					)}
					<ToastContainer />
				</div>
			</form>
		</div>
	);
};
