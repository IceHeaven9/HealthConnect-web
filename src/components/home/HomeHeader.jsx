export const HomeHeader = () => {
    return (
        <header className="flex items-center justify-center p-2 bg-[#cad6ff] text-white h-20">
            {/* Logo y Nombre */}
            <div className="flex items-center space-x-4">
                <div className="w-20 h-20">
                    <img 
                        src="/images/Perfil_healthConnect-Photoroom.png" 
                        alt="Logo Preview" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <div className="font-medium text-3xl text-[#628eff]">Health Connect</div>
                </div>
            </div>
        </header>
    );
};
