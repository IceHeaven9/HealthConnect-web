export const ResetPassTitle = () => {
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

			<div className="flex flex-row text-center justify-center gap-3 pb-4">
				<h2 className="text-3xl font-bold text-[#4B5563] my-2 text-center">
					Cambio de contraseña
				</h2>
			</div>
				<div className="text-md font-medium text-[#6B7280] pb-8 text-center ">
				Introduce el codigo de validación y la nueva contraseña.
			</div>
		</>
	);
};
