import PropTypes from "prop-types";
export const ProfileForm = ({
  isEditing,
  userType,
  userName,
  setUserName,
  name,
  setName,
  lastName,
  setLastName,
  email,
  setEmail,
  biography,
  setBiography,
  experience,
  setExperience,
}) => {
  return (
    <form className="w-full">
      {/* Nombre de Usuario */}
      <div className="pb-2">
        <label
          htmlFor="userName"
          className="block mb-2 text-base font-medium text-gray-700"
        >
          Nombre de Usuario:
        </label>
        {!isEditing ? (
          <div className="bg-gray-200 p-2 rounded-lg">{userName}</div>
        ) : (
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        )}
      </div>

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

      {/* Biografía */}
      {userType === "doctor" && (
        <div className="pb-2">
          <label
            htmlFor="biography"
            className="block mb-2 text-base font-medium text-gray-700"
          >
            Biografía:
          </label>
          {!isEditing ? (
            <div className="bg-gray-200 p-2 rounded-lg">{biography}</div>
          ) : (
            <textarea
              id="biography"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          )}
        </div>
      )}

      {/* Experiencia */}
      {userType === "doctor" && (
        <div className="pb-2">
          <label
            htmlFor="experience"
            className="block mb-2 text-base font-medium text-gray-700"
          >
            Experiencia:
          </label>
          {!isEditing ? (
            <div className="bg-gray-200 p-2 rounded-lg">{experience}</div>
          ) : (
            <input
              type="text"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          )}
        </div>
      )}
    </form>
  );
};

ProfileForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  setLastName: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  biography: PropTypes.string,
  setBiography: PropTypes.func,
  experience: PropTypes.number,
  setExperience: PropTypes.func,
};
