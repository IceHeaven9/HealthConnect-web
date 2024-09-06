import { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import PropTypes from 'prop-types';

export const DescriptionForm = ({selectedDate,selectedSpecialty,selectedDoctor,selectedHour}) => {
  console.log(selectedDate, selectedSpecialty, selectedDoctor, selectedHour);
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [textinput , setTextinput] = useState('');


  const selectedDateTime = new Date(selectedDate);
  if (!isNaN(selectedDateTime)) {
    const [hour, minute] = selectedHour.split(':');
    const combinedDateTime = new Date(
      selectedDateTime.getFullYear(),
      selectedDateTime.getMonth(),
      selectedDateTime.getDate(),
      hour,
      minute
    );
    console.log(combinedDateTime); // This will log the combined date and time
  } else {
    console.error('Invalid date');
  }



  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const filePreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...filePreviews]);
    setFiles(prev => [...prev, ...selectedFiles]);
  }
  
  return (
    <>
      <div className='flex items-center justify-start text-[#628eff] gap-4'>
        <img className=' w-32 h-32' src='/public/images/Perfil_healthConnect-Photoroom.png' alt="" />
        <p className='text-4xl font-medium'> Descripción</p>
      </div>
      <form className="flex flex-col items-start justify-center mx-4 ">
        <label className="text-md text-[#111827] p-2 font-medium">Motivo de la consulta:</label>
        <textarea value={textinput} onChange={(e) => setTextinput(e.target.value)} className="border-[0.1rem] border-solid border-[#cad6ff] w-full rounded-2xl h-72 pl-4 p-2 outline-none" name="descripcion" placeholder="Describe tu problema..." required></textarea>
        <p className='font-medium mt-4  p-2'>Imágenes:</p>
        <div className='border-[#cad6ff] border-[0.1rem] border-solid min-w-full h-max  rounded-xl grid grid-cols-5 gap-4'>
          
  {files.length === 0 ? (
    <div className="flex items-center justify-center min-h-20 w-full text-7xl col-span-5">
      
    </div>
  ) : (
    files.map((file, index) => (
      file.type.startsWith('image/') && (
        <img key={index} src={previews[index]} alt="Preview" className="w-16 h-16 m-2 rounded-lg" />
      )
    ))
  )}
</div>
<p className='font-medium mt-4  p-2'>Documentos:</p>
<div className='border-[#cad6ff] p-2 gap-2 border-[0.1rem] border-solid min-w-full h-max mb-6 rounded-xl grid grid-cols-1 '>
  {files.filter(file => !file.type.startsWith('image/')).length === 0 ? (
    <div className="flex items-center justify-center w-full h-full text-2xl p-2 font-medium">
    </div>
  ) : (
    files.map((file, index) => (
      !file.type.startsWith('image/') && (
        <div key={index} className="p-2 border border-gray-300 rounded-lg w-max text-sm text-nowrap">
          <p>{file.name}</p>
        </div>
      )
    ))
  )}
</div>
        <div className="flex text-center justify-end w-full">
        <input aria-label='files' type="file" name='files' id='files' className="hidden" onChange={handleFileChange} multiple />
<label htmlFor='files' className="flex items-center justify-center gap-1 font-bold text-xl text-[#628eff] w-max h-10 bg-transparent transition-all duration-300 my-6 cursor-pointer">
<div className='text-3xl'><FaCloudUploadAlt /></div>  Subir archivos 
</label>
        </div>
        <div className="w-full text-center p-2 mb-4 rounded-lg text-white bg-[#628eff] ">
        <button disabled={!textinput}>Confirmar</button>
        </div>
      </form>
    </>
  );
};





DescriptionForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  selectedSpecialty: PropTypes.number,
  selectedDoctor: PropTypes.object,
  selectedHour: PropTypes.string,
};