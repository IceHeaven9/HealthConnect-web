import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { HamburgerMenu } from "./HamburgerMenu";

export const DinamicTitle = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between text-center text-lightBlue h-min p-4 mt-1">
      <button onClick={() => navigate(-1)} className="text-center pr-4">
        <IoMdArrowRoundBack size={30} />
      </button>
      <p className="text-3xl font-bold font-roboto mt-1 flex-grow">{text}</p>
      <div className="flex-shrink-0">
        <HamburgerMenu />
      </div>
    </div>
  );
};
