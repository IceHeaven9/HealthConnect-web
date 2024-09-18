import { ToastContainer } from "react-toastify";

import PropTypes from "prop-types";
export const DescriptionTitle = ({ setShowDescriptionForm }) => {
  return (
    <>
      <ToastContainer />
    </>
  );
};

DescriptionTitle.propTypes = {
  setShowDescriptionForm: PropTypes.func.isRequired,
};
