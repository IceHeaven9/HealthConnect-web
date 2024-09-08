import { useState } from "react";
import { RegisterPagetItle } from "./registerPagetItle";
import { EmailInput } from "./EmailInput";
import { UserNameInput } from "./UserNameInput";
import { FirstNameInput } from "./FirstNameInput";
import { LastNameInput } from "./LastNameInput";
import { PasswordInput } from "./PasswordInput";
import { UserTypeInput } from "./UserTypeInput";
import { DoctorCodeInput } from "./DoctorCodeInput";
import { ExperienceInput } from "./ExperienceInput";
import { BiographyInput } from "./BiographyInput";
import { SpecialtiesSection } from "./SpecialtiesSection";
import { RegisterButton } from "./RegisterButton";
import { handleUserTypeChange } from "./fetch/handleUserType";
import { handleSubmit } from "./fetch/handleSubmit";
import { ToastContainer } from "react-toastify";

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

	const handleUserTypeChangeWrapper = (type) => {
		handleUserTypeChange(
			type,
			setUserType,
			setDoctorCode,
			setExperience,
			setBio,
			setSpecialties
		);
	};

	const isFormValid = () => {
		if (userType === "Doctor") {
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

		return email && username && password && name && lastName;
	};

	const handleSubmitWrapper = (e) => {
		handleSubmit(
			e,
			name,
			lastName,
			email,
			username,
			password,
			userType,
			doctorCode,
			experience,
			bio,
			selectedSpecialties
		);
	};

	return (
		<div className="bg-white min-h-screen flex flex-col">
			<main className="flex flex-col w-full mb-20 md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-6 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
				<div className="bg-white rounded-lg w-full">
					<RegisterPagetItle />
					<form onSubmit={handleSubmitWrapper}>
						<EmailInput email={email} setEmail={setEmail} />

						<UserNameInput username={username} setUsername={setUsername} />

						<FirstNameInput name={name} setName={setName} />

						<LastNameInput lastName={lastName} setLastName={setLastName} />

						<PasswordInput password={password} setPassword={setPassword} />

						<UserTypeInput
							userType={userType}
							handleUserTypeChange={handleUserTypeChangeWrapper}
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

								<BiographyInput bio={bio} setBio={setBio} />

								<SpecialtiesSection
									specialties={specialties}
									setSelectedSpecialties={setSelectedSpecialties}
									selectedSpecialties={selectedSpecialties}
								/>
							</>
						)}

						<RegisterButton isFormValid={isFormValid} />
					</form>
				</div>
				<ToastContainer/>
			</main>
		</div>
	);
};
