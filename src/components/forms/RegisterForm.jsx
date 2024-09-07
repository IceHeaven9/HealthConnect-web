import { useState } from 'react';

export const RegisterForm = () => {
  const [userType, setUserType] = useState('Patient'); 
  const [doctorCode, setDoctorCode] = useState('');
  const [experience, setExperience] = useState(''); 
  const [bio, setBio] = useState(''); 
  const [name, setName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(false); 
  const [specialties, setSpecialties] = useState([]); 
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

  {/*Cambio tipo de usuario y fetch de especialidades si es Doctor*/}
  const handleUserTypeChange = async (type) => {
    setUserType(type); 
    if (type === 'Patient') {
      {/*Si el tipo de usuario es Patient se limpian los campos de Doctor*/}
      setDoctorCode('');
      setExperience('');
      setBio('');
    } else if (type === 'Doctor') {
      {/*Si el tipo de usuario es Doctor se hace fetch para especialidades al backend*/}
      try {
        const response = await fetch('http://localhost:3000/specialities');
        const data = await response.json();
        setSpecialties(data);
      } catch (error) {
        console.error('Error fetch specialties:', error);
      }
    }
  };

  {/*Revisamos que todos los campos estén cumplimentados antes de enviar*/}
  const isFormValid = () => {
    if (userType === 'Doctor') {
      {/*Si es Doctor de activan los campos correspondientes */}
      return email && username && password && name && lastName && doctorCode && experience && selectedSpecialties.length > 0;
    }
    {/*Si es Paciente se validan solo los campos correspondientes*/}
    return email && username && password && name && lastName;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    {/*Objeto con los datos que se enviarán al Back */}
    const userData = {
      firstName: name,
      lastName,
      email,
      userName: username,
      password,
      userType: userType.toLowerCase(),
      codigoMedico: userType === 'Doctor' ? doctorCode : undefined, 
      experience: userType === 'Doctor' ? experience : undefined, 
      biography: userType === 'Doctor' ? bio : undefined, 
      specialties: userType === 'Doctor' ? selectedSpecialties : undefined, 
    };

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), 
      });

      const responseData = await response.json(); 
      console.log('Response Data:', responseData);

      if (!response.ok) {
        throw new Error('Error al registrarse.');
      }

      setSuccess(true); 
      setError(''); 
      console.log('Usuario registrado correctamente.');
    } catch (err) {
      setError('Error al registrarse, por favor intentelo de nuevo.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header*/}
      <header className="text-blue-500 py-4 px-8 flex justify-center items-center relative">
        <button
          type="button"
          className="absolute left-4 font-bold text-lg"
          onClick={() => window.history.back()}
        >
          <span className="text-2xl">{'<'}</span>
        </button>
        <span className="font-bold text-lg">Sign Up</span>
      </header>

      {/* Main */}
      <main className="flex justify-center items-center flex-grow">
        <div className="bg-white p-8 rounded-lg w-full max-w-md">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">Registration successful!</p>} 

          {/* Formulario*/}
          <form onSubmit={handleSubmit}>
            {/* Campo nombre */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
              <input 
                type="text" 
                placeholder="Example" 
                className="w-full px-3 py-2 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-full appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500" 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required
              />
            </div>

            {/* Campo apellido */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
              <input 
                type="text" 
                placeholder="Example" 
                className="w-full px-3 py-2 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-full appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
                required
              />
            </div>

            {/* Campo mail*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input 
                type="email" 
                placeholder="example@example.com" 
                className="w-full px-3 py-2 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-full appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>

            {/* Campo nombre de usuario */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input 
                type="text" 
                placeholder="Example1" 
                className="w-full px-3 py-2 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-full appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
            </div>

            {/* Campo contraseña */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input 
                type="password" 
                placeholder="******" 
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-full appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>

            {/* Campo tipo de usuario */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">I am a...</label>
              <select
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-full appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500"
                value={userType}
                onChange={(e) => handleUserTypeChange(e.target.value)} 
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            {/* Campos para Doctor */}
            {userType === 'Doctor' && (
              <>
                {/* Campo para el código de doctor */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Doctor Code</label>
                  <input 
                    type="text" 
                    placeholder="*******" 
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-full appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500" 
                    value={doctorCode}
                    onChange={(e) => setDoctorCode(e.target.value)} 
                    required
                  />
                </div>

                {/* Campo años de experiencia */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Experience</label>
                  <input 
                    type="number" 
                    placeholder="5" 
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-full appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500" 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)} 
                    required
                  />
                </div>

                {/* Campo especialidades */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Specialties</label>
                  <select
                    multiple
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-lg appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500"
                    value={selectedSpecialties}
                    onChange={(e) =>
                      setSelectedSpecialties(
                        Array.from(e.target.selectedOptions, (option) => option.value)
                      ) 
                    }
                    required
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty.id} value={specialty.name}>
                        {specialty.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Campo biografía*/}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Biography (Optional)</label>
                  <textarea 
                    placeholder="Tell us about yourself..." 
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-lg appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500" 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)} 
                  />
                </div>
              </>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-600"
              disabled={!isFormValid()} 
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
