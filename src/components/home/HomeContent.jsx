export const HomeTextCard = () => {
  return (
    <main className="flex flex-col justify-center items-center ">
      <div
        className="text-center w-full bg-cover bg-center p-2 rounded-lg shadow-md"
        style={{ backgroundImage: "url('/images/fondotext.jpg')" }}
      >
        <div className="bg-white bg-opacity-80 p-6 rounded-lg">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-lightBlue">
            Tu salud simplificada.
          </h1>
          <p className="text-base md:text-lg leading-relaxed mb-6 text-lightBlue">
            Hacemos que sea fácil reservar citas con los mejores profesionales de la salud.
          </p>
          <ul className="list-disc list-outside text-base md:text-lg leading-relaxed mb-6 text-lightBlue pl-5">
            <li>
              <span className="font-semibold">Atención experta:</span> conéctese
              con médicos calificados de diversas especialidades.
            </li>
            <li>
              <span className="font-semibold">Reserva fácil:</span> programe sus
              citas en línea con solo unos pocos clics.
            </li>
            <li>
              <span className="font-semibold">Sin esperas:</span> elija el
              horario que mejor se adapte a sus necesidades.
            </li>
            <li>
              <span className="font-semibold">Seguro y Privado:</span>
              información médica está protegida con nosotros.
            </li>
          </ul>
          <p className="text-base md:text-lg leading-relaxed text-lightBlue">
            ¡Únase hoy y tome el control de su salud con facilidad!
          </p>
        </div>
      </div>
    </main>
  );
};
