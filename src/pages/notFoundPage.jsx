export const NotFoundPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Página No Encontrada</h2>
        <p className="mt-2 text-gray-600">
          Lo sentimos, pero la página que estás buscando no existe.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};
