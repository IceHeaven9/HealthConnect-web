import { Link } from "react-router-dom";


export const NotFoundPage = () => {
  return (
    <div className="body relative bg-lightBlue text-smokeWhite overflow-hidden flex flex-col items-center justify-center h-[100vh]">
      <div id="clouds">
        <div className="cloud x1"></div>
        <div className="cloud x1_5"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
      </div>
      <div className="text-center flex flex-col items-center justify-center relative w-[80%] gap-4 min-h-screen mx-auto">
        <div className="_404 text-[12rem] relative flex flex-col items-center justify-center font-roboto z-[2] h-48 tracking-[15px]">404</div>
        <div className="_1 text-center block relative tracking-[12px] text-[4em] leading-[80%] font-ubuntu w-full">ESTA PAGINA</div>
        <div className="_2 text-center flex flex-col items-center justify-center relative text-[20px] font-inter w-full">NO HA SIDO ENCONTRADA</div>
        <Link className="btn rounded-lg bg-smokeWhite relative inline-block w-full p-[5px] z-[10] font-ubuntu text-[25px] my-0 mx-auto text-lightBlue no-underline mr-[10px]" to="/">Volver a Inicio</Link>
      </div>
    </div>
  );
};