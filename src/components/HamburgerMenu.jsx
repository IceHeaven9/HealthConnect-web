import { CiMenuFries } from "react-icons/ci";
import { RiHomeHeartFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { PiCalendarDotsLight } from "react-icons/pi";
import { useContext, useState } from "react";
import { MenuSpecialtiesModal } from "./menu/MenuSpecialtiesModal";
import { MenuDoctorsModal } from "./menu/MenuDoctorsModal";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from "../contexts/authContext";
import { FaUserPlus } from "react-icons/fa6";
import { PiSignInLight } from "react-icons/pi";

export const HamburgerMenu = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [specialtyModalIsOpen, specialtyModaSetIsOpen] = useState(false);
	const [doctorsModalIsOpen, doctorsModaSetIsOpen] = useState(false);
	const [showLogOptions, setShowLogOptions] = useState(false);
	const { onLogout } = useContext(AuthContext);
	const { navigate } = useNavigate();
	const token = localStorage.getItem("TOKEN");

	const handleLogout = () => {
		localStorage.removeItem("TOKEN");
		onLogout();
		navigate("/login");
	};

	return (
		<>
			<section className="flex justify-end items-center w-max absolute top-2 right-1">
				{showMenu && (
					<article className="">
						<ul className="flex gap-8 items-center justify-center p-2 rounded-full bg-lightBlue">
							<li className="pl-6">
								<a href="/">
									<RiHomeHeartFill size={30} color="#ffffff" />
								</a>
							</li>
							<MenuSpecialtiesModal
								specialtyModalIsOpen={specialtyModalIsOpen}
								specialtyModaSetIsOpen={specialtyModaSetIsOpen}
							></MenuSpecialtiesModal>
							<MenuDoctorsModal
								doctorsModalIsOpen={doctorsModalIsOpen}
								doctorsModaSetIsOpen={doctorsModaSetIsOpen}
							/>
							<li className="relative">
								<button
									className="mt-2"
									onClick={() => setShowLogOptions(!showLogOptions)}
								>
									<CgProfile size={30} color="#ffffff" />
								</button>
								{showLogOptions && (
									<ul className="absolute -right-7 bg-white shadow-md rounded-md mt-2">
										{token ? (
											<li>
												<button
													className="flex items-center gap-2 text-md bg-lightBlue rounded-lg mt-1 text-white p-2"
													onClick={handleLogout}
												>
													<CiLogout size={40} /> Cerrar sesión
												</button>
											</li>
										) : (
											<>
												<li>
													<Link
														className="flex items-center gap-2 text-md bg-lightBlue rounded-lg mt-1 text-white p-2"
														to="/register"
													>
														<FaUserPlus size={40} />
														Registrate
													</Link>
												</li>
												<li>
													<Link
														className="flex items-center gap-2 text-md bg-lightBlue rounded-lg mt-1 text-white p-2"
														to="/login"
													>
														<PiSignInLight size={40} /> Iniciar Sesión
													</Link>
												</li>
											</>
										)}
									</ul>
								)}
							</li>
							<li className="pr-6">
								<a href="/create-consultation">
									<PiCalendarDotsLight size={30} color="#ffffff" />
								</a>
							</li>
						</ul>
					</article>
				)}
				<div className="w-max p-1 rounded-md m-4">
					<button
						onClick={() => {
							setShowMenu(!showMenu), setShowLogOptions(false);
						}}
					>
						<CiMenuFries size={30} />
					</button>
				</div>
			</section>
		</>
	);
};
