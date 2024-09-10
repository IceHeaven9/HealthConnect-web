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
				<h1 className="text-center text-4xl font-bold text-gray font-roboto my-auto">
					HealthConnect
				</h1>
			</div>
			<p className="text-center text-2xl py-6 font-ubuntu font-bold">Iniciar Sesión</p>
			<div className="text-lg font-light text-gray pb-8 font-ubuntu">
				Introduce tu correo electronico y contraseña para iniciar sesion
			</div>
		</>
	);
};
