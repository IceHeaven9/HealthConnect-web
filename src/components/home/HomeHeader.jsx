<<<<<<< HEAD
import { HamburgerMenu } from "../HamburgerMenu";

export const HomeHeader = () => {
  return (
    <header className="flex items-center justify-between p-2 bg-[#cad6ff] text-white h-20">
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
          <div className="font-medium text-3xl text-[#628eff]">
            Health Connect
          </div>
        </div>
      </div>
      {/* Menú Hamburguesa */}
      <div className="flex justify-center items-center h-12 w-12">
        <HamburgerMenu />
        {/* Ocultar el botón de inicio en la página actual */}
        <style>{`
=======
import { HamburgerMenu } from "../HamburgerMenu"; 

export const HomeHeader = () => {
    return (
        <header className="flex items-center justify-between p-2 bg-[#cad6ff] text-white h-20">
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
            {/* Menú Hamburguesa */}
            <div className="relative">
                <HamburgerMenu />
                {/* Ocultar el botón de inicio en la página actual */}
                <style>{`
>>>>>>> a2742c1 (vuelvo a meter el hamburguerMenu)
                    a[href="/"] {
                        display: none !important;
                    }
                `}</style>
<<<<<<< HEAD
      </div>
    </header>
  );
=======
            </div>
        </header>
    );
>>>>>>> a2742c1 (vuelvo a meter el hamburguerMenu)
};
