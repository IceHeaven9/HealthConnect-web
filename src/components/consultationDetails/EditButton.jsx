import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";

export const EditButton = ({ setIsEditing }) => {
  return (
    <button
      className={`mb-4 p-2 w-full text-end text-smokeWhite rounded-lg flex flex-col items-center font-medium bg-warning`}
      onClick={() => {
        setIsEditing({
          title: true,
          description: true,
          severity: true,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <FaEdit size={25} />
      Editar
    </button>
  );
};

EditButton.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
};
