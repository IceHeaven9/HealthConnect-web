import { HamburgerMenu } from '../HamburgerMenu';

export const HomeHeader = () => {
    return (
        <header className="flex items-center justify-between p-2 bg-[#cad6ff] text-white">
            {/* Logo y Nombre */}
            <div className="flex items-center space-x-4">
                <div className="w-24 h-24">
                    <img 
                        src="/images/Perfil_healthConnect-Photoroom.png" 
                        alt="Logo Preview" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col text-center">
                    <div className="font-medium text-2xl text-[#628eff]">Health</div>
                    <div className="font-medium text-2xl text-[#628eff]">Connect</div>
                </div>
            </div>

            {/* Hamburger Menu */}
            <div>
                <HamburgerMenu />
            </div>
        </header>
    );
};

