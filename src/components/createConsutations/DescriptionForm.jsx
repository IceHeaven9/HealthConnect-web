import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import {IoMdArrowRoundBack} from 'react-icons/io';

export const DescriptionForm = ({selectedDate, selectedSpecialty, selectedDoctor, selectedHour,setShowDescriptionForm}) => {
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [textinput , setTextinput] = useState('');
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState('');
  const navigate = useNavigate();


  const token = localStorage.getItem('TOKEN');

  const selectedDateTime = new Date(selectedDate);
  let formattedDateTime = '';
  if (!isNaN(selectedDateTime.getTime())) {
    const [hour, minute] = selectedHour.split(':');
    const combinedDateTime = new Date(
      selectedDateTime.getFullYear(),
      selectedDateTime.getMonth(),
      selectedDateTime.getDate(),
      parseInt(hour, 10),
      parseInt(minute, 10)
    );
    combinedDateTime.setHours(combinedDateTime.getHours() + 2); 
    formattedDateTime = combinedDateTime.toISOString().replace('T', ' ').substring(0, 16);

  } else {
    console.error('Invalid date');
  }

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const filePreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...filePreviews]);
    setFiles(prev => [...prev, ...selectedFiles]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      title: title,
      description: textinput,
      severity: severity,
      specialityid: selectedSpecialty,
      date: formattedDateTime,
      doctorId: selectedDoctor ? Number(selectedDoctor.id) : undefined
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    fetch("http://localhost:3000/consultations", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message) {
          setTitle('');
          setTextinput('');
          setSeverity('');
          setFiles([]);
          setPreviews([]);
          notify(result.message);
  
          // Upload files
          const fileHeaders = new Headers();
          fileHeaders.append("Authorization", token);
  
          const formdata = new FormData();
          files.forEach((file) => {
            formdata.append("files", file);
          });
  
          const fileRequestOptions = {
            method: "POST",
            headers: fileHeaders,
            body: formdata,
            redirect: "follow"
          };
  
          fetch(`http://localhost:3000/consultations/${result.id}/files`, fileRequestOptions)
          .then((response) => response.text().then((fileResult) => ({ response, fileResult })))
          .then(({ response, fileResult }) => {
            notify(fileResult.message);
            if (response.ok) {
              setTimeout(() => {
                navigate(`/`);
              }, 1000);
            }
          })
          .catch((error) => notify(error.message));
        }
      })
      .catch((error) => {
        notify(error.message);
      });
  };

  const notify = (message) => toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: '#ffffff',
      color: '#000000',
      fontSize: '16px'
    }
  });
  

  return (
    <>
<div className='h-min w-max pl-4 pr-4 pt-6 text-[#628eff]'> 
  </div>
      <div className='flex items-center justify-start text-center  text-[#628eff] h-min p-4 mb-8'>
      <ToastContainer/>
  <button className='pr-20' onClick={() => setShowDescriptionForm(false)}> <IoMdArrowRoundBack size={30} /></button>
    
        <p className='text-4xl font-medium'> Descripción</p>
      </div>
      <form className="flex flex-col items-start justify-center mx-4 text-center " onSubmit={handleSubmit}>
        
        <label htmlFor='title' className=" font-medium p-2">Titulo:</label>
        <input aria-label='title'  value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Titulo de la consulta' className='border-[0.1rem] border-solid border-[#cad6ff] w-full rounded-2xl pl-4 p-2 outline-none' id='title' name="title" type="text" />
        
        <label className="text-md text-[#111827] p-2 font-medium">Motivo de la consulta:</label>
        <textarea value={textinput} onChange={(e) => setTextinput(e.target.value)} className="border-[0.1rem] border-solid border-[#cad6ff] w-full rounded-2xl h-72 pl-4 p-2 outline-none" name="descripcion" placeholder="Describe tu problema..." required></textarea>

        <p className="font-medium p-2 text-center">Severidad:</p>

<section className='flex items-center justify-center text-center w-full'>
  <div className="flex gap-4">
    <label className="flex items-center gap-2 ">
      <input aria-label='low' type="radio" name="severity" value="low" className="hidden" onChange={(e) => setSeverity(e.target.value)} />
      <span className={`p-2 rounded-xl cursor-pointer ${severity === 'low' ? 'bg-[#628eff] text-white' : 'bg-gray-200'}`} data-severity="low">Baja</span>
    </label>
    <label className="flex items-center gap-2">
      <input aria-label='medium' type="radio" name="severity" value="medium" className="hidden" onChange={(e) => setSeverity(e.target.value)} />
      <span className={`p-2 rounded-xl cursor-pointer ${severity === 'medium' ? 'bg-[#628eff] text-white' : 'bg-gray-200'}`} data-severity="medium">Media</span>
    </label>
    <label className="flex items-center gap-2">
      <input aria-label='hight' type="radio" name="severity" value="high" className="hidden" onChange={(e) => setSeverity(e.target.value)} />
      <span className={`p-2 rounded-xl cursor-pointer ${severity === 'high' ? 'bg-[#628eff] text-white' : 'bg-gray-200'}`} data-severity="high">Alta</span>
    </label>
  </div>
</section>

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

        <div className="w-full text-center p-4 text-xl mb-4 rounded-lg text-white bg-[#628eff] ">
        <button type="submit" disabled={!textinput} onClick={() => {
        }}>Confirmar</button>
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
  setShowDescriptionForm: PropTypes.func.isRequired
};