export const ValidateFormTopSection = () => {
	return (
		<>
			<div className="flex flex-row pb-4">
				<div>
					<img
						src="/images/Perfil_healthConnect-Photoroom.png"
						width="80"
						alt="Logo"
					/>
				</div>
				<h1 className="text-center text-4xl font-bold text-[#4B5563] my-auto">
					HealthConnect
				</h1>
			</div>
			<h2 className="text-3xl font-bold text-[#4B5563] mt-2 mb-8 text-center">
				Validación de Usuario
			</h2>
			<div className="text-lg font-light text-[#6B7280] pb-8 text-center">
				Introduce el codigo de verificación que te enviamos a tu correo
				electrónico
			</div>
		</>
	);
};
