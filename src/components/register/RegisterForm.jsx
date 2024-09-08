import { useState } from "react";
import { RegisterPagetItle } from "./registerPagetItle";
import { EmailInput } from "./EmailInput";
import { UserNameInput } from "./UserNameInput";
import { FirstNameInput } from "./FirstNameInput";
import { LastNameInput } from "./LastNameInput";
import { PasswordInput } from "./PasswordInput";
import { Link } from "react-router-dom";
import { UserTypeInput } from "./UserTypeInput";
import { DoctorCodeInput } from "./DoctorCodeInput";
import {ExperienceInput} from './ExperienceInput';
import {BiographyInput} from './BiographyInput';
import {SpecialtiesSection} from './SpecialtiesSection';

export const RegisterForm = () => {
	const [userType, setUserType] = useState("Patient");
	const [doctorCode, setDoctorCode] = useState("");
	const [experience, setExperience] = useState("");
	const [bio, setBio] = useState("");
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [specialties, setSpecialties] = useState([]);
	const [selectedSpecialties, setSelectedSpecialties] = useState([]);

	{
		/*Cambio tipo de usuario y fetch de especialidades si es Doctor*/
	}
	const handleUserTypeChange = async (type) => {
		setUserType(type);
		if (type === "Patient") {
			{
				/*Si el tipo de usuario es Patient se limpian los campos de Doctor*/
			}
			setDoctorCode("");
			setExperience("");
			setBio("");
		} else if (type === "Doctor") {
			{
				/*Si el tipo de usuario es Doctor se hace fetch para especialidades al backend*/
			}
			try {
				const response = await fetch("http://localhost:3000/specialities");
				const data = await response.json();
				setSpecialties(data);
			} catch (error) {
				console.error("Error fetching specialties", error);
			}
		}
	};

	{
		/*Revisamos que todos los campos estén cumplimentados antes de enviar*/
	}
	const isFormValid = () => {
		if (userType === "Doctor") {
			{
				/*Si es Doctor se activan los campos correspondientes */
			}
			return (
				email &&
				username &&
				password &&
				name &&
				lastName &&
				doctorCode &&
				experience &&
				selectedSpecialties.length > 0
			);
		}
		{
			/*Si es Paciente se validan solo los campos correspondientes*/
		}
		return email && username && password && name && lastName;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		{
			/*Objeto con los datos que se enviarán al Back */
		}
		const userData = {
			firstName: name,
			lastName,
			email,
			userName: username,
			password,
			userType: userType.toLowerCase(),
			codigoMedico: userType === "Doctor" ? doctorCode : undefined,
			experience: userType === "Doctor" ? experience : null,
			biography: userType === "Doctor" ? bio : "null",
			specialityId:
				userType === "Doctor"
					? selectedSpecialties.map((id) => parseInt(id, 10))
					: undefined,
		};

		try {
			const response = await fetch("http://localhost:3000/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			const responseData = await response.json();
			console.log("Response Data:", responseData);

			if (!response.ok) {
				throw new Error("Error al registrarse.");
			}

			console.log("Usuario registrado correctamente.");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="bg-white min-h-screen flex flex-col">
			<main className="flex flex-col w-full mb-20 md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-6 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
				<div className="bg-white rounded-lg w-full">
					<RegisterPagetItle />
					<form onSubmit={handleSubmit}>
						<EmailInput email={email} setEmail={setEmail} />

						<UserNameInput username={username} setUsername={setUsername} />

						<FirstNameInput name={name} setName={setName} />

						<LastNameInput lastName={lastName} setLastName={setLastName} />

						<PasswordInput password={password} setPassword={setPassword} />

						<UserTypeInput
							userType={userType}
							handleUserTypeChange={handleUserTypeChange}
						/>
						{userType === "Doctor" && (
							<>
								<DoctorCodeInput
									doctorCode={doctorCode}
									setDoctorCode={setDoctorCode}
								/>
								
							<ExperienceInput
							experience={experience}
							setExperience={setExperience}
							/>

							<BiographyInput
							bio={bio}
							setBio={setBio}
							/>
							
							<SpecialtiesSection
							specialties={specialties}
							setSelectedSpecialties={setSelectedSpecialties}
							selectedSpecialties={selectedSpecialties}
							/>
								
							</>
						)}

						{/* Botón de envío */}
						<button
							type="submit"
							className="w-full bg-blue-500 my-4 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:bg-blue-600"
							disabled={!isFormValid()}
						>
							Confirmar
						</button>
						<p className="p-2 m-2 text-center text-lg">
							Ya tienes una cuenta?{" "}
							<Link className="text-[#628eff]" to="/login">
								Inicia sesión
							</Link>
						</p>
					</form>
				</div>
			</main>
		</div>
	);
};
