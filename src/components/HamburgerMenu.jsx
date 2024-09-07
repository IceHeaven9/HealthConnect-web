import { CiMenuFries } from "react-icons/ci";
import { RiHomeHeartFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { PiCalendarDotsLight } from "react-icons/pi";
import { useState } from "react";
import { MenuSpecialtiesModal } from "./menu/MenuSpecialtiesModal";
import { MenuDoctorsModal } from "./menu/MenuDoctorsModal";

export const HamburgerMenu = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [specialtyModalIsOpen, specialtyModaSetIsOpen] = useState(false);
	const [doctorsModalIsOpen, doctorsModaSetIsOpen] = useState(false);

	return (
		<>
			<section className="flex justify-end items-center w-full">
				{showMenu && (
					<article className="">
						<ul className="flex gap-8 items-center justify-center p-2 rounded-full bg-[#628eff]">
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
							<li>
								<a href="/profile">
									<CgProfile size={30} color="#ffffff" />
								</a>
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
					<button onClick={() => setShowMenu(!showMenu)}>
						<CiMenuFries size={30} />
					</button>
				</div>
			</section>
		</>
	);
};
