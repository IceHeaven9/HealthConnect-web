import { useState } from 'react';

export const RegisterPage = () => {
  const [userType, setUserType] = useState('Patient');
  const [doctorCode, setDoctorCode] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  {/* Si el usuario selecciona paciente, se limpia el doctor code. */}
  const handleUserTypeChange = (type) => {
    setUserType(type);
    if (type === 'Patient') {
      setDoctorCode('');
    }
  };

  {/* Validamos si el formulario está completo */}
  const isFormValid = () => {
    if (userType === 'Doctor') {
      return email && username && password && doctorCode;
    }
    return email && username && password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    {/* Objeto */}
    const userData = {
      email,
      username,
      password,
      userType,
      doctorCode: userType === 'Doctor' ? doctorCode : undefined,
    };

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Imprime la respuesta para ver qué está devolviendo el servidor
      const responseData = await response.json();
      console.log('Response Data:', responseData);

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      setSuccess(true);
      setError('');
      console.log('User registered successfully');
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="text-blue-500 py-4 px-8 flex justify-center items-center relative">
        {/* Flecha back */}
        <button
          type="button"
          className="absolute left-4 font-bold text-lg"
          onClick={() => window.history.back()}
        >
          <span className="text-2xl">{'<'}</span>
        </button>

        {/* Sign Up */}
        <span className="font-bold text-lg">Sign Up</span>
      </header>

      <main className="flex justify-center items-center flex-grow">
        <div className="bg-white p-8 rounded-lg w-full max-w-md">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">Registration successful!</p>}

          <form onSubmit={handleSubmit}>
            {/* Campo email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input 
                type="email" 
                placeholder="example@example.com" 
                className="w-full px-3 py-2 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-full appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Campo Username */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input 
                type="text" 
                placeholder="Example" 
                className="w-full px-3 py-2 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-full appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Campo Password */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input 
                type="password" 
                placeholder="******" 
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-full appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Campo User Type */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">User type</label>
              <div className="flex justify-between">
                <button
                  type="button"
                  className={`w-full mr-2 py-2 text-sm font-semibold rounded-full ${userType === 'Patient' ? 'bg-blue-300 text-white' : 'bg-gray-200 text-white'}`}
                  onClick={() => handleUserTypeChange('Patient')}
                >
                  Patient
                </button>
                <button
                  type="button"
                  className={`w-full py-2 text-sm font-semibold rounded-full ${userType === 'Doctor' ? 'bg-blue-300 text-white' : 'bg-blue-300 text-white'}`}
                  onClick={() => handleUserTypeChange('Doctor')}
                >
                  Doctor
                </button>
              </div>
            </div>

            {/* En caso de ser Doctor, te pide el código. */}
            {userType === 'Doctor' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Doctor code (Doctors)</label>
                <input 
                  type="password" 
                  placeholder="******" 
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-blue-500 bg-blue-100 border rounded-full shadow appearance-none focus:outline-none focus:shadow-outline placeholder-blue-500" 
                  value={doctorCode}
                  onChange={(e) => setDoctorCode(e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center justify-center">
              <button 
                type="submit" 
                className={`w-full font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${isFormValid() ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white cursor-not-allowed'}`}
                disabled={!isFormValid()}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
