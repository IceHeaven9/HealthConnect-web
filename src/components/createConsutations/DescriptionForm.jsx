
import {FcOpenedFolder} from 'react-icons/fc';

export const DescriptionForm = () => {
  return (
    <>
    <form className="flex flex-col items-start justify-center mx-4 ">
		<label className="text-sm text-[#111827] p-1">Motivo de la consulta</label> 
			<textarea className="border-[0.1rem] border-solid border-[#cad6ff] w-full rounded-2xl h-44 pl-4 p-2" name="descripcion" placeholder="Escribe tu problema aqui..." required></textarea>
			<div className="flex text-center justify-end w-full">
			<button className="flex items-center justify-center gap-1 font-bold text-lg text-[#628eff] w-max h-10 bg-transparent hover:bg-[#4f6482] transition-all duration-300 mb-4" type="submit">Subir archivos<FcOpenedFolder /></button>
			</div>
      <div className="w-full text-center p-2 mb-4 rounded-lg text-white bg-[#628eff] ">
        <button  >Confirmar</button>
      </div>
		</form>
    </>
  )
}
