import PropTypes from "prop-types";
import { forwardRef } from "react";

export const ConsultationDetailsTitle = forwardRef((_, ref) => {
  return (
    <>
      <div className="div oculto" ref={ref}></div>
    </>
  );
});

ConsultationDetailsTitle.propTypes = {
  navigate: PropTypes.func.isRequired,
};

ConsultationDetailsTitle.displayName = "ConsultationDetailsTitle";
