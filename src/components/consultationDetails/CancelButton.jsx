import { FaTimes } from "react-icons/fa";

export const CancelButton = () => {
  return (
    <button
      className={`mb-4 p-2 w-full text-end text-smokeWhite rounded-lg flex flex-col items-center font-medium bg-cancelColor`}
    >
      <FaTimes size={30} />
      Cancelar
    </button>
  );
};

CancelButton.propTypes = {};
