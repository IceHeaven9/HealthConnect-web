import { Link } from "react-router-dom";

export const LoginFormTopSection = () => {
	return (
		<>
			<div className="flex flex-row pb-4">
				<Link to="/">
					<img
						src="/images/Perfil_healthConnect-Photoroom.png"
						width="80"
						alt="Logo"
					/>
				</Link>
				<h1 className="text-center text-4xl font-bold text-[#4B5563] my-auto">
					HealthConnect
				</h1>
			</div>
			<p className="text-center text-2xl py-6 font-medium">Iniciar Sesión</p>
			<div className="text-lg font-light text-[#6B7280] pb-8">
				Introduce tu correo electronico y contraseña para iniciar sesion
			</div>
		</>
	);
};
