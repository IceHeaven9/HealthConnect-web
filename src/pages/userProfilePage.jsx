import { useState } from "react";
import { Footer } from "../components/Footer";
import { DinamicTitle } from "../components/SingleTitle";

export const UserProfile = () => {
  // Estado para manejar la imagen
  const [image, setImage] = useState(null);

  // Estados para manejar el modo de edición y los valores de los campos
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Nombre");
  const [lastName, setLastName] = useState("Apellidos");
  const [email, setEmail] = useState("email@example.com");
  const [addressType, setAddressType] = useState("Calle");
  const [address, setAddress] = useState("Dirección");
  const [town, setTown] = useState("Ciudad");

  // Función para manejar la subida de la imagen
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  // Función para eliminar la imagen y volver a la del placeholder
  const handleRemoveImage = () => {
    setImage(null); // Restablecer la imagen a null para mostrar el placeholder
  };

  // Función para cambiar el estado de edición
  const handleEditProfile = () => {
    setIsEditing(!isEditing); // Cambiar entre modo de edición y modo de visualización
  };

  return (
    <div>
      <DinamicTitle text="Mi perfil" />
      <div className="px-4">
        <div className="flex flex-col w-full max-w-md mx-auto p-6 rounded-3xl shadow-lg bg-lightBlue ">
          {/* Encabezado con logo */}
          <div className="flex flex-row gap-3 pb-4 bg-lightBlue">
            <div className="flex items-center w-full">
              <div>
                <img
                  src="public/images/Perfil_healthConnect-Photoroom.png"
                  width="50"
                  alt="Logo"
                />
              </div>

              <h1 className="ml-3 text-3xl font-bold text-white">
                HealthConnect
              </h1>
            </div>
          </div>

          {/* Encabezado y Foto de Perfil */}
          <div className="relative flex flex-col items-center">
            {/* Contenedor de la Imagen */}
            <div className="relative">
              <img
                src={image || "./images/placeholder_image.jpg"}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md"
              />
              {/* Botón para subir imagen */}
              <label
                htmlFor="upload"
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer"
              >
                <input
                  id="upload"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                📷
              </label>

              {/* Botón para eliminar la imagen y volver al placeholder */}
              {image && (
                <button
                  className="mt-4 absolute bottom-20 left-20 text-white px-3 py-1 rounded-full"
                  onClick={handleRemoveImage}
                >
                  ✖️
                </button>
              )}
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-smokeWhite">
              Bienvenido/a, {name} {lastName}
            </h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>

          {/* Formulario de Edición / Vista de Información */}
          <div className="flex flex-col items-center justify-center w-full p-6 rounded-lg bg-gray-100">
            <form className="w-full max-w-md">
              {/* Nombre */}
              <div className="pb-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-base font-medium text-gray-700"
                >
                  Nombre:
                </label>
                {!isEditing ? (
                  <div className="bg-gray-200 p-2 rounded-lg">{name}</div>
                ) : (
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                )}
              </div>

              {/* Apellidos */}
              <div className="pb-2">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-base font-medium text-gray-700"
                >
                  Apellidos:
                </label>
                {!isEditing ? (
                  <div className="bg-gray-200 p-2 rounded-lg">{lastName}</div>
                ) : (
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                )}
              </div>

              {/* Email */}
              <div className="pb-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-base font-medium text-gray-700"
                >
                  Email:
                </label>
                {!isEditing ? (
                  <div className="bg-gray-200 p-2 rounded-lg">{email}</div>
                ) : (
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                )}
              </div>

              {/* Tipo de dirección y Dirección */}
              <div className="pb-6">
                <label
                  htmlFor="addressType"
                  className="block mb-2 text-base font-medium text-gray-700"
                >
                  Dirección:
                </label>
                {!isEditing ? (
                  <div className="bg-gray-200 p-2 rounded-lg">
                    {addressType} {address}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <select
                      id="addressType"
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-1/3 p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Avenida">Avenida</option>
                      <option value="Calle">Calle</option>
                      <option value="Plaza">Plaza</option>
                      <option value="Residencial">Residencial</option>
                      <option value="Carretera">Carretera</option>
                      <option value="Camino">Camino</option>
                      <option value="Vía">Vía</option>
                      <option value="Vía">Callejón</option>
                    </select>

                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-2/3 p-2 border border-gray-300 rounded-lg"
                      placeholder="Nombre de la dirección"
                    />
                  </div>
                )}
              </div>

              {/* Ciudad */}
              <div className="pb-6">
                <label
                  htmlFor="town"
                  className="block mb-2 text-base font-medium text-gray-700"
                >
                  Ciudad:
                </label>
                {!isEditing ? (
                  <div className="bg-gray-200 p-2 rounded-lg">{town}</div>
                ) : (
                  <input
                    type="text"
                    id="town"
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                )}
              </div>
            </form>

            {/* Botón para editar o guardar cambios */}
            <button
              onClick={handleEditProfile}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              {isEditing ? "Guardar Cambios" : "Editar Perfil"}
            </button>
          </div>

          {/* Enlace de cierre de sesión */}
          <div className="text-sm font-light text-gray-500 text-center mt-6">
            <a href="#" className="font-medium text-blue-500 hover:underline">
              Cerrar sesión
            </a>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};
