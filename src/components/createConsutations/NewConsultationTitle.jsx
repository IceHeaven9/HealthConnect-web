import { IoMdArrowRoundBack } from "react-icons/io";
import PropTypes from "prop-types";

export const NewConsultationTitle = ({ navigate }) => {
  return (
    <>
      <div className="flex text-center p-6 text-lightBlue font-bold text-3xl w-full">
        <button onClick={() => navigate(-1)} className="w-max">
          {" "}
          <IoMdArrowRoundBack />
        </button>
        <h1 className="w-full">Nueva Consulta</h1>
      </div>
    </>
  );
};

NewConsultationTitle.propTypes = {
  navigate: PropTypes.func.isRequired,
};
